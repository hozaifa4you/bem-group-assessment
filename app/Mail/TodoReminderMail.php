<?php

namespace App\Mail;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class TodoReminderMail extends Mailable implements ShouldQueue
{
   use Queueable, SerializesModels;

   /**
    * Create a new message instance.
    */
   public $user;
   public $todos;

   public function __construct($user, $todos)
   {
      $this->user = $user;
      $this->todos = $todos;
   }

   /**
    * Get the message envelope.
    */
   public function envelope(): Envelope
   {
      return new Envelope(
         subject: 'Todo Reminder',
      );
   }

   /**
    * Get the message content definition.
    */
   public function content(): Content
   {
      return new Content(
         view: 'mail.reminder-todo',
      );
   }

   /**
    * Get the attachments for the message.
    *
    * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    */
   public function attachments(): array
   {
      $csvContent = $this->csvData();

      $tempFile = tempnam(sys_get_temp_dir(), 'todo_titles');
      file_put_contents($tempFile, $csvContent);

      return [
         Attachment::fromPath($tempFile)
            ->as('todo_titles.csv')
            ->withMime('text/csv')
      ];
   }


   /**
    * Make csv for email sending
    *
    * @return string
    */
   public function csvData()
   {
      try {
         $client = new Client();
         $response = $client->get('https://jsonplaceholder.typicode.com/posts', [
            'query' => [
               '_limit' => 10
            ]
         ]);

         $data = json_decode($response->getBody()->getContents(), true);
         $titles = collect($data)->pluck('title');

         $dataForCsv = "Title\n" . $titles->map(fn($title) => "\"$title\"")->implode("\n");

         return $dataForCsv;
      } catch (Exception $e) {
         Log::error('Failed to generate CSV data: ' . $e->getMessage());
         return "Title\n\"Error fetching data. Please try again later.\"";
      }
   }
}
