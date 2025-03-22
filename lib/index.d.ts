/**
 * 请求返回类型
 */
export type RuaxResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
/**
 * fetch入参
 */
export type RuaxFetchWithTimeoutOptionsType = {
    timeout?: number;
    cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void;
    input: RequestInfo | URL;
    init?: RequestInit;
};
/**
 * 基本请求入参类型
 */
export interface RuaxCreateOptions {
    /**
     * 请求地址
     */
    url: string;
    /**
     * 请求入参
     */
    body?: BodyInit;
    /**
     * 基本地址
     */
    baseUrl?: string;
    /**
     * 请求方法
     */
    method?: string;
    /**
     * 请求头
     */
    headers?: HeadersInit;
    /**
     * 请求返回类型
     */
    responseType?: RuaxResponseType;
    /**
     * 超时时间，单位ms
     */
    timeout?: number;
    /**
     * 跨域行为
     */
    mode?: RequestMode;
    /**
     * 缓存策略
     */
    cache?: RequestCache;
    /**
     * 取消请求
     */
    cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void;
    /**
     * 请求进度
     */
    onProgress?: (value: number) => void;
}
/**
 * 创建请求入参类型
 */
export interface RuaxCreateOptionsWithInterceptor extends RuaxCreateOptions {
    /**
     * 请求拦截
     */
    beforeRequest?: (options: RuaxCreateOptions) => RuaxCreateOptions;
    /**
     * 响应拦截
     */
    beforeResponse?: (response: Response, data?: any, options?: RuaxCreateOptions) => Promise<any> | any;
}
/**
 * 请求对象
 */
declare class Ruax {
    /**
     * 默认基本地址
     */
    baseUrl: string;
    /**
     * 默认请求方法
     */
    method: string;
    /**
     * 默认请求头
     */
    headers: HeadersInit;
    /**
     * 默认返回类型
     */
    responseType: RuaxResponseType;
    /**
     * 默认超时时间
     */
    timeout: number;
    /**
     * 默认的跨域行为
     */
    mode: RequestMode;
    /**
     * 缓存策略
     */
    cache: RequestCache;
    /**
     * 请求拦截
     */
    beforeRequest?: (options: RuaxCreateOptions) => RuaxCreateOptions;
    /**
     * 响应拦截
     */
    beforeResponse?: (response: Response, data?: any, options?: RuaxCreateOptions) => Promise<any> | any;
    /**
     * 取消请求
     */
    cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void;
    /**
     * 请求进度
     */
    onProgress?: (value: number) => void;
    /**
     * 创建请求
     */
    create(options: RuaxCreateOptionsWithInterceptor): Promise<any>;
    /**
     * 发送POST请求
     */
    post(url: string, body?: BodyInit): Promise<any>;
    /**
     * 发送GET请求
     */
    get(url: string): Promise<any>;
    /**
     * 删除对象的某个属性
     */
    private deleteProperty;
    /**
     * 包括超时设置功能的fetch函数
     */
    private fetchWrapper;
    /**
     * 读取进度
     */
    private readProgress;
}
export { Ruax, Ruax as default };
