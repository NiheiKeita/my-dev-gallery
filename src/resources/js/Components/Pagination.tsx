import React from 'react'
import { Link } from '@inertiajs/react'
import { PaginationLink } from '@/types/product'

type Props = {
    links: PaginationLink[]
}

export const Pagination: React.FC<Props> = ({ links }) => {
    if (!links || links.length <= 3) {
        return null
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {links.map((link, index) => {
                if (!link.url) {
                    return (
                        <span key={index} className="rounded-full px-3 py-1 text-sm text-slate-400">
                            {stripTags(link.label)}
                        </span>
                    )
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                            link.active ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:ring-indigo-300'
                        }`}
                    >
                        {stripTags(link.label)}
                    </Link>
                )
            })}
        </div>
    )
}

const stripTags = (label: string) => label.replace(/<[^>]*>?/gm, '')

export default Pagination
