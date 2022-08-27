import fs, { Dirent } from 'fs';
import path from 'path';
import YAMl from 'yaml';
import { marked } from 'marked';
import highlight from 'highlight.js';
import katex from 'katex';

const dataDirectory = path.join(process.cwd(), '');

function getFileHead(fileData: string): string {
  return fileData
    .slice(
      fileData.indexOf('---'),
      fileData.indexOf('---', fileData.indexOf('---') + 3));
}

function getFileBody(fileData: string): string {
  return fileData.slice(fileData.indexOf('---', fileData.indexOf('---') + 3) + 3);
}

export interface PostMeta {
  // meta data
  title: string,
  desc?: string,
  tags?: Array<string>
  id: string,
  year: string,
  month: string,
  day: string,
  date: string,

  // file data
  name: string,
  path: string,
}

const posts: Array<PostMeta> = [];

export async function getAllPostsMeta(preview: boolean = false): Promise<Array<PostMeta>> {
  if (posts.length != 0 && !preview) {
    return posts;
  } else {
    posts.length = 0;
  }

  const postsFilePath = path.join(dataDirectory, '_posts');
  const postsFileNames = fs.readdirSync(postsFilePath, { encoding: 'utf8', withFileTypes: true });

  function readPosts(props: { curFileDirent: Dirent, curFilePath: string }) {
    const { curFileDirent, curFilePath } = props;
    if (props.curFileDirent.isDirectory()) {
      // handle directory
      const dirFileNames = fs.readdirSync(path.join(curFilePath, props.curFileDirent.name), {
        encoding: 'utf8', withFileTypes: true
      });
      const filePath = path.join(curFilePath, props.curFileDirent.name);
      dirFileNames.forEach((value) => {
        readPosts({ curFileDirent: value, curFilePath: filePath });
      });
    } else if (props.curFileDirent.isFile() && props.curFileDirent.name.match(/.*\.md/)) {
      // handle file
      const fileContent = fs.readFileSync(
        path.join(curFilePath, props.curFileDirent.name), { encoding: 'utf8' });
      const yamlData = getFileHead(fileContent);
      const metaData = YAMl.parse(yamlData);

      const [year, month, day, ...id] = curFileDirent.name.replace(/\.md$/, '').split('-');
      posts.push({
        ...metaData,
        date: `${year}-${month}-${day}`, year, month, day,
        id: id.join('-'), name: curFileDirent.name, path: curFilePath
      });
    }
  }

  postsFileNames.forEach((value) => {
    readPosts({ curFileDirent: value, curFilePath: postsFilePath });
  });

  if (preview) {
    // load file in `_drafts`
    const previewFilePath = path.join(dataDirectory, '_drafts');
    fs.readdirSync(previewFilePath,
      { encoding: 'utf8', withFileTypes: true })
      .forEach((dirent) => {
        if (dirent.isFile() && dirent.name.match(/.*\.md/)) {
          const fileContent = fs.readFileSync(
            path.join(previewFilePath, dirent.name), { encoding: 'utf8' });
          const yamlData = getFileHead(fileContent);
          const metaData = YAMl.parse(yamlData);
          metaData.title = `${metaData.title} [Pre]`;

          const [year, month, day, ...id] = dirent.name.replace(/\.md$/, '').split('-');
          posts.push({
            ...metaData,
            date: `${year}-${month}-${day}`, year, month, day,
            id: id.join('-'), name: dirent.name, path: previewFilePath,
          });
        }
      });
  }

  return posts.sort((a, b) => {
    return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
  });
}

const tokenizer: any = {
  codespan(src: string) {
    const match = src.match(/(\$+)\n*([^\$]+?)\n*\$+/y);
    if (match != null) {
      const text = katex.renderToString(match[2].trim(), {
        throwOnError: false,
        displayMode: match[1].match(/\${2}/) ? true : false,
      });
      return {
        type: 'codespan',
        raw: match[0],
        text: text
      };
    }
    return false;
  }
};

marked.use({ tokenizer });

export async function getPostData(params: { year: string, month: string, id: string, preview?: boolean }):
  Promise<{ head: PostMeta, body: string }> {
  const { year, month, id, preview } = params;
  const posts = await getAllPostsMeta(preview);

  let index = posts.findIndex(post =>
    post.year === year && post.month == month && post.id == id);

  const postData = fs.readFileSync(path.join(posts[index].path, posts[index].name),
    { encoding: 'utf8' });

  return {
    head: posts[index],
    body: marked.parse(getFileBody(postData), {
      highlight: function (code, lang) {
        const language = highlight.getLanguage(lang) ? lang : 'plaintext';
        return highlight.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-',
      gfm: true,
    })
  };
}