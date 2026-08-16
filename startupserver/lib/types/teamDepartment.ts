export interface Leader {
    _id: string;
    name: string;
    role: string;
    avatar?: string;
    bio?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

export interface Department {
    _id: string;
    name: string;
    members: number;
    icon?: string;
    color?: string;
}

export interface TeamDepartment {
    _id?: string;
    leadership: Leader[];
    departments: Department[];
}

