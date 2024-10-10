import { instance } from "./axios";

export type SortType = "CREATED_AT_DESC" | "LIKE_COUNT_DESC";

export const getComments = async (
  id: string | number,
  sortType: SortType,
  lastCommentId = 0,
  lastLikeCount = 0
) => {
  try {
    if (lastCommentId === 0) {
      const res = await instance.get(`/comments`, {
        params: { binId: id, sort: sortType },
      });
      return res.data;
    } else if (sortType === "LIKE_COUNT_DESC") {
      const res = await instance.get(`/comments`, {
        params: { binId: id, sort: sortType, lastCommentId, lastLikeCount },
      });
      return res.data;
    } else {
      const res = await instance.get(`/comments`, {
        params: { binId: id, sort: "CREATED_AT_DESC", lastCommentId },
      });
      return res.data;
    }
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
