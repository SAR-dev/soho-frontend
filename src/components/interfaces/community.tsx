export interface CommunityDataParam {
    id: number;
    title: null;
    about: null;
    members_name: string;
    color: string;
    status: string;
    subscribers_count: number;
    subscribed: boolean;
    post_count: number;
    author: Author;
    slogan: string;
    cover?: string;
    is_admin: boolean;
    is_moderator: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CommunitySearchDataParam {
    id: number;
    title?: string;
    about?: string;
    members_name: string;
    color: string;
    status: string;
    subscribers_count: number;
    subscribed: boolean;
    author: Author;
    slogan: string;
    cover?: string;
    created_at: Date;
    updated_at: Date;
}

interface Author {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    avatar: string;
}

export interface CommunityUpdateDataParam {
    slogan: string; 
    members_name: string;
    token: string;
    cover: string;
}