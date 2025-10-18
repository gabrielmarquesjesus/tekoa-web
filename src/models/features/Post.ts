import type { GenericType } from "../GenericType";

export const DEFAULT_POST: GenericType = { value: 1, name: "Registro Comum" };
export const GRAITUDE: GenericType = { value: 2, name: "Registro de Gratidão" };

export const PostCategories: GenericType[] = [
    DEFAULT_POST,
    GRAITUDE,
];

export function GetCategoryName(value: number): string {
    const category = PostCategories.find((cat) => cat.value === value);
    return category ? category.name : "Desconhecido";
}

export interface Post {
    id: string;
    content: string;
    category: number;
    createTime: Date;
    creatorID: string;
    groupID: string;
    images: ImagePost[];
}   

export interface SimplePostReq {
    id: string;
    content: string;
    category: number;
    createTime: Date;
    creatorID: string;
    groupID: string;
    imageFile: File | null;
}   

// type SimplePost struct {
// 	ID          int64    `json:"id"`
// 	Content     string   `json:"content"`
// 	Category    Category `json:"category"`
// 	CreateTime  string   `json:"create_time"`
// 	CreatorName string   `json:"creator_name"`
// 	ImagePath   string   `json:"imagePath"`
// }

export interface SimplePost {
    id: string;
    content: string;
    category: number;
    create_time: Date;
    creator_name: string;
    image_path: string;
}

export interface ImagePost {
    id: string;
    postID: string;
    path: string;
    blindDescription: string;
}