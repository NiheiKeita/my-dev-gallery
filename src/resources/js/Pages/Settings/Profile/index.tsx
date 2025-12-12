import React from 'react'
import { useForm } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import Button from '@/Components/Button'
import { PageProps, User } from '@/types'

type Props = PageProps<{
    user: User
}>

const Profile: React.FC<Props> = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        bio: user.bio ?? '',
        avatar_url: user.avatar_url ?? '',
        x_url: user.x_url ?? '',
        qiita_url: user.qiita_url ?? '',
        zenn_url: user.zenn_url ?? '',
        github_url: user.github_url ?? '',
        booklog_url: user.booklog_url ?? '',
        company: user.company ?? '',
        tel: user.tel ?? '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('profile.update'))
    }

    return (
        <WebLayout>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
                    <h1 className="text-2xl font-semibold text-slate-900">プロフィール編集</h1>
                    <p className="text-sm text-slate-600">名前・自己紹介・各種リンクを入力してください。空欄のリンクはアイコン非表示になります。</p>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="name" value="表示名 *" />
                            <TextInput id="name" name="name" value={data.name} className="mt-1 block w-full" onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="avatar_url" value="アバターURL" />
                            <TextInput id="avatar_url" name="avatar_url" value={data.avatar_url} className="mt-1 block w-full" onChange={(e) => setData('avatar_url', e.target.value)} />
                            <InputError message={errors.avatar_url} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="bio" value="自己紹介" />
                        <TextArea id="bio" name="bio" value={data.bio} className="mt-1 block min-h-[140px] w-full" onChange={(e) => setData('bio', e.target.value)} />
                        <InputError message={errors.bio} className="mt-2" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="company" value="会社/所属 (任意)" />
                            <TextInput id="company" name="company" value={data.company} className="mt-1 block w-full" onChange={(e) => setData('company', e.target.value)} />
                            <InputError message={errors.company} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="tel" value="電話番号 (任意)" />
                            <TextInput id="tel" name="tel" value={data.tel} className="mt-1 block w-full" onChange={(e) => setData('tel', e.target.value)} />
                            <InputError message={errors.tel} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="x_url" value="X (Twitter) URL" />
                            <TextInput id="x_url" name="x_url" value={data.x_url} className="mt-1 block w-full" onChange={(e) => setData('x_url', e.target.value)} />
                            <InputError message={errors.x_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="github_url" value="GitHub URL" />
                            <TextInput id="github_url" name="github_url" value={data.github_url} className="mt-1 block w-full" onChange={(e) => setData('github_url', e.target.value)} />
                            <InputError message={errors.github_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="qiita_url" value="Qiita URL" />
                            <TextInput id="qiita_url" name="qiita_url" value={data.qiita_url} className="mt-1 block w-full" onChange={(e) => setData('qiita_url', e.target.value)} />
                            <InputError message={errors.qiita_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="zenn_url" value="Zenn URL" />
                            <TextInput id="zenn_url" name="zenn_url" value={data.zenn_url} className="mt-1 block w-full" onChange={(e) => setData('zenn_url', e.target.value)} />
                            <InputError message={errors.zenn_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="booklog_url" value="Booklog URL" />
                            <TextInput id="booklog_url" name="booklog_url" value={data.booklog_url} className="mt-1 block w-full" onChange={(e) => setData('booklog_url', e.target.value)} />
                            <InputError message={errors.booklog_url} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button variant="blue" disabled={processing}>更新する</Button>
                    </div>
                </form>
            </div>
        </WebLayout>
    )
}

export default Profile
