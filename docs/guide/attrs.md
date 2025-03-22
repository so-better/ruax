---
title: Ruax实例配置
---

# Ruax 实例配置

通过 `Ruax` 实例的相关属性来更改请求的默认配置

## baseUrl <Badge type="danger" text="string" />

请求的基本地址，如果不设置则默认为空

```ts
const ruax = new Ruax()
//配置全局的默认基础路径
ruax.baseUrl = 'https://www.xxx.com/api'
```

## method <Badge type="danger" text="string" />

请求的类型，如 `GET` `POST`，同原生 `fetch` 请求的 `method` 属性配置，默认为 `GET`

```ts
const ruax = new Ruax()
//配置全局的默认请求类型为POST请求
ruax.method = 'POST'
```

## headers <Badge type="danger" text="HeadersInit" />

请求头配置

```ts
const ruax = new Ruax()
//配置全局默认的请求头
ruax.headers = {
  'Content-Type': 'application/json'
}
```

## responseType <Badge type="danger" text="RuaxResponseType" />

期待的请求返回类型，请求响应后会根据该值对返回结果进行处理，最终将转换后的结果返回

可取值是 `json` `text` `blob` `arrayBuffer` `formData`

```ts
const ruax = new Ruax()
//配置全局默认的请求返回类型
ruax.responseType = 'json'
```

## timeout <Badge type="danger" text="number" />

请求超时时间，单位是 `ms`，默认为 `3000`

超过此时间后，请求会被取消，同时抛出异常

```ts
const ruax = new Ruax()
//配置全局默认的请求超时时间
ruax.timeout = 5000
```

## mode <Badge type="danger" text="RequestMode" />

指定请求的跨域行为，默认值为 `cors`

它决定了浏览器在发送请求时如何处理跨域请求，同原生 `fetch` 请求的 `mode` 属性配置，支持如下值：

- `no-cors`：允许请求跨域，但不会暴露响应的内容给 `JavaScript`，它通常用于向第三方服务发送请求时，只有发送请求本身，而不会尝试获取响应的内容
- `cors`：允许跨源请求，并且如果服务器支持 CORS（跨源资源共享），则允许 `JavaScript` 访问响应内容
- `same-origin`：请求必须与当前源相同。如果请求的 `URL` 与当前页面的源不同，浏览器将会阻止请求

```ts
const ruax = new Ruax()
//配置全局默认的跨域行为
ruax.mode = 'no-cors'
```

## cache <Badge type="danger" text="RequestCache" />

指定请求的缓存行为，默认值为 `default`

它指定了浏览器如何处理请求和响应缓存，同原生 `fetch` 请求的 `cache` 属性配置，支持如下值：

- `default`：默认行为，浏览器根据缓存的规则决定是否使用缓存，如果请求的资源在缓存中并且符合缓存策略，浏览器会使用缓存；否则，它会向服务器发送请求

- `no-store`：禁止浏览器从缓存中读取响应，并且不将响应缓存到浏览器中，每次请求都会向服务器发送请求，不使用缓存

- `reload`：强制浏览器绕过缓存并重新从服务器获取资源，会请求新的资源，但不使用缓存

- `no-cache`：请求资源时，浏览器会检查缓存中的资源是否有效，如果缓存中的资源是过期的，浏览器会重新向服务器请求资源，并更新缓存，如果缓存是有效的，浏览器会直接使用缓存

- `force-cache`：强制浏览器使用缓存，如果缓存中没有，则向服务器请求，即使缓存是过期的，也会使用缓存中的内容，除非没有缓存可用

- `only-if-cached`：只会从缓存中读取资源，如果没有缓存则不会发起请求，这个选项常用于离线工作模式或强制使用缓存的场景

```ts
const ruax = new Ruax()
//配置全局默认的缓存行为
ruax.cache = 'reload'
```

## beforeRequest <Badge type="danger" text="(options: RuaxCreateOptions) => RuaxCreateOptions" />

请求拦截函数，该方法会在请求发送之前触发，回调参数为 `create` 发送请求方法的部分入参配置，你可以在这个函数里修改入参，但同时你需要返回一个新的入参配置

```ts
const ruax = new Ruax()
//配置全局的请求拦截
ruax.beforeRequest = options => {
  options.headers['token'] = 'xxxx'
  return options
}
```

## beforeResponse <Badge type="danger" text="(response: Response, data?: any, options?: RuaxCreateOptions) => Promise<any> | any" />

响应拦截函数，该方法会在请求后触发，回调参数为请求对象、请求返回的数据（请求成功的情况下）和请求参数配置，该函数的结果会作为 `create` 方法的返回结果

```ts
const ruax = new Ruax()
//配置全局的响应拦截
ruax.beforeResponse = data => {
  return data.data || []
}
```

## cancelRequest <Badge type="danger" text="(abortFun: typeof AbortController.prototype.abort) => void" />

取消函数，该函数返回一个方法，执行该方法后会取消当前请求的执行

```ts
const ruax = new Ruax()
//配置全局的取消函数
ruax.cancelRequest = abort => {
  //这里执行abort可以取消请求，我们也可以将其保存，在需要取消的时候调用此函数
}
```

## onProgress <Badge type="danger" text="(value: number) => void" />

进度监听函数，该函数用于监听请求进度，返回一个数值，表示当前进度，取值为 0-100

```ts
const ruax = new Ruax()
//配置全局的进度监听
ruax.onProgress = value => {
  console.log(value) //输出当前进度
}
```
