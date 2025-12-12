import React from 'react'
import { Link, router } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import { PageProps } from '@/types'
import { ProductDetail } from '@/types/product'
import Avatar from '@/Components/Avatar'
import SocialLinks from '@/Components/SocialLinks'
import Button from '@/Components/Button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'

type Props = PageProps<{
    product: ProductDetail
    canEdit: boolean
}>

const Show: React.FC<Props> = ({ product, canEdit }) => {
    return (
        <WebLayout>
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="relative h-72 bg-slate-100 md:h-96">
                    <img src={product.main_image_url} alt={product.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-white/80">Product Detail</p>
                                <h1 className="text-3xl font-bold leading-tight md:text-4xl">{product.title}</h1>
                                <p className="mt-2 max-w-3xl text-sm text-white/80 md:text-base">{product.excerpt}</p>
                            </div>
                            {canEdit && (
                                <Button variant="default" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => router.visit(route('products.edit', product.id))}>
                                    ✏️ 編集する
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 p-6 md:grid-cols-[2fr_1fr] md:p-10">
                    <div className="markdown-body space-y-4 text-slate-800 leading-relaxed">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSanitize]}
                            components={{
                                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer noopener" />,
                            }}
                        >
                            {product.body_markdown}
                        </ReactMarkdown>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Links</p>
                            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-800">
                                {product.product_url && (
                                    <a href={product.product_url} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-indigo-300">
                                        🌐 プロダクトを見る
                                    </a>
                                )}
                                {product.github_url && (
                                    <a href={product.github_url} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-indigo-300">
                                        💻 GitHubを見る
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">この開発者</p>
                            <div className="mt-3 flex items-center gap-3">
                                <Avatar name={product.user?.name ?? 'Developer'} src={product.user?.avatar_url ?? undefined} />
                                <div>
                                    <p className="text-lg font-semibold">{product.user?.name}</p>
                                    {product.user?.bio && <p className="text-sm text-white/80">{product.user.bio}</p>}
                                </div>
                            </div>
                            {product.user && (
                                <div className="mt-4">
                                    <SocialLinks user={product.user} />
                                </div>
                            )}
                            {product.user && (
                                <Link href={route('users.show', product.user.id)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                                    開発者プロフィールを見る →
                                </Link>
                            )}
                        </div>

                        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">投稿日時</p>
                            <p className="mt-2 text-sm font-semibold text-slate-800">{product.created_at ? new Date(product.created_at).toLocaleString() : ''}</p>
                            <p className="mt-2 text-xs text-slate-500">非公開フラグ: {product.is_public ? '公開' : '非公開'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default Show
