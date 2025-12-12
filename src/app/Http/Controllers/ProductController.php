<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->with('user:id,name,avatar_url,x_url,qiita_url,zenn_url,github_url,booklog_url')
            ->public()
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(function (Product $product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'excerpt' => $product->excerpt,
                    'main_image_url' => $product->main_image_url,
                    'created_at' => $product->created_at,
                    'user' => $product->user,
                ];
            });

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        $user = Auth::user();

        if (! $product->is_public && (! $user || $user->id !== $product->user_id)) {
            abort(404);
        }

        $product->load([
            'user' => fn ($query) => $query->select([
                'id',
                'name',
                'bio',
                'avatar_url',
                'x_url',
                'qiita_url',
                'zenn_url',
                'github_url',
                'booklog_url',
            ]),
        ]);

        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'excerpt' => $product->excerpt,
                'main_image_url' => $product->main_image_url,
                'body_markdown' => $product->body_markdown,
                'product_url' => $product->product_url,
                'github_url' => $product->github_url,
                'is_public' => $product->is_public,
                'created_at' => $product->created_at,
                'user' => $product->user,
            ],
            'canEdit' => $user?->id === $product->user_id,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Form', [
            'product' => null,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = $request->user()->products()->create($request->validated());

        return redirect()->route('products.show', $product)->with('message', 'プロダクトを投稿しました。');
    }

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        return Inertia::render('Products/Form', [
            'product' => $product,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $product->update($request->validated());

        return redirect()->route('products.show', $product)->with('message', 'プロダクトを更新しました。');
    }
}
