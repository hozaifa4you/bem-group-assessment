<?php

use App\Http\Controllers\EmailLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
   Route::group(['prefix' => 'loggers'], function () {
      Route::get('/', [EmailLogController::class, 'index'])->name('email-logs');
   });
});
