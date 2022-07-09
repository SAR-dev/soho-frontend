export interface ActivityDataParam {
    id:          number;
    sender:      Sender;
    reciever:    number | null;
    group:       number;
    target:      number;
    target_type: string;
    verb:        string;
    post:        number;
    created_at:  Date;
    updated_at:  Date;
}

export interface Sender {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}
