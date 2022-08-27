# Pure-blog

## Feature

- `_posts` stores all public posts, which can be stored in folders.
- `_darft` stores all darfts，only one level directory.
- open `/api/preview?mode=on` to enable preview mode, which will load posts in `_darft`，`mode=off` to disable.

## Define

For blog system, should only based on two point, `posts` and `meta-post`  
`posts` is author's product, it should only just be with the content. `meta-post` about the posts that may change over time should be kept away.

So the posts template md file should be with like this, publiced post file should be store in `_posts`.

```yaml
---
title: Title for the post
desc: Description about the post
tags: [meta]
---

Content of the post.
```

Anthor info `meta-data` about the post and blog store in `_data/meta-post`.

I made this definition to make this blog clear and easy to use.

## Dev

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  

```bash
# run the development server:
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

GPL