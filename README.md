# ruax

[![npm](https://img.shields.io/npm/v/ruax)](https://www.npmjs.com/package/ruax) [![license](https://img.shields.io/npm/l/ruax)](LICENSE)

一个基于 `fetch API` 二次封装的轻量级 `web` 端异步数据请求库，更适合现代浏览器。

## 特性

- 增加超时机制，在请求超过指定时间没有响应时抛出异常
- 增加可取消机制，请求过程中可以随时取消请求
- 增加进度监控，可以随时获取请求进度
- 增加请求拦截和响应拦截，方便全局处理
- 增加响应类型参数，针对不同响应类型对结果进行处理后传递
- 增加基础路径配置，可针对每次请求使用公共的基础路径

## 安装

```bash
# npm
npm install ruax
npm install ruax@1.8.17   # 安装指定版本

# yarn
yarn add ruax
yarn add ruax@1.8.17

# pnpm
pnpm add ruax
pnpm add ruax@1.8.17
```

**CDN 使用：**

```html
<!-- 引入固定版本 -->
<script src="https://unpkg.com/ruax@1.8.17/lib/ruax.umd.js"></script>
<!-- 始终引入最新版本 -->
<script src="https://unpkg.com/ruax/lib/ruax.umd.js"></script>
```

```html
<!-- ES 模块方式 -->
<script type="module">
  import { Ruax } from 'https://unpkg.com/ruax/lib/ruax.es.js'
</script>
```

## 快速上手

```ts
import { Ruax } from 'ruax'

const ruax = new Ruax()

// 发送请求
const result = await ruax.create({
  url: '/xxx/xxx',
  method: 'post',
  body: JSON.stringify({
    name: '张三'
  })
})
```

CDN 引入时获取 Ruax 对象：

```ts
const { Ruax } = window.Ruax
// 或
const Ruax = window.Ruax.default
```

## 实例配置

通过 Ruax 实例属性设置全局默认值：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `baseUrl` | `string` | `''` | 请求基础地址 |
| `method` | `string` | `'GET'` | 请求方法 |
| `headers` | `HeadersInit` | `{}` | 请求头 |
| `responseType` | `RuaxResponseType` | `'json'` | 响应类型，支持 `json` `text` `blob` `arrayBuffer` `formData` `stream` |
| `timeout` | `number` | `3000` | 超时时间（ms），设为 `0` 不启用超时 |
| `mode` | `RequestMode` | `'cors'` | 跨域行为 |
| `cache` | `RequestCache` | `'default'` | 缓存策略 |
| `credentials` | `RequestCredentials` | `'same-origin'` | 凭证策略，跨域携带 cookie 时设为 `include` |
| `beforeRequest` | `(options: RuaxCreateOptions) => RuaxCreateOptions` | - | 请求拦截函数 |
| `beforeResponse` | `(response: Response, options: RuaxCreateOptions, data?: any) => Promise<any> \| any` | - | 响应拦截函数 |
| `cancelRequest` | `(abortFun: typeof AbortController.prototype.abort) => void` | - | 取消请求函数 |
| `onProgress` | `(value: number) => void` | - | 进度监听函数（0-100） |

```ts
const ruax = new Ruax()
ruax.baseUrl = 'https://www.xxx.com/api'
ruax.timeout = 5000
ruax.beforeRequest = options => {
  options.headers['token'] = 'xxxx'
  return options
}
ruax.beforeResponse = (response, options, data) => {
  return data.data || []
}
```

## API 方法

### `create(options)`

发起一个请求，`options` 类型为 `RuaxCreateOptionsWithInterceptor`。

```ts
create(options: RuaxCreateOptionsWithInterceptor): Promise<any>
```

### `post(url, body?)`

快速发起一个 POST 请求。

```ts
post(url: string, body?: BodyInit): Promise<any>
```

### `get(url)`

快速发起一个 GET 请求。

```ts
get(url: string): Promise<any>
```

### `put(url, body?)`

快速发起一个 PUT 请求。

```ts
put(url: string, body?: BodyInit): Promise<any>
```

### `patch(url, body?)`

快速发起一个 PATCH 请求。

```ts
patch(url: string, body?: BodyInit): Promise<any>
```

### `delete(url)`

快速发起一个 DELETE 请求。

```ts
delete(url: string): Promise<any>
```

## 文档

完整文档请参阅：[https://www.so-better.cn/docs/ruax/](https://www.so-better.cn/docs/ruax/)

## License

[MIT](LICENSE)
