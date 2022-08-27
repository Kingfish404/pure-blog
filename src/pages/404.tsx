import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from './_app';
import Config from '../../_data/config.json';
import * as layout from '../layouts';

const Page: NextPageWithLayout = (props: any) => {

  useEffect(() => {
    if (window && (window.location.href.endsWith('.html') || window.location.href.endsWith('.htm'))) {
      // suitable for .*[(\.html)|(\.htm)]
      const href = window.location.href;
      let finalHref = href.slice(0, href.lastIndexOf('.'));
      const item = finalHref.split('/');
      if (item.length === 8) {
        // suitable for /posts/[year]/[month]/[day]/[id]
        finalHref = item.slice(0, 6).join('/') + '/' + item.slice(7, 8).join('/');
        finalHref = finalHref.toLowerCase();
      }
      window.location.replace(finalHref);
    }
    return () => { };
  });

  return (
    <>
      <Head>
        <title>{`404 - ${Config.title}`}</title>
      </Head>
      <div>
        <p>404 | This page could not be found</p>
      </div>
      <style
        jsx>{`
        div {
          color: #000;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
          height: 100vh;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }`}</style>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <layout.LayoutDefault>
      {page}
    </layout.LayoutDefault>
  );
};
