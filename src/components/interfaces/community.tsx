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
    is_admin: boolean;
    is_moderator: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Author {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    avatar: string;
}
