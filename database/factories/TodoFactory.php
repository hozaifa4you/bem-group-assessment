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
         'title' => $this->faker->sentence(),
         'description' => $this->faker->sentence(10),
         'reminder_at' => $this->faker->dateTime(),
         'email_sent' => $this->faker->optional()->dateTime(),
         'is_completed' => $this->faker->boolean(),
         'user_id' => 1,
      ];
   }
}
