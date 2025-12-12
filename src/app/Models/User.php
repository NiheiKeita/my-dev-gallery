<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'plan_id',
        'company',
        'bio',
        'avatar_url',
        'x_url',
        'qiita_url',
        'zenn_url',
        'github_url',
        'booklog_url',
        'password',
        'tel',
        'password_token',
        'password_updated',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'password_updated' => 'boolean',
    ];

    /**
     * @return HasMany<Product, User>
     */
    public function products(): HasMany
    {
        /** @var HasMany<Product, User> $relation */
        $relation = $this->hasMany(Product::class);

        return $relation;
    }
}
