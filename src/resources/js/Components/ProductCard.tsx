import React from 'react'
import { Link } from '@inertiajs/react'
import { ProductSummary } from '@/types/product'
import Avatar from './Avatar'

type Props = {
    product: ProductSummary
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <Link
            href={route('products.show', product.id)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={product.main_image_url} alt={product.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="space-y-1">
                    <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{product.title}</h3>
                    <p className="line-clamp-2 text-sm text-slate-600">{product.excerpt}</p>
                </div>
                {product.user && (
                    <div className="mt-auto flex items-center gap-3 text-sm text-slate-600">
                        <Avatar name={product.user.name} src={product.user.avatar_url ?? undefined} size="sm" />
                        <div>
                            <p className="font-semibold text-slate-800">{product.user.name}</p>
                            {product.created_at && <p className="text-xs text-slate-500">{new Date(product.created_at).toLocaleDateString()}</p>}
                        </div>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ProductCard
