export interface Category {
    id: number;
    name: string;
    slug: string;
    sub_categories: SubCategory[];
    children?: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    emoji: string;
}