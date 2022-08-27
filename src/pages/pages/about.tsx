import Head from "next/head";
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import * as lib from '../../lib';
import * as layout from '../../layouts';
import * as components from '../../components';
import Config from '../../../_data/config.json';
import styles from '../../styles/pages/about.module.scss';

const About: NextPageWithLayout = (props: AboutProps) => {
  const config = props.config;

  return (
    <>
      <Head>
        <title>{`About - ${Config.title}`}</title>
      </Head>
      <components.HeadContent
        desc={config.desc}
      />
      <div className={styles.links}>
        <components.Links links={config.links} />
      </div>
      <div className={styles.about}
        dangerouslySetInnerHTML={{ __html: props.about }}
      />
    </>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <layout.LayoutDefault>
      {page}
    </layout.LayoutDefault>
  );
};

interface AboutProps { config: any, about: any }

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: AboutProps }> => {
  return {
    props: {
      config: await lib.getConfig(),
      about: await lib.getAboutHTMLStr()
    }
  };
};