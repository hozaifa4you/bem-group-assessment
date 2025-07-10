<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
   protected $fillable = [
      'to_email',
      'subject',
      'status',
      'type',
      'sent_at',
      'error_message',
   ];
}
