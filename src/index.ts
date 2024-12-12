import { common as DapCommon } from 'dap-util'
/**
 * 请求返回类型
 */
export type RuaxResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'

/**
 * fetch入参
 */
export type RuaxFetchWithTimeoutOptionsType = {
  timeout?: number
  cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void
  input: RequestInfo | URL
  init?: RequestInit
}

/**
 * 基本请求入参类型
 */
export interface RuaxCreateOptions {
  /**
   * 请求地址
   */
  url: string
  /**
   * 请求入参
   */
  body?: BodyInit
  /**
   * 基本地址
   */
  baseUrl?: string
  /**
   * 请求方法
   */
  method?: string
  /**
   * 请求头
   */
  headers?: HeadersInit
  /**
   * 请求返回类型
   */
  responseType?: RuaxResponseType
  /**
   * 超时时间，单位ms
   */
  timeout?: number
  /**
   * 跨域行为
   */
  mode?: RequestMode
  /**
   * 缓存策略
   */
  cache?: RequestCache
  /**
   * 取消请求
   */
  cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void
  /**
   * 请求进度
   */
  onProgress?: (value: number) => void
}

/**
 * 创建请求入参类型
 */
export interface RuaxCreateOptionsWithInterceptor extends RuaxCreateOptions {
  /**
   * 请求拦截
   */
  beforeRequest?: (options: RuaxCreateOptions) => RuaxCreateOptions
  /**
   * 响应拦截
   */
  beforeResponse?: (data: any) => Promise<any> | any
}

/**
 * 请求对象
 */
class Ruax {
  /**
   * 默认基本地址
   */
  baseUrl: string = ''
  /**
   * 默认请求方法
   */
  method: string = 'GET'
  /**
   * 默认请求头
   */
  headers: HeadersInit = {}
  /**
   * 默认返回类型
   */
  responseType: RuaxResponseType = 'json'
  /**
   * 默认超时时间
   */
  timeout: number = 3000
  /**
   * 默认的跨域行为
   */
  mode: RequestMode = 'cors'
  /**
   * 缓存策略
   */
  cache: RequestCache = 'default'
  /**
   * 请求拦截
   */
  beforeRequest?: (options: RuaxCreateOptions) => RuaxCreateOptions
  /**
   * 响应拦截
   */
  beforeResponse?: (data: any) => Promise<any> | any
  /**
   * 取消请求
   */
  cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void
  /**
   * 请求进度
   */
  onProgress?: (value: number) => void

  /**
   * 创建请求
   */
  async create(options: RuaxCreateOptionsWithInterceptor) {
    if (!window.fetch) {
      throw new Error('The current browser does not support the Fetch API.')
    }
    const { beforeRequest = this.beforeRequest, beforeResponse = this.beforeResponse } = options
    //请求拦截器设置
    let newOptions = this.deleteProperty<RuaxCreateOptions>(options, ['beforeRequest', 'beforeResponse'])
    if (beforeRequest) newOptions = beforeRequest.apply(this, [newOptions])
    //获取参数配置
    const { baseUrl = this.baseUrl, url, method = this.method, headers, responseType = this.responseType, body, timeout = this.timeout, mode = this.mode, cache = this.cache, cancelRequest = this.cancelRequest, onProgress = this.onProgress } = newOptions
    //发送请求
    let response = await this.fetchWrapper({
      timeout,
      cancelRequest,
      input: `${baseUrl}${url}`,
      init: {
        method: method.toLocaleUpperCase(),
        headers: { ...this.headers, ...headers },
        mode,
        cache,
        body
      }
    })
    //请求异常处理
    if (!response.ok) {
      throw new Error(`The fetch request failed, status code: ${response.status}, exception information: ${response.statusText}`)
    }
    //处理进度
    if (onProgress) {
      response = this.readProgress(response, onProgress)
    }
    //json数据
    if (responseType == 'json') {
      const data = await response.json()
      return beforeResponse ? beforeResponse.apply(this, [data]) : data
    }
    //blob数据
    if (responseType == 'blob') {
      const data = await response.blob()
      return beforeResponse ? beforeResponse.apply(this, [data]) : data
    }
    //text数据
    if (responseType == 'text') {
      const data = await response.text()
      return beforeResponse ? beforeResponse.apply(this, [data]) : data
    }
    //formData数据
    if (responseType == 'formData') {
      const data = await response.formData()
      return beforeResponse ? beforeResponse.apply(this, [data]) : data
    }
    //arrayBuffer二进制数据
    if (responseType == 'arrayBuffer') {
      const data = await response.arrayBuffer()
      return beforeResponse ? beforeResponse.apply(this, [data]) : data
    }
  }

  /**
   * 发送POST请求
   */
  async post(url: string, body?: BodyInit) {
    return this.create({
      method: 'POST',
      url,
      body
    })
  }

  /**
   * 发送GET请求
   */
  async get(url: string) {
    return this.create({
      method: 'GET',
      url
    })
  }

  /**
   * 删除对象的某个属性
   */
  private deleteProperty<T>(data: any, keys: string[]) {
    const newData = DapCommon.clone(data)
    keys.forEach(key => {
      delete newData[key]
    })
    return newData as T
  }

  /**
   * 包括超时设置功能的fetch函数
   */
  private fetchWrapper(options: RuaxFetchWithTimeoutOptionsType) {
    const { timeout = this.timeout, cancelRequest, init, input } = options
    //超时异常
    const fetchTimeoutError = new Error(`The fetch request failed because time exceeded ${timeout}ms`)
    //取消异常
    const fetchCancelError = new Error(`The fetch request was actively canceled`)
    //创建取消请求的控制器
    const controller = new AbortController()
    //设置超时取消请求
    const timeoutId = setTimeout(() => {
      controller.abort(fetchTimeoutError)
    }, timeout)
    //如果设置了取消请求的函数在此刻执行
    if (cancelRequest) cancelRequest.apply(this, [controller.abort.bind(controller, fetchCancelError)])
    //返回fetch方法
    return window.fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timeoutId))
  }

  /**
   * 读取进度
   */
  private readProgress(response: Response, onProgress?: (value: number) => void) {
    const responseSize = response.headers.get('Content-Length')
    if (!responseSize || !response.body) {
      return response
    }
    //已接收长度
    let receivedLength = 0
    //总长度
    const contentLength = parseInt(responseSize, 10)
    const reader = response.body.getReader()
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            break
          }
          // 更新接收的进度
          receivedLength += value.length
          // 计算进度
          const progress = (receivedLength / contentLength) * 100
          // 调用进度回调函数
          onProgress?.apply(this, [progress])
          controller.enqueue(value)
        }
      }
    })
    return new Response(stream)
  }
}

export { Ruax, Ruax as default }
