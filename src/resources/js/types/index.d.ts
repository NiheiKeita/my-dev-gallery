export interface User {
    id: number;
    name: string;
    email?: string;
    email_verified_at?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    x_url?: string | null;
    qiita_url?: string | null;
    zenn_url?: string | null;
    github_url?: string | null;
    booklog_url?: string | null;
    company?: string | null;
    tel?: string | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user?: User | null;
    };
    flash?: {
        message?: string;
    };
};
