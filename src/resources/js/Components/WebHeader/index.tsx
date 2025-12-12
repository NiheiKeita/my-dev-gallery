
import React, { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import Button from '../Button'
import { PageProps } from '@/types'

export const WebHeader = React.memo(function WebHeader() {
    const { auth } = usePage<PageProps>()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        router.post(route('logout'))
    }

    return (
        <header className="sticky left-0 top-0 z-50 w-full bg-white/90 backdrop-blur shadow">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <Link href={route('products.index')} className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow">DG</span>
                        <span>My Dev Gallery</span>
                    </Link>
                </div>
                <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
                    <Link href={route('products.index')} className="hover:text-indigo-600">一覧</Link>
                    {auth.user && (
                        <>
                            <Link href={route('products.create')} className="hover:text-indigo-600">投稿する</Link>
                            <Link href={route('users.show', auth.user.id)} className="hover:text-indigo-600">マイページ</Link>
                        </>
                    )}
                </nav>
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <Button variant="blue" onClick={handleLogout}>ログアウト</Button>
                    ) : (
                        <Button variant="blue" onClick={() => router.visit(route('login'))}>ログイン</Button>
                    )}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 md:hidden">
                        <span className="block h-0.5 w-6 bg-gray-700"></span>
                        <span className="my-1 block h-0.5 w-6 bg-gray-700"></span>
                        <span className="block h-0.5 w-6 bg-gray-700"></span>
                    </button>
                </div>
            </div>
            <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t bg-white px-4 pb-4 pt-2 text-sm font-medium text-slate-700`}>
                <Link href={route('products.index')} className="block py-2" onClick={() => setIsMenuOpen(false)}>一覧</Link>
                {auth.user && (
                    <>
                        <Link href={route('products.create')} className="block py-2" onClick={() => setIsMenuOpen(false)}>投稿する</Link>
                        <Link href={route('users.show', auth.user.id)} className="block py-2" onClick={() => setIsMenuOpen(false)}>マイページ</Link>
                        <button className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-left text-white" onClick={handleLogout}>ログアウト</button>
                    </>
                )}
                {!auth.user && (
                    <Link href={route('login')} className="block py-2" onClick={() => setIsMenuOpen(false)}>ログイン</Link>
                )}
            </nav>
        </header>
    )
})
export default WebHeader
