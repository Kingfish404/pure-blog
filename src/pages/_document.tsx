import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Config from '../../_data/config.json';
import * as lib from '../lib';

class MyDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang='zh-CN'>
        <Head>
          <meta itemProp="name" content={Config.title} />
          <meta name="description" content={Config.desc} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* leadcloud pv uv record */}
          {lib.LC_APPID && lib.LC_KEY &&
            <>
              <script src="https://pv.sohu.com/cityjson" defer />
              <script defer src={`//code.bdstatic.com/npm/leancloud-storage@4.12.0/dist/av-min.js`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                function lc(){
                  AV.init({
                    appId: '${lib.LC_APPID}',
                    appKey: '${lib.LC_KEY}',
                  });
                };
                `}} />
              <script defer src={`/assets/leancloud.js`} />
            </>}
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          {lib.GA_TRACKING_ID &&
            <>
              <script defer src={`https://www.googletagmanager.com/gtag/js?id=${lib.GA_TRACKING_ID}`} />
              <script dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${lib.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });` }} />
            </>}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossOrigin="anonymous" />
          <script type="module" dangerouslySetInnerHTML={{
            __html: `
            import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/contrib/auto-render.mjs";
            const renderLatex = () => {
              renderMathInElement(document.body,
                {
                  delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                    {left: "\\begin{align}", right: "\\end{align}", display: true},
                    {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                    {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                    {left: "\\begin{CD}", right: "\\end{CD}", display: true},
                  ]
                });
            };
            renderLatex();
            window.renderLatex = renderLatex;`}} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;