import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>주변 쓰레기통 찾기, Binder </title>
        <link rel="icon" href="/images/logo-144.png" />

        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content="Binder" />
        <meta property="og:description" content="내 주변 쓰레기통을 찾아보자" />
        <meta
          property="og:image"
          content="https://www.bin-finder.net/images/logo-144.png"
        />
        <meta property="og:url" content="https://www.bin-finder.net/" />
        <meta property="og:type" content="website" />

        {/* Twitter 메타 태그 */}
        <meta
          name="twitter:card"
          content="https://www.bin-finder.net/images/logo-144.png"
        />
        <meta name="twitter:title" content="Binder" />
        <meta
          name="twitter:description"
          content="내 주변 쓰레기통을 찾아보자"
        />
        <meta
          name="twitter:image"
          content="https://www.bin-finder.net/images/logo-144.png"
        />

        <link rel="manifest" href="/manifest.json" />
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="portal-root"></div>
      </body>
    </Html>
  );
}
