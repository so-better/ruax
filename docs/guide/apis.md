---
title: 请求方法
---

# 请求方法

## FetchTimeoutError

请求超时时抛出的错误类，继承自 `Error`，`name` 属性为 `'FetchTimeoutError'`

```ts
class FetchTimeoutError extends Error {
  constructor(timeout: number)
}
```

可通过 `instanceof` 判断是否为超时错误：

```ts
try {
  await ruax.get('/api/data')
} catch (err) {
  if (err instanceof FetchTimeoutError) {
    console.log('请求超时')
  }
}
```

## FetchCancelError

请求被主动取消时抛出的错误类，继承自 `Error`，`name` 属性为 `'FetchCancelError'`

```ts
class FetchCancelError extends Error {
  constructor()
}
```

可通过 `instanceof` 判断是否为取消错误：

```ts
try {
  await ruax.get('/api/data')
} catch (err) {
  if (err instanceof FetchCancelError) {
    console.log('请求已取消')
  }
}
```

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

  - `credentials`：凭证策略，如果此属性不配置则默认使用 `ruax.credentials`

  - `cancelRequest`：取消函数，如果此属性不配置则默认使用 `ruax.cancelRequest`

  - `onProgress`：请求进度监听函数，如果此属性不配置则默认使用 `ruax.onProgress`

  - `beforeRequest`：请求拦截函数，如果此属性不配置，则默认使用 `ruax.beforeRequest`

  - `beforeResponse`：响应拦截函数，如果此属性不配置，则默认使用 `ruax.beforeResponse`

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
  post(url: string, body?: BodyInit): Promise<any>
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

## put()

快速发起一个 `PUT` 请求

- 类型

  ```ts
  put(url: string, body?: BodyInit): Promise<any>
  ```

- 详细信息

  第一个入参表示请求的地址，同 `create` 方法的 `url` 参数；第二个参数表示请求入参数据，同 `create` 的 `body` 参数

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.put(
    '/api/put',
    JSON.stringify({ id: '1' })
  )
  ```

## patch()

快速发起一个 `PATCH` 请求

- 类型

  ```ts
  patch(url: string, body?: BodyInit): Promise<any>
  ```

- 详细信息

  第一个入参表示请求的地址，同 `create` 方法的 `url` 参数；第二个参数表示请求入参数据，同 `create` 的 `body` 参数

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.patch(
    '/api/patch',
    JSON.stringify({ id: '1', name: '张三' })
  )
  ```

## delete()

快速发起一个 `DELETE` 请求

- 类型

  ```ts
  delete(url: string): Promise<any>
  ```

- 详细信息

  提供一个入参，表示请求的地址，同 `create` 方法的 `url` 参数

- 示例

  ```ts
  const ruax = new Ruax()
  const data = await ruax.delete('/api/delete')
  ```
