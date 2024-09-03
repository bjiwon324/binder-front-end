import { instance } from "./axios";

export const getMembers = async (cookies: string | undefined) => {
  try {
    const res = await instance.get("/members/me", {
      headers: {
        Cookie: cookies || "", // 쿠키를 헤더에 포함하여 API 요청
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    window.location.href = "/";
  }
};
