import Link from 'next/link';
import type { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as components from '../components';
import * as lib from '../lib';
import styles from '../styles/layouts/default.module.scss';

export function LayoutDefault({ children, showFooter = true }: { children: ReactElement, showFooter?: boolean }) {

  const navs: Array<{ href: string, text: string }> = [{
    href: '/',
    text: '首页'
  }, {
    href: '/pages/posts',
    text: '文章'
  }, {
    href: '/pages/about',
    text: '关于'
  }];

  return (
    <>
      <nav className={styles.nav}>
        {navs.map((value, index) => {
          return (<Link href={value.href} key={index}>{value.text}</Link>);
        })}
      </nav>
      <main className={styles.main}>
        {children}
        {/* Fix the tocbot.js positionFixedSelector className error */}
        <div className={'toc'} />
      </main>
      {showFooter && <components.Footer />}
    </>
  );
}
