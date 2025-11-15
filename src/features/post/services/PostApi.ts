import { api } from "../../../api/request";
import type { SimplePostReq } from "../../../models/features/Post";

export async function CreatePost(post: SimplePostReq): Promise<Error | null> {
   const formData = new FormData();
   if (post.imageFile) {
      formData.append('image', post.imageFile);
   }
   formData.append('id', post.id);
   formData.append('content', post.content);
   formData.append('category', post.category.toString());
   formData.append('creator_id', post.creatorID);
   const { data, error, status } = await api.post('/post', formData)
   if (error) {
      return new Error(error)
   }
   return null;
}