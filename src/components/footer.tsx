import styles from '../styles/components.module.scss';
import * as lib from '../lib';
import Config from '../../_data/config.json';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span>Powered by
          <a href="https://nextjs.org/">Next.js</a>
          &amp;
          <a href="https://reactjs.org/">React</a>
        </span>
        <span>Copyright&copy;<a href={Config.authorLink}>{Config.author}</a></span>
      </p>
      <p>Design by
        <a href="https://dribbble.com/ArleneXu" target="_blank" rel="noreferrer" >Arlene Xu</a>
        <a target="blank" href="/feed.xml">@RSS</a>
      </p>
      <p>
        <abbr title="unique visitor count and does not record user privacy information" id="uv_count" />
        <abbr title="page view count and does not record user privacy information" id="pv_count" />
      </p>
    </footer>
  );
}