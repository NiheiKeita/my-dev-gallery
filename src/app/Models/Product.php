<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    /** @phpstan-use HasFactory<ProductFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'excerpt',
        'main_image_url',
        'body_markdown',
        'product_url',
        'github_url',
        'is_public',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_public' => 'boolean',
    ];

    /**
     * @return BelongsTo<User, Product>
     */
    public function user(): BelongsTo
    {
        /** @var BelongsTo<User, Product> $relation */
        $relation = $this->belongsTo(User::class);

        return $relation;
    }

    /**
     * @param Builder<Product> $query
     * @return Builder<Product>
     */
    public function scopePublic(Builder $query): Builder
    {
        return $query->where('is_public', true);
    }

    protected static function newFactory(): ProductFactory
    {
        return ProductFactory::new();
    }
}
