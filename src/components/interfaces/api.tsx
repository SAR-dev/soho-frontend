export interface createChannelInterface {
    name: string
    emoji?: string
}

export interface createSubChannelInterface {
    name: string
}

export interface createPostInterface {
    content: string;
    images?: number[];
    choices?: number[];
    category?: number;
    sub_category?: number;
    post_type: string;
}

export interface createPollInterface {
    text: string
}