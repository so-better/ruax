---
title: 快速上手
---

# 快速上手

## 获取 Ruax 对象

- 如果你是通过 `cdn` 在线引入或者下载文件到本地使用，需要先按照如下方法获取 `Ruax` 对象

```ts
const { Ruax } = window.Ruax
```

或者

```ts
const Ruax = window.Ruax.default
```

- 如果你是通过 `npm/yarn/pnpm` 引入

```ts
import { Ruax } from 'ruax'
```

或者

```ts
import Ruax from 'ruax'
```

## 创建实例

创建 `Ruax` 实例是使用 `Ruax` 的第一步

```ts
const ruax = new Ruax()
```

## 发送请求

通过 `create` 方法发送一个请求

```ts
const ruax = new Ruax()
const result = await ruax.create({
  url: '/xxx/xxx',
  method: 'post',
  body: JSON.stringify({
    name: '张三'
  })
})
```

> 具体的使用还需查看后续文档
