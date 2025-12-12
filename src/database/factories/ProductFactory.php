<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'excerpt' => $this->faker->sentence(8),
            'main_image_url' => $this->faker->imageUrl(1200, 630, 'tech', true),
            'body_markdown' => $this->faker->paragraphs(3, true),
            'product_url' => $this->faker->url(),
            'github_url' => $this->faker->url(),
            'is_public' => true,
        ];
    }
}
