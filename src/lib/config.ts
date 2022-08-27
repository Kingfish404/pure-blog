import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const dataDirectory = path.join(process.cwd(), '_data');

export async function getConfig(): Promise<{
  title: string,
  motto?: string,
  desc?: string,
  links?: Array<{ name: string, link: string }>,
  recentNum?: number,
  author: string,
}> {
  const fileName = 'config.json';
  const filePath = path.join(dataDirectory, fileName);
  const str = fs.readFileSync(filePath, { encoding: 'utf8' });
  const config = JSON.parse(str);

  return config;
}

export async function getFriendLinks():
  Promise<Array<{ name: string, link: string }>> {
  const fileName = 'friend-links.json';
  const filePath = path.join(dataDirectory, fileName);
  const str = fs.readFileSync(filePath, { encoding: 'utf8' });
  const { friendLinks } = JSON.parse(str);

  return friendLinks;
}

export async function getAboutHTMLStr(): Promise<string> {
  const fileName = 'about.md';
  const filePath = path.join(dataDirectory, fileName);
  const str = fs.readFileSync(filePath, { encoding: 'utf8' });

  return marked.parse(str);
}

export async function getLinkHTMLStr(): Promise<string> {
  const fileName = 'link.md';
  const filePath = path.join(dataDirectory, fileName);
  const str = fs.readFileSync(filePath, { encoding: 'utf8' });

  return marked.parse(str);
}