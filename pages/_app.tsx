import "../styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "react-query";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "@/lib/gtag";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage || !storage.getItem("currentPath")) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath ?? "/");
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 300 * 1_000,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1_000,
      },
    },
  });
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
    //  <QueryProvider pageProps={pageProps}>{getLayout(<Component {...pageProps} />)}</QueryProvider>
  );
};

export default App;
