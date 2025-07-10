<?php

namespace App\Console\Commands;

use App\Http\Controllers\TodoController;
use App\Mail\TodoReminderMail;
use App\Models\Todo;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Traits\EmailLogger;
use Throwable;

class SendTodoReminder extends Command
{
   use EmailLogger;

   /**
    * The name and signature of the console command.
    *
    * @var string
    */
   protected $signature = 'mail:send-todo-reminder';

   /**
    * The console command description.
    *
    * @var string
    */
   protected $description = 'Send a reminder email for upcoming todos';

   /**
    * Execute the console command.
    */
   public function handle()
   {
      $controller = new TodoController();
      $todos_all = $controller->getTodosForReminders();

      $todos_all->each(function ($x) {
         $todos = $x['todos'];
         $user = $x['user'];
         $to = $user['email'];

         try {
            Mail::to($to)->queue(new TodoReminderMail($user, $todos));

            $todos->each(function ($todo) {
               Todo::where('id', $todo['id'])
                  ->update(['is_reminder_sent' => true]);
            });

            // $this->logEmail([
            //    'to_email' => $to,
            //    'subject'  => 'Todo Reminder',
            //    'status'   => 'success',
            //    'type'     => 'reminder',
            //    'sent_at'  => now(),
            // ]);

            $this->info('Todo reminder emails queued successfully.');
         } catch (Throwable $th) {
            // $this->logEmail([
            //    'to_email'       => $to ?? 'unknown',
            //    'subject'        => 'Todo Reminder',
            //    'status'         => 'failed',
            //    'type'           => 'reminder',
            //    'sent_at'        => now(),
            //    'error_message'  => $th->getMessage(),
            // ]);

            $this->error('Failed to queue todo reminder email: ' . $th->getMessage());
         }
      });
   }
}
