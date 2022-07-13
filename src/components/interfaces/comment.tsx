export interface TreeCommentDataParam {
    id:           number;
    is_active:    boolean;
    content:      string;
    mention:      null;
    author:       Author;
    post:         number;
    parent:       null;
    upvoted:      boolean;
    num_vote_up:  number;
    hands_raised: boolean;
    hands_count:  number;
    created_at:   Date;
    children?:    CommentDataParam[] 
}

export interface CommentDataParam {
    id:           number;
    is_active:    boolean;
    content:      string;
    mention:      null;
    author:       Author;
    post:         number;
    parent:       null;
    upvoted:      boolean;
    num_vote_up:  number;
    hands_raised: boolean;
    hands_count:  number;
    created_at:   Date;
    children?:    CommentDataParam[]
}

export interface Author {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}
