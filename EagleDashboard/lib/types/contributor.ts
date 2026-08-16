export interface Contributor {
    _id: string;
    name: string;
    role: string;
    avatar: string;
    contributions: number;
    github?: string;
    linkedin?: string;
    twitter?: string;
    createdAt: string;
}

export interface ContributorInput {
    name: string;
    role: string;
    contributions?: number;
    github?: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
}

