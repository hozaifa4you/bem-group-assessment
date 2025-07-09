<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Auth;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
   /**
    * Define the model's default state.
    *
    * @return array<string, mixed>
    */
   public function definition(): array
   {

      return [
         'title' => $this->faker->sentence(3),
         'description' => $this->faker->paragraph(2),
         'complete_at' => $this->faker->dateTimeBetween('now', '+1 month'),
         'is_completed' => $this->faker->boolean(),
         'user_id' => 1,
      ];
   }
}
