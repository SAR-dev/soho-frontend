export interface SubscriberDataParam {
    id:                number;
    title:             null;
    about:             null;
    members_name:      string;
    color:             string;
    status:            string;
    subscribers_count: number;
    subscribed:        boolean;
    author:            Author;
    created_at:        Date;
    updated_at:        Date;
}

export interface Author {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}
