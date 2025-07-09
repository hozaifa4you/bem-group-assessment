<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
   Route::group(['prefix' => 'todos'], function () {
      Route::get("/", [TodoController::class, 'index'])->name("todos");
      Route::get('create', [TodoController::class, 'create'])->name('todos.create');
      Route::post('/', [TodoController::class, 'store'])->name('todos.store');
      Route::get('/{slug}', [TodoController::class, 'edit'])->name('todos.edit');
      Route::put('/{slug}', [TodoController::class, 'update'])->name('todos.update');
   });
});
