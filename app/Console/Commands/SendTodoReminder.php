<?php

namespace App\Console\Commands;

use App\Http\Controllers\TodoController;
use App\Mail\TodoReminderMail;
use App\Models\Todo;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendTodoReminder extends Command
{
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

      try {
         $todos_all->each(function ($x) {
            $todos = $x['todos'];
            $user = $x['user'];
            $to = $user['email'];

            Mail::to($to)->queue(new TodoReminderMail($user, $todos));

            $todos->each(function ($todo) {
               Todo::where('id', $todo['id'])
                  ->update(['is_reminder_sent' => true]);
            });

            Log::info('Todo reminder email queued for user', [
               'user_id' => $user['id'],
               'email' => $to,
               'todos_count' => count($todos),
               'timestamp' => now(),
            ]);
         });

         $this->info('Todo reminder emails queued successfully.');
      } catch (\Throwable $th) {
         Log::error('Failed to queue todo reminder email: ' . $th->getMessage());
         $this->error('Failed to queue todo reminder email: ' . $th->getMessage());
      }
   }
}
