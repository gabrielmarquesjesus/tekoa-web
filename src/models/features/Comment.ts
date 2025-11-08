export interface Comment {
    id: number;
    content:string;
    post_id:number;
    creator_id:number;
    parent_id:number;
    created_at:Date;
}