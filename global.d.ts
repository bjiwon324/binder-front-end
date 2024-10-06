interface Window {
  Kakao: any;
  kakao: any;
}
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export {};
