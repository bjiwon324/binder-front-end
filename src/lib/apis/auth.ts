import { instance } from "./axios";

export const postLogout = async () => {
  try {
    const res = await instance.post("/auth/logout");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
