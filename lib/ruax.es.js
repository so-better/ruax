class Ruax {
  constructor() {
    this.defaults = {};
  }
  //对create的参数config进行初始化，获取初始化后的config
  __getValidationConfig(config) {
    if (typeof config != "object") {
      config = {};
      Object.assign(config, this.defaults);
    }
    if (typeof config.baseUrl != "string") {
      config.baseUrl = this.defaults.baseUrl;
    }
    if (typeof config.url != "string") {
      config.url = this.defaults.url;
    }
    if (typeof config.data != "object") {
      config.data = this.defaults.data;
    } else {
      let obj = config.data;
      config.data = {};
      Object.assign(config.data, this.defaults.data);
      Object.assign(config.data, obj);
    }
    if (typeof config.type != "string" || config.type.toLocaleUpperCase() != "POST" && config.type.toLocaleUpperCase() != "GET") {
      config.type = this.defaults.type;
    }
    if (typeof config.timeout != "number" || isNaN(config.timeout)) {
      config.timeout = this.defaults.timeout;
    }
    if (typeof config.dataType != "string" || config.dataType.toLocaleUpperCase() != "STRING" && config.dataType.toLocaleUpperCase() != "XML" && config.dataType.toLocaleUpperCase() != "HTML" && config.dataType.toLocaleUpperCase() != "JSON" && config.dataType.toLocaleUpperCase() != "BLOB" && config.dataType.toLocaleUpperCase() != "JSONP") {
      config.dataType = this.defaults.dataType;
    }
    if (typeof config.jsonpCallback != "string") {
      config.jsonpCallback = this.defaults.jsonpCallback;
    }
    if (typeof config.headers != "object") {
      config.headers = this.defaults.headers;
    } else {
      let obj = config.headers;
      config.headers = {};
      Object.assign(config.headers, this.defaults.headers);
      Object.assign(config.headers, obj);
    }
    if (typeof config.contentType != "string" && config.contentType !== false) {
      config.contentType = this.defaults.contentType;
    }
    if (typeof config.processData != "boolean") {
      config.processData = this.defaults.processData;
    }
    if (typeof config.cache != "boolean") {
      config.cache = this.defaults.cache;
    }
    if (typeof config.async != "boolean") {
      config.async = this.defaults.async;
    }
    if (typeof config.withCredentials != "boolean") {
      config.withCredentials = this.defaults.withCredentials;
    }
    if (typeof config.beforeSend != "function") {
      config.beforeSend = this.defaults.beforeSend;
    }
    if (typeof config.complete != "function") {
      config.complete = this.defaults.complete;
    }
    if (typeof config.onProgress != "function") {
      config.onProgress = this.defaults.onProgress;
    }
    if (typeof config.cancelRequest != "function") {
      config.cancelRequest = this.defaults.cancelRequest;
    }
    if (typeof config.beforeRequest != "function") {
      config.beforeRequest = this.defaults.beforeRequest;
    }
    if (typeof config.beforeResponse != "function") {
      config.beforeResponse = this.defaults.beforeResponse;
    }
    return config;
  }
  //设置全局默认数据
  __setDefaults() {
    if (typeof this.defaults != "object") {
      this.defaults = {};
    }
    if (typeof this.defaults.baseUrl != "string") {
      this.defaults.baseUrl = "";
    }
    if (typeof this.defaults.url != "string") {
      this.defaults.url = "";
    }
    if (typeof this.defaults.data != "object") {
      this.defaults.data = {};
    }
    if (typeof this.defaults.type != "string" || this.defaults.type.toLocaleUpperCase() != "POST" && this.defaults.type.toLocaleUpperCase() != "GET") {
      this.defaults.type = "GET";
    }
    if (typeof this.defaults.timeout != "number" || isNaN(this.defaults.timeout)) {
      this.defaults.timeout = 8e3;
    }
    if (typeof this.defaults.dataType != "string" || this.defaults.dataType.toLocaleUpperCase() != "STRING" && this.defaults.dataType.toLocaleUpperCase() != "XML" && this.defaults.dataType.toLocaleUpperCase() != "HTML" && this.defaults.dataType.toLocaleUpperCase() != "JSON" && this.defaults.dataType.toLocaleUpperCase() != "BLOB" && this.defaults.dataType.toLocaleUpperCase() != "JSONP") {
      this.defaults.dataType = "JSON";
    }
    if (typeof this.defaults.jsonpCallback != "string") {
      this.defaults.jsonpCallback = "callback";
    }
    if (typeof this.defaults.headers != "object") {
      this.defaults.headers = {};
    }
    if (typeof this.defaults.contentType != "string" && this.defaults.contentType !== false) {
      this.defaults.contentType = "application/x-www-form-urlencoded";
    }
    if (typeof this.defaults.processData != "boolean") {
      this.defaults.processData = true;
    }
    if (typeof this.defaults.cache != "boolean") {
      this.defaults.cache = true;
    }
    if (typeof this.defaults.async != "boolean") {
      this.defaults.async = true;
    }
    if (typeof this.defaults.withCredentials != "boolean") {
      this.defaults.withCredentials = false;
    }
    if (typeof this.defaults.beforeSend != "function") {
      this.defaults.beforeSend = function() {
      };
    }
    if (typeof this.defaults.complete != "function") {
      this.defaults.complete = function() {
      };
    }
    if (typeof this.defaults.onProgress != "function") {
      this.defaults.onProgress = function() {
      };
    }
    if (typeof this.defaults.cancelRequest != "function") {
      this.defaults.cancelRequest = function() {
      };
    }
    if (typeof this.defaults.beforeRequest != "function") {
      this.defaults.beforeRequest = function() {
      };
    }
    if (typeof this.defaults.beforeResponse != "function") {
      this.defaults.beforeResponse = function() {
      };
    }
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
    this.__setDefaults();
    config = this.__getValidationConfig(config);
    config = config.beforeRequest.apply(this, [config]);
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      if (config.dataType.toLocaleLowerCase() == "blob") {
        xhr.responseType = "blob";
      }
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
          config.complete.apply(this, [xhr]);
          if (xhr.status == 200) {
            let res;
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
            let response = config.beforeResponse.apply(this, [{ response: res, xhr, config }]);
            if (response instanceof Promise) {
              return response;
            }
            resolve(res);
          } else if (xhr.status != 0) {
            let response = config.beforeResponse.apply(this, [{ xhr, config }]);
            if (response instanceof Promise) {
              return response;
            }
            reject(new Error("Request failed with status code " + xhr.status));
          }
        } else if (xhr.readyState == 1) {
          config.beforeSend.apply(this, [xhr]);
        }
      };
      xhr.ontimeout = (e) => {
        let response = config.beforeResponse.apply(this, [{ xhr, config }]);
        if (response instanceof Promise) {
          return response;
        }
        reject(new Error("timeout of " + config.timeout + "ms exceeded"));
      };
      xhr.upload.onprogress = (e) => {
        config.onProgress.apply(this, [e]);
      };
      if (config.dataType.toLocaleLowerCase() == "jsonp") {
        config.beforeSend.apply(this);
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
          let response = config.beforeResponse.apply(this, [{ response: result, config }]);
          if (response instanceof Promise) {
            return response;
          }
          resolve(result);
        };
        if ((config.baseUrl + config.url).indexOf("?") > -1) {
          oS.src = config.baseUrl + config.url + "&" + this.__getParams(config.data);
        } else {
          oS.src = config.baseUrl + config.url + "?" + this.__getParams(config.data);
        }
        oS.timer = setTimeout(() => {
          config.complete.apply(this);
          window[callbackName] = null;
          oHead.removeChild(oS);
          let response = config.beforeResponse.apply(this, { config });
          if (response instanceof Promise) {
            return response;
          }
          reject(new Error("timeout of " + config.timeout + "ms exceeded"));
        }, config.timeout);
      } else {
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
        config.cancelRequest.apply(this, [abort]);
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
