import React from 'react'
import WebLayout from '@/Layouts/WebLayout'
import Avatar from '@/Components/Avatar'
import SocialLinks from '@/Components/SocialLinks'
import ProductCard from '@/Components/ProductCard'
import { PageProps, User } from '@/types'
import { ProductSummary } from '@/types/product'

type Props = PageProps<{
    user: User & { products?: ProductSummary[] }
}>

const Show: React.FC<Props> = ({ user }) => {
    return (
        <WebLayout>
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 p-8 text-white shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar name={user.name} src={user.avatar_url ?? undefined} size="lg" />
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Developer</p>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            {user.bio && <p className="mt-1 max-w-2xl text-sm text-white/80">{user.bio}</p>}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <SocialLinks user={user} />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Projects</p>
                    <h2 className="text-xl font-semibold text-slate-900">公開中のプロダクト</h2>
                </div>
                <p className="text-sm text-slate-500">{user.products?.length ?? 0} 件</p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {user.products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {!user.products?.length && (
                <div className="mt-6 rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
                    まだ公開中のプロダクトがありません。
                </div>
            )}
        </WebLayout>
    )
}

export default Show
