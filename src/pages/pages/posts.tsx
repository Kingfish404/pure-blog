import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ReactElement, useEffect, useRef } from "react";
import { NextPageWithLayout } from "../_app";
import * as components from "../../components";
import * as lib from '../../lib';
import * as tocbot from 'tocbot';
import styles from '../../styles/pages/posts.module.scss';

const Posts: NextPageWithLayout = (props: any) => {
  const posts: Array<lib.PostMeta> = props.posts;
  let year: string = '';

  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.toc-content',
      headingSelector: 'h2',
      hasInnerContainers: true,
      positionFixedSelector: '.toc',
      activeLinkClass: 'active-item',
      positionFixedClass: 'toc-position-fix',
      scrollSmooth: true,
      scrollSmoothDuration: 500,
    });
    return () => {
      tocbot.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Posts - Kingfish404</title>
      </Head>
      <div className={'toc ' + styles.toc} />
      <div className={'toc-content ' + styles.posts}>
        {posts && posts.map((post, index) => {
          const tags = post.tags as Array<string>;
          return (
            <div key={index}>
              {(() => {
                if (year !== post.year) {
                  year = post.year;
                  return (<h2 id={year} style={{ fontSize: 0 }}>{year}</h2>);
                }
              })()}
              <components.PostCard
                {...post}
                tags={tags}
              />
            </div>);
        })}
      </div>
    </>
  );
};

export default Posts;

Posts.getLayout = function getLayout(page: ReactElement) {
  return (
    <components.LayoutDefault>
      {page}
    </components.LayoutDefault>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await lib.getAllPostsMeta(context.preview);
  return {
    props: {
      posts
    }
  };
};