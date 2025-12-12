import React from 'react'
import { Link, useForm } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import Button from '@/Components/Button'
import { PageProps } from '@/types'
import { ProductDetail } from '@/types/product'

type Props = PageProps<{
    product: ProductDetail | null
}>

const Form: React.FC<Props> = ({ product }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        title: product?.title ?? '',
        excerpt: product?.excerpt ?? '',
        main_image_url: product?.main_image_url ?? '',
        body_markdown: product?.body_markdown ?? '',
        product_url: product?.product_url ?? '',
        github_url: product?.github_url ?? '',
        is_public: product?.is_public ?? true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (product) {
            put(route('products.update', product.id))
        } else {
            post(route('products.store'))
        }
    }

    return (
        <WebLayout>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{product ? 'Edit' : 'Create'}</p>
                        <h1 className="text-2xl font-semibold text-slate-900">{product ? 'プロダクトを編集' : '新しいプロダクトを投稿'}</h1>
                        <p className="text-sm text-slate-600">タイトル・概要・メイン画像URLとMarkdown本文だけで、すぐに共有できます。</p>
                    </div>
                    <Link href={route('products.index')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">一覧へ戻る</Link>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="タイトル *" />
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="excerpt" value="ひとこと説明 *" />
                        <TextInput
                            id="excerpt"
                            name="excerpt"
                            value={data.excerpt}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('excerpt', e.target.value)}
                        />
                        <InputError message={errors.excerpt} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="main_image_url" value="サムネイル画像URL *" />
                        <TextInput
                            id="main_image_url"
                            name="main_image_url"
                            value={data.main_image_url}
                            className="mt-1 block w-full"
                            placeholder="https://example.com/cover.png"
                            onChange={(e) => setData('main_image_url', e.target.value)}
                        />
                        <InputError message={errors.main_image_url} className="mt-2" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="product_url" value="プロダクトURL" />
                            <TextInput
                                id="product_url"
                                name="product_url"
                                value={data.product_url}
                                className="mt-1 block w-full"
                                placeholder="https://my-product.com"
                                onChange={(e) => setData('product_url', e.target.value)}
                            />
                            <InputError message={errors.product_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="github_url" value="GitHub URL" />
                            <TextInput
                                id="github_url"
                                name="github_url"
                                value={data.github_url}
                                className="mt-1 block w-full"
                                placeholder="https://github.com/you/repo"
                                onChange={(e) => setData('github_url', e.target.value)}
                            />
                            <InputError message={errors.github_url} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="body_markdown" value="本文 (Markdown) *" />
                        <TextArea
                            id="body_markdown"
                            name="body_markdown"
                            value={data.body_markdown}
                            className="mt-1 block min-h-[240px] w-full"
                            onChange={(e) => setData('body_markdown', e.target.value)}
                        />
                        <InputError message={errors.body_markdown} className="mt-2" />
                        <p className="mt-2 text-xs text-slate-500">ReactMarkdown + rehype-sanitize で安全にレンダリングされます。</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_public"
                            type="checkbox"
                            checked={data.is_public}
                            onChange={(e) => setData('is_public', e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <label htmlFor="is_public" className="text-sm text-slate-700">公開する</label>
                    </div>
                    <InputError message={errors.is_public} className="mt-2" />

                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('products.index')} className="text-sm font-semibold text-slate-600 hover:text-slate-800">
                            キャンセル
                        </Link>
                        <Button variant="blue" disabled={processing}>
                            {product ? '更新する' : '投稿する'}
                        </Button>
                    </div>
                </form>
            </div>
        </WebLayout>
    )
}

export default Form
