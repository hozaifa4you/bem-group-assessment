<?php

namespace App\Providers;

use App\Listeners\LogAllSentEmails;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Mail\Events\MessageSent;

class EventServiceProvider extends ServiceProvider
{
   /**
    * Register services.
    */
   public function register(): void
   {
      //
   }

   protected $listen = [
      MessageSent::class => [
         LogAllSentEmails::class,
      ],
      // Also listen for queued mail events if needed
      'Illuminate\Mail\Events\MessageSending' => [
         // You could add a "LogMessageSending" listener here if needed
      ],
   ];

   /**
    * Bootstrap services.
    */
   public function boot(): void
   {
      //
   }
}
