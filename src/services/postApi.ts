import {
  commentRequest,
  editRequest,
  postRequest,
} from "model/post/post.model";
import Api from "./api";

export const PostApi = {
  getAllPost: (offset: number, limit: number) =>
    Api.get(`/posts?offset=${offset}&limit=${limit}&updatedAt[sort]=desc`),
  getPostByid: (id: string) => Api.get(`/posts/${id}`),
  getMyPost: (offset: number, limit: number) =>
    Api.get(`/posts/me?offset=${offset}&limit=${limit}&updatedAt[sort]=desc`),
  createPost: (data: postRequest) =>
    Api.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  putPost: (id: string, data: editRequest) => Api.put(`/posts/${id}`, data),
  deletePost: (id: string) => Api.delete(`/posts/${id}`),
};

export const postAvatar = (data: any) => Api.post("/users/avatar", data);

export const commentApi = {
  getComment: (id: string, skip: number, limit: number) =>
    Api.get(`/comment/${id}?skip=${skip}&limit=${limit}&updatedAt[sort]=desc`),
  createComment: (data: commentRequest) => Api.post(`/comment`, data),
};
