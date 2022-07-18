export interface RulesDataParam {
    id:           number;
    rules:        string;
    author:       Author;
    is_admin:     boolean;
    is_moderator: boolean;
    created_at:   Date;
    updated_at:   Date;
}

export interface Author {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}