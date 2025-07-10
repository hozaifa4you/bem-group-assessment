<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
      return [];
   }
}
