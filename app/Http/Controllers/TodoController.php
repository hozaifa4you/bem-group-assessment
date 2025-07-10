<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
   /**
    * Display a listing of the resource.
    */
   public function index()
   {
      $user = Auth::user();

      $todos = Todo::where('user_id', $user->id)
         ->orderBy('created_at', 'desc')
         ->paginate(10);

      return Inertia::render('todos/index', ['todos' => $todos]);
   }

   /**
    * Show the form for creating a new resource.
    */
   public function create()
   {
      return Inertia('todos/create');
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
      $validated = $request->validate([
         'title' => ['required', 'string', 'min:5', 'max:190'],
         'description' => ['nullable', 'string', 'min:10', 'max:290'],
         'complete_at' => ['required', 'date'],
      ]);

      $auth = Auth::user();
      $slug = str($validated['title'])
         ->slug()
         ->toString();

      $existingTodo = Todo::where('slug', $slug)->first();
      if ($existingTodo) {
         $slug = $slug . '-' . time();
      }

      Todo::create([...$validated, 'user_id' => $auth->id, 'slug' => $slug]);

      return redirect()->intended(route('todos', absolute: false));
   }

   /**
    * Show the form for editing the specified resource.
    */
   public function edit(string|int $slug)
   {
      $todo = Todo::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();

      if ($todo->user_id !== Auth::id()) {
         abort(403, 'Unauthorized action.');
      }

      return Inertia::render('todos/edit', ['todo' => $todo]);
   }

   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $slug)
   {
      $todo = Todo::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
      if ($todo->user_id !== Auth::id()) {
         abort(403, 'Unauthorized action.');
      }

      $validated = $request->validate([
         'title' => ['required', 'string', 'min:5', 'max:190'],
         'description' => ['nullable', 'string', 'min:10', 'max:290'],
         'complete_at' => ['required', 'date'],
      ]);

      $todo->update($validated);

      return redirect()->intended(route('todos', absolute: false));
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $slug)
   {
      $todo = Todo::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
      if ($todo->user_id !== Auth::id()) {
         abort(403, 'Unauthorized action.');
      }

      $todo->delete();

      return redirect()->intended(route('todos', absolute: false));
   }


   /**
    * Mark the specified todo as completed.
    */
   public function complete(string $slug)
   {
      $todo = Todo::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
      if ($todo->user_id !== Auth::id()) {
         abort(403, 'Unauthorized action.');
      }

      $todo->update([
         'is_completed' => !$todo->is_completed,
         'completed_at' => !$todo->is_completed ? now() : null,
      ]);

      return redirect()->intended(route('todos', absolute: false));
   }

   /**
    * Get todos for reminders.
    */
   public function getTodosForReminders()
   {
      $now = now();
      $tenMinutesLater = $now->copy()->addMinutes(10);

      $todos = Todo::with('user')
         ->where('is_completed', false)
         ->where('is_reminder_sent', false)
         ->whereBetween('complete_at', [$now, $tenMinutesLater])
         ->get();

      return $todos
         ->groupBy(fn($todo) => $todo->user->email)
         ->map(function ($group) {
            $user = $group->first()->user->toArray();

            $todos = $group->map(function ($todo) {
               $todoArray = $todo->toArray();
               unset($todoArray['user']);
               return $todoArray;
            })->values();

            return [
               'user' => $user,
               'todos' => $todos,
            ];
         })
         ->values();
   }
}
