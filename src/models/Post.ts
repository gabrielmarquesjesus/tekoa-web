import type { GenericType } from "./GenericType";

export const DEFAULT_POST: GenericType = { value: 1, name: "Registro Comum" };
export const GRAITUDE: GenericType = { value: 2, name: "Registro de Gratidão" };

export const PostCategories: GenericType[] = [
    DEFAULT_POST,
    GRAITUDE,
];

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

export interface ImagePost {
    id: string;
    postID: string;
    path: string;
    blindDescription: string;
}