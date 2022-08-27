import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import * as layout from '../../layouts';
import * as components from '../../components';
import * as lib from '../../lib';
import Config from '../../../_data/config.json';
import styles from '../../styles/index.module.scss';

const Page: NextPageWithLayout = (props: linkProps) => {
  const config = props.config;

  return (
    <>
      <Head>
        <title>{`Link - ${Config.title}`}</title>
      </Head>
      <components.HeadContent
        {...config}
      />
      <div className={styles.links}>
        <components.Links links={config.links} />
      </div>
      <components.TabsNav styles={styles} tab={'link'} />
      <div className={styles.tab}>
        <section>
          {(() => {
            const friendLinks: Array<any> = props.friendLinks;
            return (
              <>
                {friendLinks && <h2 className={styles.tags}>友链</h2>}
                <ul className={styles.friendLinks} >
                  {friendLinks && friendLinks.map((value, index) => (
                    <li key={index}>
                      <a href={value.link} target='_blank' rel="noreferrer">{value.name}</a>
                    </li>))}
                </ul>
              </>
            );
          })()}
          <div className={styles.linkContent}
            dangerouslySetInnerHTML={{ __html: props.link }} />
        </section>
        <components.Footer />
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <layout.LayoutDefault showFooter={false}>
      {page}
    </layout.LayoutDefault>
  );
};


interface linkProps { config: any, friendLinks: any, link: any }

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: linkProps }> => {
  return {
    props: {
      config: await lib.getConfig(),
      friendLinks: await lib.getFriendLinks(),
      link: await lib.getLinkHTMLStr(),
    }
  };
};
