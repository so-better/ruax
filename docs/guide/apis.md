---
title: 请求方法
---

# 请求方法

## create()

该方法用于发起一个请求

- 类型

  ```ts
  create(options: RuaxCreateOptionsWithInterceptor): Promise<any>
  ```

- 详细信息

  提供一个入参，类型为 `RuaxCreateOptionsWithInterceptor`，包括以下属性：

  - `url`：请求的地址

  - `body`：请求的入参数据，同 `fetch` 原生的 `body` 参数，如果是 `json` 格式化的入参需要使用 `JSON.stringify` 转为字符串

  - `baseUrl`：请求的基本地址，如果此属性不配置则默认使用 `ruax.baseUrl`

  - `method`：请求的类型，如果此属性不配置则默认使用 `ruax.method`

  - `headers`：请求头配置，设置此属性后，会覆盖 `ruax.headers` 中的同名请求头

  - `responseType`：期待的请求返回类型，如果此属性不配置则默认使用 `ruax.responseType`

  - `timeout`：请求超时时间，如果此属性不配置则默认使用 `ruax.timeout`

  - `mode`：指定请求的跨域行为，如果此属性不配置则默认使用 `ruax.mode`

  - `cache`：指定请求的缓存行为，如果此属性不配置则默认使用 `ruax.cache`

  - `cancelRequest`：取消函数，如果此属性不配置则默认使用 `ruax.cancelRequest`

  - `onProgress`：请求进度监听函数，如果此属性不配置则默认使用 `ruax.onProgress`

  - `beforeRequest`：请求拦截函数，如果此属性不配置，则默认使用 `ruax.beforeRequest`

  - `beforeResponse`：请求响应函数，如果此属性不配置，则默认使用 `ruax.beforeResponse`

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.create({
    url: 'https://www.xxx.com/api/getInfo',
    body: JSON.stringify({
      id: 1
    })
  })
  ```

## post()

快速发起一个 `POST` 请求

- 类型

  ```ts
  post(url: string, body: BodyInit): Promise<any>
  ```

- 详细信息

  第一个入参表示请求的地址，同 `create` 方法的 `url` 参数；第二个参数表示请求入参数据，同 `create` 的 `body` 参数

  该方法不需要配置其他参数，但是会受到参数默认值的影响，比如设置 `ruax.headers` 也会影响该方法发送的请求

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.post(
    '/api/post',
    JSON.stringify({
      id: '1'
    })
  )
  ```

## get()

快速发起一个 `GET` 请求

- 类型

  ```ts
  get(url: string): Promise<any>
  ```

- 详细信息

  提供一个入参，表示请求的地址，同 `create` 方法的 `url` 参数

  该方法不需要配置其他参数，但是会受到参数默认值的影响，比如设置 `ruax.headers` 也会影响该方法发送的请求

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.get('/api/get')
  ```
