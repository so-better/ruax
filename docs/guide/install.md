---
title: 安装
---

# 安装

## 下载 ruax 到本地使用

- 下载地址：[ruax](https://registry.npmmirror.com/ruax/download/ruax-1.8.13.tgz)
- 下载完成后最终解压得到一个 package 文件夹，进入 package 文件夹后，将 package 目录下的整个 lib 目录拷贝到你的项目下
- 在 html 页面中引入 js

```html
<!-- 使用全局构建版本 -->
<script src="lib/ruax.umd.js" type="text/javascript"></script>
```

```html
<!-- 使用es模块构建版本 -->
<script type="module">
  import { Ruax } from 'lib/ruax.es.js'
</script>
```

## 通过 CDN 使用 ruax

你可以借助 `script` 标签直接通过 CDN 来使用 `ruax`

```html
<!-- 引入固定版本的ruax -->
<script src="https://unpkg.com/ruax@1.8.13/lib/ruax.umd.js"></script>
<!-- 始终引入最新的ruax -->
<script src="https://unpkg.com/ruax/lib/ruax.umd.js"></script>
```

```html
<!-- 使用CDN上的es模块构建版本 -->
<script type="module">
  import { Ruax } from 'https://unpkg.com/ruax/lib/ruax.es.js'
</script>
```

## 通过 npm/yarn/pnpm 安装 ruax

> 假设你已了解关于  html、css  和  javascript  的中级知识，并且对于 npm，es6，webpack 已经有了足够的了解，我们更推荐这类安装方式

::: code-group

```bash [npm]
npm install ruax

# 安装指定版本
npm install ruax@1.8.13
```

```bash [yarn]
yarn add ruax

# 安装指定版本
yarn add ruax@1.8.13
```

```bash [pnpm]
pnpm add ruax

# 安装指定版本
pnpm add ruax@1.8.13
```

:::
