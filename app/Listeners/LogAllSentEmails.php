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
      try {
         $message = $event->message;
         $to = $message->getTo();

         // Handle case when no recipients
         if (empty($to)) {
            Log::warning('Email sent with no recipients', ['subject' => $message->getSubject()]);
            return;
         }

         $emailAddress = '';

         if (is_array($to)) {
            $firstRecipient = reset($to);

            if (is_string(array_key_first($to))) {
               $emailAddress = array_key_first($to);
            } elseif (is_object($firstRecipient) && method_exists($firstRecipient, 'getAddress')) {
               $emailAddress = $firstRecipient->getAddress();
            } elseif (is_array($firstRecipient) && isset($firstRecipient['address'])) {
               $emailAddress = $firstRecipient['address'];
            } else {
               $emailAddress = (string) $firstRecipient ?: 'unknown@example.com';
               Log::warning('Could not determine email address format', ['to' => $to]);
            }
         }

         $emailType = 'generic';
         $mailable = $event->data['mailable'] ?? null;
         if ($mailable && method_exists($mailable, 'getEmailType')) {
            $emailType = $mailable->getEmailType();
         } elseif ($mailable) {
            $className = get_class($mailable);
            if (strpos($className, 'TodoReminder') !== false) {
               $emailType = 'todo_reminder';
            }
         }

         if (!empty($emailAddress)) {
            EmailLog::create([
               'to_email' => $emailAddress,
               'subject' => $message->getSubject(),
               'status' => 'success',
               'type' => $emailType,
               'sent_at' => Carbon::now(),
            ]);
         } else {
            Log::warning('Could not log email - no valid recipient address found', [
               'subject' => $message->getSubject()
            ]);
         }

         Log::info('Email sent successfully', [
            'to' => $emailAddress ?: 'unknown@example.com',
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
