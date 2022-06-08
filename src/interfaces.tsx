export interface createChannelInterface {
    name: string
    color?: string
}

export interface createSubChannelInterface {
    name: string
}

export interface createPostInterface {
    content: string;
    images: number[];
    category: number;
    sub_category: number;
    post_type: string;
}