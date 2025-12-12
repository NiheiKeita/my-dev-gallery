import React from 'react'
import { User } from '@/types'

type Props = {
    user: Pick<User, 'x_url' | 'qiita_url' | 'zenn_url' | 'github_url' | 'booklog_url'>
    size?: 'sm' | 'md'
}

const iconSize = (size: Props['size']) => (size === 'sm' ? 'h-5 w-5' : 'h-6 w-6')

export const SocialLinks: React.FC<Props> = ({ user, size = 'md' }) => {
    const items = [
        {
            key: 'x_url',
            label: 'X',
            url: user.x_url,
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize(size)}>
                    <path d="M18.9 3h3.1l-6.8 7.7L23 21h-6.4l-4.1-5.4L7.7 21H4.6l7.3-8.3L1 3h6.5l3.7 5 4.7-5z" />
                </svg>
            ),
        },
        {
            key: 'qiita_url',
            label: 'Qiita',
            url: user.qiita_url,
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize(size)}>
                    <path d="M4.5 4h15A1.5 1.5 0 0 1 21 5.5v13A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-13A1.5 1.5 0 0 1 4.5 4zm2 4v8h2V8h-2zm4 0v8h2V8h-2zm4 0v8h2V8h-2z" />
                </svg>
            ),
        },
        {
            key: 'zenn_url',
            label: 'Zenn',
            url: user.zenn_url,
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize(size)}>
                    <path d="M5 4h14v3l-8 5.5 8 5.5V21H5v-3l8-5.5L5 7z" />
                </svg>
            ),
        },
        {
            key: 'github_url',
            label: 'GitHub',
            url: user.github_url,
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize(size)}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.2-3.07-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.17.92-.26 1.9-.39 2.88-.4.98.01 1.96.14 2.88.4 2.21-1.48 3.17-1.17 3.17-1.17.64 1.59.24 2.77.12 3.06.75.8 1.2 1.82 1.2 3.07 0 4.41-2.69 5.39-5.25 5.67.42.36.79 1.08.79 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
            ),
        },
        {
            key: 'booklog_url',
            label: 'Booklog',
            url: user.booklog_url,
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize(size)}>
                    <path d="M5 4h10a4 4 0 0 1 4 4v10H7a2 2 0 0 1-2-2V4zm2 2v10h10V8a2 2 0 0 0-2-2H7z" />
                    <path d="M5 18h12v2H7a2 2 0 0 1-2-2z" />
                </svg>
            ),
        },
    ]

    const visible = items.filter((item) => item.url)

    if (!visible.length) {
        return null
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            {visible.map((item) => (
                <a
                    key={item.key}
                    href={item.url ?? '#'}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-indigo-300"
                >
                    {item.icon}
                    <span className="text-xs font-semibold">{item.label}</span>
                </a>
            ))}
        </div>
    )
}

export default SocialLinks
