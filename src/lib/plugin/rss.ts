import fs from 'fs';
import { Feed } from 'feed';
import { getConfig } from '../config';
import { getAllPostsMeta, getPostData } from '..';

const baseUrl = process.env.BASE_URL || "";

export async function generateRSSFeed() {
  try {
    const config = await getConfig();
    const postsMeta = await getAllPostsMeta();
    const feed = new Feed({
      title: config.title,
      description: config.desc,
      id: `${baseUrl}`,
      copyright: `&amp;copy; ${config.author || ""}`
    });

    let i = 0;

    for (const postMeta of postsMeta) {
      const index = postsMeta.indexOf(postMeta);
      const postData = await getPostData({ year: postMeta.year, month: postMeta.month, id: postMeta.id });
      feed.addItem({
        title: postMeta.title,
        date: new Date(postMeta.date),
        link: `${baseUrl}/posts/${postMeta.year}/${postMeta.month}/${postMeta.id}`,
        description: postMeta.desc,
        content: postData.body
      });
      i += 1;
      if (i == postsMeta.length) {
        fs.writeFileSync('public/feed.xml', feed.atom1());
      }
    }
  } catch (error) {
    console.log("RSS Feed Generate error!");
  }
}
