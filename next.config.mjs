import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
=======
  sassOptions: {
    additionalData: '@import "@/styles/main.scss";',
  },
>>>>>>> 0ed2afd86699b9b95c4df3e884a1b74a82a171a1
  // 다른 Next.js 설정들
};

export default withPWA({
  dest: "public", // PWA를 위한 service worker 파일이 생성될 경로
  register: true,
  skipWaiting: true,
<<<<<<< HEAD
=======
  disable: process.env.NODE_ENV === "development", // 개발 모드에서는 PWA 비활성화
>>>>>>> 0ed2afd86699b9b95c4df3e884a1b74a82a171a1
})(nextConfig);
