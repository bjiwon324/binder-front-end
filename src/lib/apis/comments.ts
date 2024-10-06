import { instance } from "./axios";

export type SortType = "CREATED_AT_DESC" | "LIKE_COUNT_DESC";

export const getComments = async (id: string | number, sortType: SortType) => {
  try {
    const res = await instance.get(`/comments`, {
      params: { binId: id, sort: sortType },
    });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const getCommentDetail = async (id: string | number) => {
  try {
    const res = await instance.get(`/comments/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const postComment = async (id: string | number, content: string) => {
  try {
    const res = await instance.post(`/comments`, { binId: id, content });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const deleteComment = async (commentId: string | number) => {
  try {
    const res = await instance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const patchComment = async (
  commentId: string | number,
  content: string
) => {
  try {
    const res = await instance.patch(`/comments/${commentId}`, { content });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const postCommentLike = async (commentId: string | number) => {
  try {
    const res = await instance.post(`/comments/${commentId}/like`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const deleteCommentLike = async (commentId: string | number) => {
  try {
    const res = await instance.delete(`/comments/${commentId}/like`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const postCommentDislike = async (commentId: string | number) => {
  try {
    const res = await instance.post(`/comments/${commentId}/dislike`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const deleteCommentDislike = async (commentId: string | number) => {
  try {
    const res = await instance.delete(`/comments/${commentId}/dislike`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
