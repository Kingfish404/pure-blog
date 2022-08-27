import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import * as components from '../../components';
import * as lib from '../../lib';
import styles from '../../styles/index.module.scss';

const Page: NextPageWithLayout = (props: any) => {
  const config = props.config;
  const posts: lib.PostMeta[] = props.posts;
  const tags: Array<string> = props.tags;

  return (
    <>
      <Head>
        <title>Tags - Kingfish404</title>
      </Head>
      <components.HeadContent
        {...config}
      />
      <div className={styles.links}>
        <components.Links links={config.links} />
      </div>
      <components.TabsNav styles={styles} tab={'tags'} />
      <div className={styles.tab}>
        <section>
          {/* tab list */}
          <ul className={styles.tags}>
            {tags && tags.map((tag, index) => (
              <li key={index}>
                <a href={`#${tag[0]}`} onClick={_ => {
                  let { x, y } = { x: window.scrollX, y: window.scrollY };
                  setTimeout(() => {
                    window.scrollTo(x, y);
                  }, 0);
                }}>
                  <span>{tag[0]}</span>
                  <span>{tag[1]}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* posts of tab list */}
          <ul className={styles.tagPosts}>
            {tags && tags.map((tag, index) => {
              return (
                <li id={tag[0]} key={index} className={'tag-item'}>
                  <h3>{tag[0]}</h3>
                  <ul>
                    {posts.filter((value) => {
                      return value.tags && value.tags.includes(tag[0]);
                    }).map((post, index) => (
                      <li key={index} >
                        <Link href={`/posts/${post.year}/${post.month}/${post.id}`}>
                          <a>
                            {post.title}
                            <time>{post.date}</time>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>

        <components.Footer />
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <components.LayoutDefault showFooter={false}>
      {page}
    </components.LayoutDefault>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const config = await lib.getConfig();
  const posts = await lib.getAllPostsMeta(context.preview);
  const tagsMap = new Map();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        if (tagsMap.has(tag)) {
          tagsMap.set(tag, tagsMap.get(tag) + 1);
        } else {
          tagsMap.set(tag, 1);
        }
      });
    }
  });

  return {
    props: {
      config,
      posts,
      tags: Array.from(tagsMap),
    }
  };
};