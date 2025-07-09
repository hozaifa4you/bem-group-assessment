<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
   Route::group(['prefix' => 'todos'], function () {
      Route::get("/", [TodoController::class, 'index'])->name("todos");
      Route::post("/", [TodoController::class, 'store'])->name("todos.store");
      Route::get("/{slug}", [TodoController::class, 'show'])->name("todos.show");
      Route::put("/{slug}", [TodoController::class, 'update'])->name("todos.update");
      Route::delete("/{slug}", [TodoController::class, 'destroy'])->name("todos.destroy");

      Route::patch("/{slug}/status", [TodoController::class, 'status'])->name("todos.status");
   });
});
