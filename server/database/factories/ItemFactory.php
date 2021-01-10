<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'image_url' => 'https://source.unsplash.com/random',
            'starting_price' => $this->faker->numberBetween(0, 100),
            'close_at' => now()->addDays(7),
        ];
    }
}
