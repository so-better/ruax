var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const common = {
  /**
   * 常用判断
   * @param {Object} text 要判断的字符串
   * @param {Object} param 判断的类型字符串
   */
  matchingText(text, param) {
    if (param == "Chinese") {
      return /^[\u4e00-\u9fa5]+$/.test(text);
    }
    if (param == "chinese") {
      return /[\u4e00-\u9fa5]/.test(text);
    }
    if (param == "email") {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(text);
    }
    if (param == "username") {
      return /^[a-zA-Z0-9_]{4,16}$/.test(text);
    }
    if (param == "int+") {
      return /^\d+$/.test(text);
    }
    if (param == "int-") {
      return /^-\d+$/.test(text);
    }
    if (param == "int") {
      return /^-?\d+$/.test(text);
    }
    if (param == "pos") {
      return /^\d*\.?\d+$/.test(text);
    }
    if (param == "neg") {
      return /^-\d*\.?\d+$/.test(text);
    }
    if (param == "number") {
      return /^-?\d*\.?\d+$/.test(text);
    }
    if (param == "phone") {
      return /^1[0-9]\d{9}$/.test(text);
    }
    if (param == "idCard") {
      return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(text);
    }
    if (param == "url") {
      return /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/.test(text);
    }
    if (param == "IPv4") {
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text);
    }
    if (param == "hex") {
      return /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(text);
    }
    if (param == "rgb") {
      return /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\)$/.test(text);
    }
    if (param == "rgba") {
      return /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(0?\.\d|1(\.0)?|0)\)$/.test(text);
    }
    if (param == "QQ") {
      return /^[1-9][0-9]{4,10}$/.test(text);
    }
    if (param == "weixin") {
      return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(text);
    }
    if (param == "plate") {
      return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$|^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[D|F]{1}[A-Z0-9]{5,6}$/.test(text);
    }
    return false;
  },
  /**
   * 根据参数名获取地址栏参数值
   * @param {Object} name
   */
  getUrlParams(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substring(1);
    if (!search) {
      const arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
  },
  /**
   * 判断是否空对象
   * @param {Object} obj
   */
  isEmptyObject(obj) {
    return this.isObject(obj) && Object.keys(obj).length == 0;
  },
  /**
   * 判断两个参数是否相等
   * @param {Object} a
   * @param {Object} b
   */
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      const length = aProps.length;
      let isEqual = true;
      for (let i = 0; i < length; i++) {
        const propName = aProps[i];
        const propA = a[propName];
        const propB = b[propName];
        if (!this.equal(propA, propB)) {
          isEqual = false;
          break;
        }
      }
      return isEqual;
    }
    return a === b;
  },
  /**
   * 是否对象
   * @param {Object} val
   */
  isObject(val) {
    return typeof val === "object" && !!val;
  },
  /**
   * 文本复制
   * @param {Object} text
   */
  copyText(text) {
    if (!navigator.clipboard) {
      throw new Error("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the method won't work");
    }
    return navigator.clipboard.writeText(text);
  },
  /**
   * 深度克隆
   * @param {Object} data
   */
  clone(data2) {
    if (this.isObject(data2)) {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return this.clone(item);
        });
      }
      const newData = {};
      for (let key in data2) {
        newData[key] = this.clone(data2[key]);
      }
      return newData;
    }
    return data2;
  }
};
class Ruax {
  constructor() {
    /**
     * 默认基本地址
     */
    __publicField(this, "baseUrl", "");
    /**
     * 默认请求方法
     */
    __publicField(this, "method", "GET");
    /**
     * 默认请求头
     */
    __publicField(this, "headers", {});
    /**
     * 默认返回类型
     */
    __publicField(this, "responseType", "json");
    /**
     * 默认超时时间
     */
    __publicField(this, "timeout", 3e3);
    /**
     * 默认的跨域行为
     */
    __publicField(this, "mode", "cors");
    /**
     * 缓存策略
     */
    __publicField(this, "cache", "default");
    /**
     * 请求拦截
     */
    __publicField(this, "beforeRequest");
    /**
     * 响应拦截
     */
    __publicField(this, "beforeResponse");
    /**
     * 取消请求
     */
    __publicField(this, "cancelRequest");
    /**
     * 请求进度
     */
    __publicField(this, "onProgress");
  }
  /**
   * 创建请求
   */
  async create(options) {
    if (!window.fetch) {
      throw new Error("The current browser does not support the Fetch API.");
    }
    const { beforeRequest = this.beforeRequest, beforeResponse = this.beforeResponse } = options;
    let newOptions = this.deleteProperty(options, ["beforeRequest", "beforeResponse"]);
    if (beforeRequest) newOptions = beforeRequest.apply(this, [newOptions]);
    const { baseUrl = this.baseUrl, url, method = this.method, headers, responseType = this.responseType, body, timeout = this.timeout, mode = this.mode, cache = this.cache, cancelRequest = this.cancelRequest, onProgress = this.onProgress } = newOptions;
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
    });
    if (!response.ok) {
      throw new Error(`The fetch request failed, status code: ${response.status}, exception information: ${response.statusText}`);
    }
    if (onProgress) {
      response = this.readProgress(response, onProgress);
    }
    if (responseType == "json") {
      const data = await response.json();
      return beforeResponse ? beforeResponse.apply(this, [data]) : data;
    }
    if (responseType == "blob") {
      const data = await response.blob();
      return beforeResponse ? beforeResponse.apply(this, [data]) : data;
    }
    if (responseType == "text") {
      const data = await response.text();
      return beforeResponse ? beforeResponse.apply(this, [data]) : data;
    }
    if (responseType == "formData") {
      const data = await response.formData();
      return beforeResponse ? beforeResponse.apply(this, [data]) : data;
    }
    if (responseType == "arrayBuffer") {
      const data = await response.arrayBuffer();
      return beforeResponse ? beforeResponse.apply(this, [data]) : data;
    }
  }
  /**
   * 发送POST请求
   */
  async post(url, body) {
    return this.create({
      method: "POST",
      url,
      body
    });
  }
  /**
   * 发送GET请求
   */
  async get(url) {
    return this.create({
      method: "GET",
      url
    });
  }
  /**
   * 删除对象的某个属性
   */
  deleteProperty(data, keys) {
    const newData = common.clone(data);
    keys.forEach((key) => {
      delete newData[key];
    });
    return newData;
  }
  /**
   * 包括超时设置功能的fetch函数
   */
  fetchWrapper(options) {
    const { timeout = this.timeout, cancelRequest, init, input } = options;
    const fetchTimeoutError = new Error(`The fetch request failed because time exceeded ${timeout}ms`);
    const fetchCancelError = new Error(`The fetch request was actively canceled`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort(fetchTimeoutError);
    }, timeout);
    if (cancelRequest) cancelRequest.apply(this, [controller.abort.bind(controller, fetchCancelError)]);
    return window.fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timeoutId));
  }
  /**
   * 读取进度
   */
  readProgress(response, onProgress) {
    const responseSize = response.headers.get("Content-Length");
    if (!responseSize || !response.body) {
      return response;
    }
    let receivedLength = 0;
    const contentLength = parseInt(responseSize, 10);
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          receivedLength += value.length;
          const progress = receivedLength / contentLength * 100;
          onProgress == null ? void 0 : onProgress.apply(this, [progress]);
          controller.enqueue(value);
        }
      }
    });
    return new Response(stream);
  }
}
export {
  Ruax,
  Ruax as default
};
