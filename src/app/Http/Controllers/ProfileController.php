<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(User $user): Response
    {
        $user->load([
            'products' => fn ($query) => $query
                ->public()
                ->latest()
                ->select(['id', 'user_id', 'title', 'excerpt', 'main_image_url', 'created_at']),
        ]);

        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'avatar_url' => $user->avatar_url,
                'x_url' => $user->x_url,
                'qiita_url' => $user->qiita_url,
                'zenn_url' => $user->zenn_url,
                'github_url' => $user->github_url,
                'booklog_url' => $user->booklog_url,
                'products' => $user->products,
            ],
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Settings/Profile', [
            'user' => $request->user(),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $request->user()->update($request->validated());

        return redirect()->route('profile.edit')->with('message', 'プロフィールを更新しました。');
    }
}
