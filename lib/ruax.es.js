class Ruax {
  constructor() {
    this.defaults = {
      //baseUrl基本路径
      baseUrl: "",
      //url路径
      url: "",
      //data请求数据
      data: {},
      //type请求方式post/get
      type: "GET",
      //timeout请求超时时间
      timeout: 8e3,
      //dataType返回参数类型
      dataType: "JSON",
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
    let returnConfig = Object.assign({}, this.defaults);
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
          config.complete.apply(this);
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
            let response = config.beforeResponse.apply(this, { config, error });
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
        xhr.onreadystatechange = (e) => {
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
        xhr.ontimeout = (e) => {
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
      type: "POST"
    };
    return this.create(config);
  }
  //get请求
  get(url, data) {
    let config = {
      url,
      data,
      type: "GET"
    };
    return this.create(config);
  }
}
export {
  Ruax as default
};
