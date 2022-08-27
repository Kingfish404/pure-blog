declare global {
  interface Window {
    gtag: Function;
    getPV?: Function;
    initPV?: Function;
    renderLatex?: Function;
  }
}

export type {
  Config
} from './config';

export {
  getConfig,
  getFriendLinks,
  getAboutHTMLStr,
  getLinkHTMLStr,
} from './config';

export {
  getAllPostsMeta,
  getPostData,
} from './posts';

export type {
  PostMeta
} from './posts';

export {
  generateRSSFeed
} from './plugin/rss';

export {
  GA_TRACKING_ID,
  pageview,
  event,
} from './plugin/gtag';

export { LC_APPID, LC_KEY }
  from './plugin/leadcloud';

export { DISQUS_ID }
  from './plugin/comment';
