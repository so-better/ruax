var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common = {
  /**
   * 常用判断
   * @param {Object} text 要判断的字符串
   * @param {Object} param 判断的类型字符串
   */
  matchingText(text, param) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!param || typeof param != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (param == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (param == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (param == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (param == "username") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (param == "int+") {
      reg = /^\d+$/;
    }
    if (param == "int-") {
      reg = /^-\d+$/;
    }
    if (param == "int") {
      reg = /^-?\d+$/;
    }
    if (param == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (param == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (param == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (param == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (param == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (param == "url") {
      reg = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/;
    }
    if (param == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (param == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (param == "rgb") {
      reg = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\)$/;
    }
    if (param == "rgba") {
      reg = /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(0?\.\d|1(\.0)?|0)\)$/;
    }
    if (param == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (param == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (param == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  /**
   * 根据参数名获取地址栏参数值
   * @param {Object} name
   */
  getUrlParams(name) {
    if (!name || typeof name != "string") {
      throw new TypeError("The argument must be a string");
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substr(1);
    if (!search) {
      let arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
    return null;
  },
  /**
   * 判断是否空对象
   * @param {Object} obj
   */
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      }
      return false;
    }
    return false;
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
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      let isEqual = true;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
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
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  /**
   * 文本复制
   * @param {Object} text
   */
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
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
      let newData = {};
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
    __publicField(this, "defaults");
    this.defaults = {
      //baseUrl基本路径
      baseUrl: "",
      //url路径
      url: "",
      //data请求数据
      data: {},
      //type请求方式post/get
      type: "get",
      //timeout请求超时时间
      timeout: 8e3,
      //dataType返回参数类型
      dataType: "json",
      //jsonpCallback跨域回调方法名称
      jsonpCallback: "callback",
      //headers请求头配置
      headers: {},
      //contentType配置
      contentType: "application/x-www-form-urlencoded",
      //processData配置
      processData: true,
      //cache缓存配置
      cache: true,
      //async异步
      async: true,
      //跨站点访问控制
      withCredentials: false,
      //请求发送前
      beforeSend: null,
      //请求完成
      complete: null,
      //请求进度
      onProgress: null,
      //取消请求
      cancelRequest: null,
      //请求发送前对数据处理的方法
      beforeRequest: null,
      //请求发送相应前处理结果的方法
      beforeResponse: null
    };
  }
  //对create的参数config进行初始化，获取初始化后的config
  __getValidatedConfig(config) {
    let returnConfig = common.clone(this.defaults);
    if (typeof config == "object" && config) {
      if (typeof config.baseUrl == "string") {
        returnConfig.baseUrl = config.baseUrl;
      }
      if (typeof config.url == "string") {
        returnConfig.url = config.url;
      }
      if (typeof config.data == "object" && config.data) {
        Object.assign(returnConfig.data, config.data);
      }
      if (typeof config.type == "string") {
        returnConfig.type = config.type;
      }
      if (typeof config.timeout == "number" && !isNaN(config.timeout)) {
        returnConfig.timeout = config.timeout;
      }
      if (typeof config.dataType == "string" && ["STRING", "XML", "HTML", "JSON", "BLOB", "JSONP"].includes(config.dataType.toLocaleUpperCase())) {
        returnConfig.dataType = config.dataType;
      }
      if (typeof config.jsonpCallback == "string") {
        returnConfig.jsonpCallback = config.jsonpCallback;
      }
      if (typeof config.headers == "object" && config.headers) {
        Object.assign(returnConfig.headers, config.headers);
      }
      if (typeof config.contentType == "string" || config.contentType === false) {
        returnConfig.contentType = config.contentType;
      }
      if (typeof config.processData == "boolean") {
        returnConfig.processData = config.processData;
      }
      if (typeof config.cache == "boolean") {
        returnConfig.cache = config.cache;
      }
      if (typeof config.async == "boolean") {
        returnConfig.async = config.async;
      }
      if (typeof config.withCredentials == "boolean") {
        returnConfig.withCredentials = config.withCredentials;
      }
      if (typeof config.beforeSend == "function") {
        returnConfig.beforeSend = config.beforeSend;
      }
      if (typeof config.complete == "function") {
        returnConfig.complete = config.complete;
      }
      if (typeof config.onProgress == "function") {
        returnConfig.onProgress = config.onProgress;
      }
      if (typeof config.cancelRequest == "function") {
        returnConfig.cancelRequest = config.cancelRequest;
      }
      if (typeof config.beforeRequest == "function") {
        returnConfig.beforeRequest = config.beforeRequest;
      }
      if (typeof config.beforeResponse == "function") {
        returnConfig.beforeResponse = config.beforeResponse;
      }
    }
    return returnConfig;
  }
  //将json类型的数据转为&拼接的字符串
  __getParams(data) {
    let arr = [];
    for (let param in data) {
      arr.push(encodeURIComponent(param) + "=" + encodeURIComponent(data[param]));
    }
    return arr.join("&");
  }
  //创建请求发送
  create(config) {
    config = this.__getValidatedConfig(config);
    if (typeof config.beforeRequest == "function") {
      config = config.beforeRequest.apply(this, [config]);
      if (config === void 0) {
        throw new Error("The beforeRequest function must return config");
      }
    }
    return new Promise((resolve, reject) => {
      if (config.dataType.toLocaleLowerCase() == "jsonp") {
        if (typeof config.beforeSend == "function") {
          config.beforeSend.apply(this);
        }
        let callbackName = ("jsonp_" + Math.random()).replace(".", "");
        let oHead = document.getElementsByTagName("head")[0];
        config.data[config.jsonpCallback] = callbackName;
        let oS = document.createElement("script");
        oHead.appendChild(oS);
        window[callbackName] = (result) => {
          if (typeof config.complete == "function") {
            config.complete.apply(this);
          }
          oHead.removeChild(oS);
          clearTimeout(oS.timer);
          window[callbackName] = null;
          if (typeof config.beforeResponse == "function") {
            let response = config.beforeResponse.apply(this, [{ response: result, config }]);
            if (response instanceof Promise) {
              resolve(response);
            } else {
              resolve(result);
            }
          } else {
            resolve(result);
          }
        };
        if ((config.baseUrl + config.url).indexOf("?") > -1) {
          oS.src = config.baseUrl + config.url + "&" + this.__getParams(config.data);
        } else {
          oS.src = config.baseUrl + config.url + "?" + this.__getParams(config.data);
        }
        oS.timer = setTimeout(() => {
          if (typeof config.complete == "function") {
            config.complete.apply(this);
          }
          window[callbackName] = null;
          oHead.removeChild(oS);
          const error = new Error("timeout of " + config.timeout + "ms exceeded");
          if (typeof config.beforeResponse == "function") {
            let response = config.beforeResponse.apply(this, [{ config, error }]);
            if (response instanceof Promise) {
              resolve(response);
            } else {
              reject(error);
            }
          } else {
            reject(error);
          }
        }, config.timeout);
      } else {
        let xhr = new XMLHttpRequest();
        if (config.dataType.toLocaleLowerCase() == "blob") {
          xhr.responseType = "blob";
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            if (typeof config.complete == "function") {
              config.complete.apply(this, [xhr]);
            }
            if (xhr.status == 200) {
              let res = null;
              if (config.dataType.toLocaleLowerCase() == "json") {
                try {
                  res = JSON.parse(xhr.responseText);
                } catch (error) {
                  reject(error);
                }
              } else if (config.dataType.toLocaleLowerCase() == "xml") {
                res = xhr.responseXML;
              } else if (config.dataType.toLocaleLowerCase() == "html" || config.dataType == "string") {
                res = xhr.responseText;
              } else if (config.dataType.toLocaleLowerCase() == "blob") {
                res = xhr.response;
              } else {
                res = xhr.responseText;
              }
              if (typeof config.beforeResponse == "function") {
                let response = config.beforeResponse.apply(this, [{ response: res, xhr, config }]);
                if (response instanceof Promise) {
                  resolve(response);
                } else {
                  resolve(res);
                }
              } else {
                resolve(res);
              }
            } else if (xhr.status != 0) {
              const error = new Error("Request failed with status code " + xhr.status);
              if (typeof config.beforeResponse == "function") {
                let response = config.beforeResponse.apply(this, [{ xhr, config, error }]);
                if (response instanceof Promise) {
                  resolve(response);
                } else {
                  reject(error);
                }
              } else {
                reject(error);
              }
            }
          } else if (xhr.readyState == 1) {
            if (typeof config.beforeSend == "function") {
              config.beforeSend.apply(this, [xhr]);
            }
          }
        };
        xhr.ontimeout = () => {
          const error = new Error("timeout of " + config.timeout + "ms exceeded");
          if (typeof config.beforeResponse == "function") {
            let response = config.beforeResponse.apply(this, [{ xhr, config, error }]);
            if (response instanceof Promise) {
              resolve(response);
            } else {
              reject(error);
            }
          } else {
            reject(error);
          }
        };
        xhr.upload.onprogress = (e) => {
          if (typeof config.onProgress == "function") {
            config.onProgress.apply(this, [e]);
          }
        };
        if (config.type.toLocaleLowerCase() == "get") {
          if (this.__getParams(config.data)) {
            xhr.open("GET", config.baseUrl + config.url + "?" + this.__getParams(config.data), config.async);
          } else {
            xhr.open("GET", config.baseUrl + config.url, config.async);
          }
          if (config.async) {
            xhr.timeout = config.timeout;
          }
          for (let item in config.headers) {
            xhr.setRequestHeader(item, config.headers[item]);
          }
          if (typeof config.contentType == "string") {
            xhr.setRequestHeader("Content-Type", config.contentType);
          }
          xhr.withCredentials = config.withCredentials;
          xhr.send(null);
        } else if (config.type.toLocaleLowerCase() == "post") {
          xhr.open("POST", config.baseUrl + config.url, config.async);
          if (config.async == true) {
            xhr.timeout = config.timeout;
          }
          for (let item in config.headers) {
            xhr.setRequestHeader(item, config.headers[item]);
          }
          if (typeof config.contentType == "string") {
            xhr.setRequestHeader("Content-Type", config.contentType);
          }
          if (config.processData) {
            config.data = this.__getParams(config.data);
          }
          xhr.withCredentials = config.withCredentials;
          xhr.send(config.data);
        }
        const abort = function() {
          xhr.abort();
        };
        if (typeof config.cancelRequest === "function") {
          config.cancelRequest.apply(this, [abort]);
        }
      }
    });
  }
  //post请求
  post(url, data) {
    let config = {
      url,
      data,
      type: "post"
    };
    return this.create(config);
  }
  //get请求
  get(url, data) {
    let config = {
      url,
      data,
      type: "get"
    };
    return this.create(config);
  }
}
export {
  Ruax,
  Ruax as default
};
