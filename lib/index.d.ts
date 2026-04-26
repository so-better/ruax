/**
 * 请求返回类型
 */
export type RuaxResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData' | 'stream';
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
     * 超时时间，单位ms，流式请求建议设为0（不超时）
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
     * 凭证策略，跨域携带 cookie 时设为 'include'
     */
    credentials?: RequestCredentials;
    /**
     * 取消请求
     */
    cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void;
    /**
     * 请求进度
     */
    onProgress?: (value: number) => void;
    /**
     * 流式数据回调，每次收到数据块时触发，done 为 true 表示流结束
     * 仅在 responseType 为 'stream' 时生效
     */
    onChunk?: (chunk: string, done: boolean) => void;
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
    beforeResponse?: (response: Response, options: RuaxCreateOptions, data?: any) => Promise<any> | any;
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
     * 凭证策略
     */
    credentials: RequestCredentials;
    /**
     * 请求拦截
     */
    beforeRequest?: (options: RuaxCreateOptions) => RuaxCreateOptions;
    /**
     * 响应拦截
     */
    beforeResponse?: (response: Response, options: RuaxCreateOptions, data?: any) => Promise<any> | any;
    /**
     * 取消请求
     */
    cancelRequest?: (abortFun: typeof AbortController.prototype.abort) => void;
    /**
     * 请求进度
     */
    onProgress?: (value: number) => void;
    /**
     * 流式数据回调
     */
    onChunk?: (chunk: string, done: boolean) => void;
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
     * 发送PUT请求
     */
    put(url: string, body?: BodyInit): Promise<any>;
    /**
     * 发送PATCH请求
     */
    patch(url: string, body?: BodyInit): Promise<any>;
    /**
     * 发送DELETE请求
     */
    delete(url: string): Promise<any>;
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
    /**
     * 消费 ReadableStream，将每个数据块解码为文本后通过 onChunk 回调
     * 请求被 abort 或发生错误时异常会向上抛出，onChunk 不会触发 done，调用方需在 catch 中处理清理逻辑
     */
    private readStream;
}
export { Ruax, Ruax as default };
