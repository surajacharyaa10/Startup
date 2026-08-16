export interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    publicId?: string;
    author?: string;
    slug: string;
    tags: string[];
    category?: string;
    readTime?: string;
    views: number;
    type?: string;
    externalUrl?: string;
    createdAt: string;
}

export interface BlogInput {
    title: string;
    content: string;
    image?: string;
    author?: string;
    slug?: string;
    tags?: string[];
    category?: string;
    readTime?: string;
}

