import Gnb from "@/components/commons/Gnb";
import Splash from "@/components/commons/Splash";
import { onBoardingAtom } from "@/lib/atoms/atom";
import "@/styles/base/index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [onBoard] = useAtom(onBoardingAtom);

  const router = useRouter();

  useEffect(() => {
    if (onBoard === false) {
      router.push("/onboarding");
    }
  }, [onBoard]);

  const hideGnbOnPages = ["/signin"];
  return (
    <QueryClientProvider client={queryClient}>
      {/* Google Analytics 및 Kakao SDK 스크립트 추가 */}
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZEWF6HWTJB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZEWF6HWTJB');
        `}
      </Script>

      <div style={{ backgroundColor: "gray", height: "100vh" }}>
        <div style={{ width: "390px", margin: "0 auto" }}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          {!hideGnbOnPages.includes(router.pathname) && <Gnb />}
          <Splash />
        </div>
      </div>
    </QueryClientProvider>
  );
}
