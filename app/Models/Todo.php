<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
   use HasFactory;

   protected $table = 'todos';

   protected $fillable = [
      'title',
      'description',
      'email_sent',
      'is_completed',
      'reminder_at',
      'user_id',
   ];

   protected $casts = [
      'reminder_at' => 'datetime',
      'email_sent' => 'datetime',
      'is_completed' => 'boolean',
   ];

   public function user()
   {
      return $this->belongsTo(User::class);
   }
}
