import React from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import { PageProps } from '@/types'
import { Paginated, ProductSummary } from '@/types/product'
import ProductCard from '@/Components/ProductCard'
import Pagination from '@/Components/Pagination'
import Button from '@/Components/Button'

type Props = PageProps<{
    products: Paginated<ProductSummary>
}>

const Index: React.FC<Props> = ({ products }) => {
    const { auth } = usePage<PageProps>()

    return (
        <WebLayout>
            <div className="rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 p-8 text-white shadow-lg">
                <p className="text-sm uppercase tracking-[0.25em] text-white/80">Hobby Projects</p>
                <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">趣味開発ギャラリー</h1>
                        <p className="mt-2 text-base text-white/90">つくってきた個人プロダクトを並べて眺める。カードをクリックして詳しく見てみよう。</p>
                    </div>
                    {auth.user && (
                        <Button variant="default" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => router.visit(route('products.create'))}>
                            新しいプロダクトを投稿
                        </Button>
                    )}
                </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {!products.data.length && (
                <div className="mt-10 rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
                    まだ投稿がありません。{auth.user ? <Link href={route('products.create')} className="text-indigo-600 underline">最初の投稿を作成</Link> : 'ログインして投稿してみましょう。'}
                </div>
            )}

            <div className="mt-10">
                <Pagination links={products.links} />
            </div>
        </WebLayout>
    )
}

export default Index
