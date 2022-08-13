export interface createChannelInterface {
    name: string
}

export interface createSubChannelInterface {
    name: string;
    emoji: string;
}

export interface relocateSubChannelInterface {
    category: number;
}

export interface updatePostContentInterface {
    content?: string;
}

export interface createPostInterface {
    content?: string;
    images?: number[];
    choices?: number[];
    category?: number;
    sub_category?: number;
    post_type: string;
    link?: string;
}

export interface createPollInterface {
    text: string
}

export interface MeUpdateInterface {
    username: string;
    first_name: string;
    last_name: string;
    avatar?: File;
}

export interface CommunityUpdateInterface {
    slogan: string; 
    members_name: string;
    token: string;
    cover?: File;
}

export interface AvatarUpdateInterface {
    avatar: File;
}

export interface UpdateRulesInterface {
    rules: string;
}