declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
  interface Window {
    Kakao: any;
    kakao: any;
  }
}
export {};
