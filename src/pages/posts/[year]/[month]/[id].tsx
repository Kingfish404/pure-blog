import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../../_app";
import * as layout from '../../../../layouts';
import * as components from "../../../../components";
import * as lib from "../../../../lib";
import styles from '../../../../styles/posts/post.module.scss';

const Post: NextPageWithLayout = (props: any) => {
  return (
    <>
      <Head>
        <title>{`${props.title} - ${props.config.title}`}</title>
      </Head>
      <div className={styles.post}>
        <h1>{props.title}</h1>
        <time>{new Date(props.date).toDateString().split(' ').slice(1).join(' ')}</time>
        {props.tags && props.tags.map((value: any, index: number) => {
          return (
            <Link key={index} href={`/pages/tags#${value}`} passHref>
              <span className={'posts-type'} >{value}</span>
            </Link>
          );
        })}
        <blockquote>{props.desc}</blockquote>
        <div dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.url && <components.Comment url={props.url} />}
      </div>
    </>
  );
};

export default Post;

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <layout.LayoutDefault>
      {page}
    </layout.LayoutDefault>
  );
};

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPropsContext) => {
  const posts = await lib.getAllPostsMeta(context.preview);

  const paths = posts.map((post) => ({
    params: {
      year: post.year,
      month: post.month,
      id: post.id,
    }
  }));

  return {
    paths, fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { year, month, id } = context.params! as { year: string, month: string, id: string };
  const postData = await lib.getPostData({ year, month, id, preview: context.preview });
  const config = await lib.getConfig();
  return {
    props: {
      ...postData.head,
      body: postData.body,
      config,
      url: lib.DISQUS_ID,
    }
  };
};