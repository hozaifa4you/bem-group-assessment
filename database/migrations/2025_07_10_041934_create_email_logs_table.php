<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   /**
    * Run the migrations.
    */
   public function up(): void
   {
      Schema::create('email_logs', function (Blueprint $table) {
         $table->id();
         $table->string('to_email');
         $table->string('subject');
         $table->string('status');
         $table->string('type');
         $table->dateTime('sent_at')->nullable();
         $table->text('error_message')->nullable();
         $table->timestamps();
      });
   }

   /**
    * Reverse the migrations.
    */
   public function down(): void
   {
      Schema::dropIfExists('email_logs');
   }
};
