<?php

namespace App\Traits;

use App\Models\EmailLog;
use Carbon\Carbon;

trait EmailLogger
{
   public function logEmail(array $data): void
   {
      EmailLog::create([
         'to_email'       => $data['to_email'],
         'subject'        => $data['subject'],
         'status'         => $data['status'], // 'sent' or 'failed'
         'type'           => $data['type'],   // e.g. 'reminder'
         'sent_at'        => $data['sent_at'] ?? Carbon::now(),
         'error_message'  => $data['error_message'] ?? null,
      ]);
   }
}
