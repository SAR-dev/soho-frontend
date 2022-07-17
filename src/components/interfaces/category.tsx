export interface Category {
    id: number;
    emoji: string;
    name: string;
    slug: string;
    about: null;
    sub_categories: SubCategory[];
    children?: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
}