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
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath ?? "/");
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

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
};

export default App;
