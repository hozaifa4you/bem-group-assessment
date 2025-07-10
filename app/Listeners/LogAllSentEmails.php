<?php

namespace App\Listeners;

use App\Models\EmailLog;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class LogAllSentEmails
{
   /**
    * Create the event listener.
    */
   public function __construct()
   {
      //
   }

   /**
    * Handle the event.
    */
   public function handle(MessageSent $event): void
   {
      Log::info('Event: ', $event);

      try {
         $message = $event->message;
         $to = $message->getTo();

         // Handle case when no recipients
         if (empty($to)) {
            Log::warning('Email sent with no recipients', ['subject' => $message->getSubject()]);
            return;
         }

         // Get email address from the first recipient
         // Symfony mailer format is typically [email => name]
         $emailAddress = array_key_first($to);

         // Get email type if available from mailable class
         $emailType = 'generic';
         $mailable = $event->data['mailable'] ?? null;
         if ($mailable && method_exists($mailable, 'getEmailType')) {
            $emailType = $mailable->getEmailType();
         } elseif ($mailable) {
            // Try to infer type from class name
            $className = get_class($mailable);
            if (strpos($className, 'TodoReminder') !== false) {
               $emailType = 'todo_reminder';
            }
         }

         EmailLog::create([
            'to_email' => $emailAddress,
            'subject' => $message->getSubject(),
            'status' => 'success',
            'type' => $emailType,
            'sent_at' => Carbon::now(),
         ]);

         Log::info('Email sent successfully', [
            'to' => $emailAddress,
            'subject' => $message->getSubject(),
            'type' => $emailType
         ]);
      } catch (Exception $e) {
         Log::error('Failed to log email', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
         ]);
      }
   }
}
