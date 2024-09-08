// import { serialize } from "cookie";
// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     // 요청에서 JWT 토큰을 받음
//     const { token } = req.body;

//     // 쿠키를 설정 (HttpOnly, SameSite 등 옵션 설정 가능)
//     res.setHeader(
//       "Set-Cookie",
//       serialize("Authorization", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24, // 1일
//         sameSite: "strict",
//         path: "/",
//       })
//     );

//     res.status(200).json({ message: "쿠키 설정 완료" });
//   } else {
//     res.status(405).json({ message: "지원하지 않는 메서드입니다." });
//   }
// }
