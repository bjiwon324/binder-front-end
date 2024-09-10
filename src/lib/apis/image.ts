import { instance } from "./axios";

export const postImg = async (data: any) => {
  try {
    const res = await instance.post("/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
