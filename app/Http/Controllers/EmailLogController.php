<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmailLogController extends Controller
{
   public function index()
   {
      $user = Auth::user();

      $loggers = EmailLog::where('to_email', $user->email)
         ->orderBy('sent_at', 'desc')
         ->get();

      return Inertia::render('loggers/index', ['loggers' => $loggers]);
   }
}
