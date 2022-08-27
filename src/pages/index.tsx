import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useState, ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Config from '../../_data/config.json';
import * as layout from '../layouts';
import * as components from '../components';
import * as lib from '../lib';
import styles from '../styles/index.module.scss';

const Page: NextPageWithLayout = (props: any) => {
  const config = props.config;
  const [tab, setTab] = useState<components.Tabs>(components.Tabs.recent);

  function getTabConetnt(tab: components.Tabs) {
    switch (tab) {
      case components.Tabs.recent:
        const recent: lib.PostMeta[] = props.recent;
        return (<>
          {recent.map((post, index) => {
            const tags = post.tags as Array<string>;
            return (
              <components.PostCard
                key={index}
                {...post}
                tags={tags}
              />);
          })}
          <div className={styles.more}>
            <Link href={'/pages/posts'}>All Posts</Link>
          </div>
        </>);
      default:
        return (<div className={styles.temp}>{"Building"}</div>);
    }
  }

  return (
    <>
      <Head>
        <title>{`Blog - ${Config.title}`}</title>
      </Head>
      <components.HeadContent
        {...config}
      />
      <div className={styles.links}>
        <components.Links links={config.links} />
      </div>
      <components.TabsNav styles={styles} setTab={setTab} tab={tab} />
      <div className={styles.tab}>
        {getTabConetnt(tab)}
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <layout.LayoutDefault >
      {page}
    </layout.LayoutDefault>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const config = await lib.getConfig();
  const posts = await lib.getAllPostsMeta(context.preview);

  await lib.generateRSSFeed();

  return {
    props: {
      config,
      recent: posts.slice(0, config.recentNum)
    }
  };
};