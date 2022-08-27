import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';

export type NextPageWithLayout = NextPage<{ children?: ReactNode } | any> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.getPV && window.getPV();
      window.initPV && window.initPV();
      window.renderLatex && window.renderLatex();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return getLayout(<Component {...pageProps} />);
}
