import { User } from './index'

export type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

export type Paginated<T> = {
    data: T[]
    links: PaginationLink[]
    current_page: number
    last_page: number
}

export type ProductSummary = {
    id: number
    title: string
    excerpt: string
    main_image_url: string
    created_at?: string
    user?: User
}

export type ProductDetail = ProductSummary & {
    body_markdown: string
    product_url?: string | null
    github_url?: string | null
    is_public: boolean
}
