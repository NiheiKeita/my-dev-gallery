import React from 'react'

type Props = {
    name: string
    src?: string | null
    size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
}

export const Avatar: React.FC<Props> = ({ name, src, size = 'md' }) => {
    const initials = name ? name.slice(0, 2).toUpperCase() : '?'
    const sizeClass = sizeMap[size]

    if (src) {
        return <img src={src} alt={name} className={`${sizeClass} rounded-full object-cover`} />
    }

    return (
        <div className={`flex items-center justify-center ${sizeClass} rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 font-semibold text-white shadow-inner`}>
            {initials}
        </div>
    )
}

export default Avatar
