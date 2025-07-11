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
      'complete_at',
      'is_completed',
      'is_reminder_sent',
      'user_id',
      'slug',
   ];

   protected $casts = [
      'complete_at' => 'datetime',
      'is_completed' => 'boolean',
      'is_reminder_sent' => 'boolean',
   ];

   public function user()
   {
      return $this->belongsTo(User::class);
   }
}
