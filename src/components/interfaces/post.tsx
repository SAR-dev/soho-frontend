export interface PostDataParam {
    id: number;
    status: string;
    content: string | null;
    images: Image[];
    link: string | null;
    category: Category;
    sub_category: Category;
    release_time: string | null;
    duration: string | null;
    thumbnail: string | null;
    is_blur: boolean;
    post_type: string;
    can_vote: boolean;
    can_comment: boolean;
    author: Author;
    group: Group;
    choices?: Choice[];
    choices_voted?: number;
    num_vote_up: number;
    bookmarks_count: number;
    bookmarked: boolean;
    upvoted: boolean;
    comments_count: number;
    available_awards: AvailableAward[];
    awards: any;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Author {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    avatar: string;
  }

  export interface Choice {
    id: number;
    text: string;
    num_vote_up: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    color?: string;
  }
  
  export interface Group {
    id: number;
    status: string;
    author: Author;
    subscribers_count: number;
    subscribed: boolean;
    post_count: number;
    is_admin: boolean;
    is_moderator: boolean;
  }
  
  export interface Image {
    id: number;
    image: string;
    height: number;
    width: number;
    description: string;
    author: Author;
  }

  export interface AvailableAward {
    id:          number;
    name:        string;
    logo:        string;
    description: string;
    price:       number;
}