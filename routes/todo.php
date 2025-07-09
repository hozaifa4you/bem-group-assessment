<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
   Route::group(['prefix' => 'todos'], function () {
      Route::get("/", [TodoController::class, 'index'])->name("todos");
      Route::get('create', [TodoController::class, 'create'])->name('todos.create');
      Route::post('/', [TodoController::class, 'store'])->name('todos.store');
   });
});
