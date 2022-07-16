export interface Category {
    id: number;
    emoji: string;
    name: string;
    slug: string;
    about: null;
    sub_categories: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
}