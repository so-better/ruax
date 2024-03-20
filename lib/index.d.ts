type ObjectType = {
    [key: string]: any;
};
type ConfigurationType = {
    baseUrl?: string;
    url?: string;
    data?: ObjectType | string;
    type?: 'get' | 'post';
    timeout?: number;
    dataType?: 'json' | 'string' | 'xml' | 'html' | 'blob' | 'jsonp';
    jsonpCallback?: string;
    headers?: ObjectType;
    contentType?: string | boolean;
    processData?: boolean;
    cache?: boolean;
    async?: boolean;
    withCredentials?: boolean;
    beforeSend?: null | ((xhr?: XMLHttpRequest) => void);
    complete?: null | ((xhr?: XMLHttpRequest) => void);
    onProgress?: null | ((e: ProgressEvent) => void);
    cancelRequest?: null | ((abort: () => void) => void);
    beforeRequest?: null | ((config: ConfigurationType) => ConfigurationType);
    beforeResponse?: null | ((res: BeforeResponeParamType) => void | Promise<any>);
};
type BeforeResponeParamType = {
    config?: ConfigurationType;
    response?: any;
    error?: Error;
    xhr?: XMLHttpRequest;
};
declare class Ruax {
    defaults: ConfigurationType;
    constructor();
    private __getValidatedConfig;
    private __getParams;
    create(config: ConfigurationType): Promise<any>;
    post(url: string, data?: ObjectType): Promise<any>;
    get(url: string, data?: ObjectType): Promise<any>;
}
export default Ruax;
