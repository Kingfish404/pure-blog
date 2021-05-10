---
layout: post
title: 搭建一个自己的博客-pure-blog文档
author: jinyu
tags: [Document]
desc: 自建博客框架，与pure-blog的文档
comments: true
---

写给小白的博客搭建教程，也是我基于`jekyll`的博客模板[pure-blog](https://github.com/Kingfish404/pure-blog)文档。

<!-- more -->

## 自建博客的种类

就我目前了解过的，主要搭建博客的方式有以下几种（并且我自己尝试过）。

* wordpress - Php - 动态构建的成熟的博客服务平台，开源，但是需要拥有/购买服务器/服务，迁移也比较麻烦
* jekyll - Ruby - 支持gitpage等，简单轻量，迁移简单，模版很多，开发简单，似乎对win支持不好
* hexo - Javascript - 支持gitpage，切换主题非常简单，默认发布和仓库分离，个人感觉比较重型
* vue-press - Javascript - 支持gitpage，基本样式很固定
* etc

## jekyll

我最喜欢的博客框架就是`jekyll`，本博客也是基于此搭建的。

![](https://i.loli.net/2021/05/10/B5Sks9WeO3o8Cda.png)

### 安装与使用

如果希望在本地跑起自己的博客，就需要在本地搭建起jekyll开发环境。

最简单快速的本地安装并启动`jekyll`，创建新博客，可以去官网查阅[https://jekyllrb.com](https://jekyllrb.com)，安装指引页面[https://jekyllrb.com/docs/installation](https://jekyllrb.com/docs/installation/)

![](https://i.loli.net/2021/05/10/wk9vVSzG8Bf7jqE.png)

对于windows用户，我个人的建议还是使用`wsl`，然后按照ubuntu/(Other Linux)方案来安装配置。

下面是官网首页推荐的自己搭建方式

```shell
gem install bundler jekyll

jekyll new my-awesome-site

cd my-awesome-site

bundle exec jekyll serve
# => Now browse to http://localhost:4000
bundle exec jekyll build
# => Build site to _site folder (default)
```

jekyll的常见用命令
```shell
bundle exec jekyll s -l     # 动态监听启动服务，默认端口4000
bundle exec jekyll b        # 构建发布到_site文件夹
```

### 基本原理

`jekyll`官方的定义就是:Jekyll 是一个静态站点生成器。将用`markdown`编写的文本，使用`Liquid`模版语言创建静态网站。可以简单的调整站点的外观、网址、页面上显示的数据等等。

`jekyll`其实很像一个编译器，或者说小型虚拟机

在启动时，它首先会去读取项目下的`_config.yml`配置文件，初始化全局变量、插件等

然后开始从根目录开始扫描，读取`md`、`html`、`yml`文件

读取完毕后，就开始对`html`进行解析，使用`md`和`yml`的数据，构造出真正的静态网页，根据参数，会将静态页面用内置的http server运转或者生成到`_site`文件夹。

## pure-blog文档

下面开始简单方便的构建自己的博客，我的模板是[https://github.com/Kingfish404/pure-blog](https://github.com/Kingfish404/pure-blog)，其他模板也差不多。

### 第一步 使用博客模板

首先需要将模板从`Template`仓库拉取到自己的仓库。

这里可以简单的`fork`或者`clone`到自己的本地。如果是后者，那么需要自己创建`gitee`或者`github`账号，创建仓库来进行托管，并且需要开启gitpage服务。

目前`github`的gitpage服务已经成为Setting里面的独立栏目了。

![](https://i.loli.net/2021/05/10/wZqD4nWKmUAjx37.png)

### 第二步 设置站点信息

在你的博客的GitHub代码库页面或者本地的代码仓库里，选择文件列表里选择`_config.yml`，打开并进行修改，如果要修改页面导航路由，那么就修改`_data/nav.yml`文件。

![](https://i.loli.net/2021/05/10/Ns91xCWyVf4HSDb.png)

`_config.yml`中的相关配置
```yaml
lang: zh-CN         # 站点语言
title: Site Title   # 站点标题
author: Author      # 站点作者，这些信息会在meta里，有助于seo
email: your-email@example.com   # 站长邮箱
description: >- # 站点描述，this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml.
baseurl: "/pure-blog" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com   站点的自定义域名，如果默认github，那么就是"https://<username>.github.io"
twitter_username: jekyllrb      # 可以留空
github_username:  jekyll        # github用户名

descs:  # 网站首页的随机标语
  - Write an awesome description for your new site here. 
  - You can edit this in _config.yml.
  - hello world!

# 首页显示的最大文章数
max_posts: 10   # the max posts num display in Home page

# gitalk setting,enter clientID to enable
# doc: https://github.com/gitalk/gitalk
gitalk:
  clientID:
  clientSecret:
  repo:
  owner: 

excerpt_separator: <!-- more -->  # set excerpt separator here

# Build settings
permalink: /posts/:year/:month/:day/:title.html
```

### 第三步 撰写并发布自己的文章

在博客的代码库页面里，点开`_posts`文件夹，这里面就是你的博客文章。

这些文章使用的格式是`Markdown`，文件后缀名是md，这是一种非常简单易用的有格式文本标记语言，在`pure-blog`自带的示例性博文中有一篇Markdown语法介绍,[Markdown cheatseet](https://blog.achacker.com/pure-blog/posts/2021/01/01/chinese-markdown-cheatsheet.html)。

在发布博文前，你需要在文章的头部添加这样的内容，包括文章标题，作者名，和tag等。

```yaml
---
layout: post  
title: 我的文章标题  
author: 作者  
tags: [sample, document]   
desc: 文章简介  
comments: true  # 是否可以评论，如果配置了gitalk  
--- 
```

完成后，保存为`.md`文件，文件名是date-标题，例如 2021-05-01-document.md (注意这里的标题会成为这篇博文的链接，所以请使用字母而非中文，它不影响页面上显示的标题)，然后上传到`_posts`文件夹，提交修改，很快就可以在博客上看到新文章了。

![](https://i.loli.net/2021/05/10/6ix7vsuJmtFe4ZX.png)

### 可选：图片怎么办？
少量图片可以上传到images文件夹，然后在博文中添加。

但是GitHub用来当做图床有滥用之嫌，如果你的博客以图片为主，建议选择外链图床，例如sm.ms就是和很好的选择。

要寻找更适合自己的图床，敬请搜索一下。

在博文中添加图片的Markdown语法是：`![图片名](URL)`

### 可选: gitalk评论区

Gitalk 是一个基于 GitHub Issue 和 Preact 开发的评论插件。

中文配置使用说明见[gitalk-readme-cn](https://github.com/gitalk/gitalk/blob/master/readme-cn.md)

安装说明走完后就会看到你所需要的两个值，clientID和clientSecret，把它们复制到你的_config.yml文件中相应的字段：

```yaml
gitalk:
  clientID: <你的clientID>
  clientSecret: <你的clientSecret>
  repo: <你的repository名称>
  owner: <你的GitHub用户名>
```

### 可选：高级配置

其实还有挺多的配置说明，大家可以去阅读源代码去理解和尝试，需要一定的前端基础。

* `_includes`里存放的是页面组件
* `_layouts`里存放的是页面种类及布局
* `_sass`里面存放的是`css`样式
* `pages`里面是导航栏对应的单页面

## REF

* [LOFFER使用基础教程](https://fromendworld.github.io/LOFFER/document/)