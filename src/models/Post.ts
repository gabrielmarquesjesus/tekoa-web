export interface Post {
    id: string;
    content: string;
    category: string;
    createTime: Date;
    creatorID: string;
    groupID: string;
}   

export interface ImagePost {
    id: string;
    postID: string;
    path: string;
    blindDescription: string;
}