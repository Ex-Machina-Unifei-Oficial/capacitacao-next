import "@/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS 12</title>
      </Head>

      <div className="bg-blue-500 h-screen flex flex-col items-center justify-center">
        <h1 className="text-lg">Layout Comum Antigo</h1>
        <Component {...pageProps} />
      </div>
    </>
  );
}
