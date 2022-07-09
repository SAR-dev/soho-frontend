export interface NotificationDataParam {
    id:          number;
    sender:      Sender;
    reciever:    number;
    group:       Group;
    target:      number;
    target_type: TargetType;
    verb:        Verb;
    done:        boolean;
    post:        number;
    created_at:  Date;
    updated_at:  Date;
}

export interface Group {
    id:           number;
    color:        string;
    author:       Sender;
}

export interface Sender {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}
export enum TargetType {
    Comment = "comment",
    Post = "post",
}

export enum Verb {
    Awarded = "awarded",
    Clapped = "clapped",
    Replied = "replied",
}
