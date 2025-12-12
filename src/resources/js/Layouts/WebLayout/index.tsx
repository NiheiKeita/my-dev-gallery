
import WebHeader from '@/Components/WebHeader'
import React from 'react'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import FlashMessage from '@/Components/FlashMessage'

type Props = {
    children: React.ReactNode
}
export const WebLayout = React.memo<Props>(function AdminLayout({
    children,
}) {
    const inertiaPage = (() => {
        try {
            return usePage<PageProps>()
        } catch {
            return { props: { flash: {} } } as unknown as { props: PageProps }
        }
    })()
    const { props: { flash } } = inertiaPage

    return (
        <>
            <WebHeader />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-yuGothic">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    {flash?.message && (
                        <div className="mb-6">
                            <FlashMessage>{flash.message}</FlashMessage>
                        </div>
                    )}
                    {children}
                </div>
            </div >
        </>
    )

})
export default WebLayout
