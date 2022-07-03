export interface LeaderboardDataParam {
    reciever: Reciever;
    claps: number;
}

export interface Reciever {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    avatar: string;
}
