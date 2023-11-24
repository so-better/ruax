class Ruax {
	constructor() {
		this.defaults = {} //全局默认参数配置
	}

	//对create的参数config进行初始化，获取初始化后的config
	__getValidationConfig(config) {
		//config非对象,默认为defaults
		if (typeof config != 'object') {
			config = {}
			Object.assign(config, this.defaults)
		}
		//baseUrl基本路径
		if (typeof config.baseUrl != 'string') {
			config.baseUrl = this.defaults.baseUrl
		}
		//url路径
		if (typeof config.url != 'string') {
			config.url = this.defaults.url
		}
		//data请求数据
		if (typeof config.data != 'object') {
			config.data = this.defaults.data
		} else {
			//如果配置的config有data则将defaults的追加进来
			let obj = config.data
			config.data = {}
			Object.assign(config.data, this.defaults.data)
			Object.assign(config.data, obj)
		}
		//type请求方式post/get
		if (typeof config.type != 'string' || (config.type.toLocaleUpperCase() != 'POST' && config.type.toLocaleUpperCase() != 'GET')) {
			config.type = this.defaults.type
		}
		//timeout请求超时时间
		if (typeof config.timeout != 'number' || isNaN(config.timeout)) {
			config.timeout = this.defaults.timeout
		}
		//dataType返回参数类型
		if (typeof config.dataType != 'string' || (config.dataType.toLocaleUpperCase() != 'STRING' && config.dataType.toLocaleUpperCase() != 'XML' && config.dataType.toLocaleUpperCase() != 'HTML' && config.dataType.toLocaleUpperCase() != 'JSON' && config.dataType.toLocaleUpperCase() != 'BLOB' && config.dataType.toLocaleUpperCase() != 'JSONP')) {
			config.dataType = this.defaults.dataType
		}
		//jsonpCallback跨域回调方法名称
		if (typeof config.jsonpCallback != 'string') {
			config.jsonpCallback = this.defaults.jsonpCallback
		}
		//headers请求头配置
		if (typeof config.headers != 'object') {
			config.headers = this.defaults.headers
		} else {
			//如果配置的config有headers则将defaults的追加进来
			let obj = config.headers
			config.headers = {}
			Object.assign(config.headers, this.defaults.headers)
			Object.assign(config.headers, obj)
		}
		//contentType配置
		if (typeof config.contentType != 'string' && config.contentType !== false) {
			config.contentType = this.defaults.contentType
		}
		//processData配置
		if (typeof config.processData != 'boolean') {
			config.processData = this.defaults.processData
		}
		//cache缓存配置
		if (typeof config.cache != 'boolean') {
			config.cache = this.defaults.cache
		}
		//async异步
		if (typeof config.async != 'boolean') {
			config.async = this.defaults.async
		}
		//跨站点访问控制
		if (typeof config.withCredentials != 'boolean') {
			config.withCredentials = this.defaults.withCredentials
		}
		//请求发送前
		if (typeof config.beforeSend != 'function') {
			config.beforeSend = this.defaults.beforeSend
		}
		//请求完成
		if (typeof config.complete != 'function') {
			config.complete = this.defaults.complete
		}
		//请求进度
		if (typeof config.onProgress != 'function') {
			config.onProgress = this.defaults.onProgress
		}
		//取消请求
		if (typeof config.cancelRequest != 'function') {
			config.cancelRequest = this.defaults.cancelRequest
		}
		//请求发送之前对数据进行处理
		if (typeof config.beforeRequest != 'function') {
			config.beforeRequest = this.defaults.beforeRequest
		}
		//请求响应前对响应结果进行处理
		if (typeof config.beforeResponse != 'function') {
			config.beforeResponse = this.defaults.beforeResponse
		}
		return config
	}

	//设置全局默认数据
	__setDefaults() {
		//defaults非对象,默认为空对象
		if (typeof this.defaults != 'object') {
			this.defaults = {}
		}
		//baseUrl基本路径
		if (typeof this.defaults.baseUrl != 'string') {
			this.defaults.baseUrl = ''
		}
		//url路径
		if (typeof this.defaults.url != 'string') {
			this.defaults.url = ''
		}
		//data请求数据
		if (typeof this.defaults.data != 'object') {
			this.defaults.data = {}
		}
		//type请求方式post/get
		if (typeof this.defaults.type != 'string' || (this.defaults.type.toLocaleUpperCase() != 'POST' && this.defaults.type.toLocaleUpperCase() != 'GET')) {
			this.defaults.type = 'GET'
		}
		//timeout请求超时时间
		if (typeof this.defaults.timeout != 'number' || isNaN(this.defaults.timeout)) {
			this.defaults.timeout = 8000
		}
		//dataType返回参数类型
		if (typeof this.defaults.dataType != 'string' || (this.defaults.dataType.toLocaleUpperCase() != 'STRING' && this.defaults.dataType.toLocaleUpperCase() != 'XML' && this.defaults.dataType.toLocaleUpperCase() != 'HTML' && this.defaults.dataType.toLocaleUpperCase() != 'JSON' && this.defaults.dataType.toLocaleUpperCase() != 'BLOB' && this.defaults.dataType.toLocaleUpperCase() != 'JSONP')) {
			this.defaults.dataType = 'JSON'
		}
		//jsonpCallback跨域回调方法名称
		if (typeof this.defaults.jsonpCallback != 'string') {
			this.defaults.jsonpCallback = 'callback'
		}
		//headers请求头配置
		if (typeof this.defaults.headers != 'object') {
			this.defaults.headers = {}
		}
		//ContentType配置
		if (typeof this.defaults.contentType != 'string' && this.defaults.contentType !== false) {
			this.defaults.contentType = 'application/x-www-form-urlencoded'
		}
		//processData配置
		if (typeof this.defaults.processData != 'boolean') {
			this.defaults.processData = true
		}
		//cache缓存配置
		if (typeof this.defaults.cache != 'boolean') {
			this.defaults.cache = true
		}
		//async异步
		if (typeof this.defaults.async != 'boolean') {
			this.defaults.async = true
		}
		//跨站点访问控制
		if (typeof this.defaults.withCredentials != 'boolean') {
			this.defaults.withCredentials = false
		}
		//请求发送前
		if (typeof this.defaults.beforeSend != 'function') {
			this.defaults.beforeSend = function () {}
		}
		//请求完成
		if (typeof this.defaults.complete != 'function') {
			this.defaults.complete = function () {}
		}
		//请求进度
		if (typeof this.defaults.onProgress != 'function') {
			this.defaults.onProgress = function () {}
		}
		//取消请求
		if (typeof this.defaults.cancelRequest != 'function') {
			this.defaults.cancelRequest = function () {}
		}
		//请求发送前对数据处理的方法
		if (typeof this.defaults.beforeRequest != 'function') {
			this.defaults.beforeRequest = function () {}
		}
		//请求发送相应前处理结果的方法
		if (typeof this.defaults.beforeResponse != 'function') {
			this.defaults.beforeResponse = function () {}
		}
	}

	//将json类型的数据转为&拼接的字符串
	__getParams(data) {
		let arr = []
		for (let param in data) {
			arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]))
		}
		return arr.join('&')
	}

	//创建请求发送
	create(config) {
		//初始化defaults数据
		this.__setDefaults()
		//校验config数据
		config = this.__getValidationConfig(config)
		//执行beforeRequest
		config = config.beforeRequest.apply(this, [config])
		//Promise回调
		return new Promise((resolve, reject) => {
			//创建XMLHttpRequest对象
			let xhr = new XMLHttpRequest()
			//如果是媒体文件则设置responseType="blob"
			if (config.dataType.toLocaleLowerCase() == 'blob') {
				xhr.responseType = 'blob'
			}
			//给请求添加状态变化事件处理函数
			xhr.onreadystatechange = e => {
				if (xhr.readyState == 4) {
					config.complete.apply(this, [xhr])
					if (xhr.status == 200) {
						let res
						if (config.dataType.toLocaleLowerCase() == 'json') {
							try {
								res = JSON.parse(xhr.responseText)
							} catch (error) {
								//json解析失败
								reject(error)
							}
						} else if (config.dataType.toLocaleLowerCase() == 'xml') {
							res = xhr.responseXML
						} else if (config.dataType.toLocaleLowerCase() == 'html' || config.dataType == 'string') {
							res = xhr.responseText
						} else if (config.dataType.toLocaleLowerCase() == 'blob') {
							res = xhr.response
						} else {
							res = xhr.responseText
						}
						let response = config.beforeResponse.apply(this, [{ response: res, xhr, config }])
						if (response instanceof Promise) {
							return response
						}
						resolve(res)
					} else if (xhr.status != 0) {
						let response = config.beforeResponse.apply(this, [{ xhr, config }])
						if (response instanceof Promise) {
							return response
						}
						reject(new Error('Request failed with status code ' + xhr.status))
					}
				} else if (xhr.readyState == 1) {
					//请求发送之前
					config.beforeSend.apply(this, [xhr])
				}
			}

			//超时处理
			xhr.ontimeout = e => {
				let response = config.beforeResponse.apply(this, [{ xhr, config }])
				if (response instanceof Promise) {
					return response
				}
				reject(new Error('timeout of ' + config.timeout + 'ms exceeded'))
			}

			//监听上传进度
			xhr.upload.onprogress = e => {
				config.onProgress.apply(this, [e])
			}

			if (config.dataType.toLocaleLowerCase() == 'jsonp') {
				config.beforeSend.apply(this)
				//创建 script 标签并加入到页面中
				let callbackName = ('jsonp_' + Math.random()).replace('.', '')
				let oHead = document.getElementsByTagName('head')[0]
				config.data[config.jsonpCallback] = callbackName
				let oS = document.createElement('script')
				oHead.appendChild(oS)
				//创建jsonp回调函数
				window[callbackName] = result => {
					config.complete.apply(this)
					oHead.removeChild(oS)
					clearTimeout(oS.timer)
					window[callbackName] = null
					let response = config.beforeResponse.apply(this, [{ response: result, config }])
					if (response instanceof Promise) {
						return response
					}
					resolve(result)
				}
				//发送请求
				if ((config.baseUrl + config.url).indexOf('?') > -1) {
					//地址栏含参数
					oS.src = config.baseUrl + config.url + '&' + this.__getParams(config.data)
				} else {
					//地址栏不含参数
					oS.src = config.baseUrl + config.url + '?' + this.__getParams(config.data)
				}
				//超时处理
				oS.timer = setTimeout(() => {
					config.complete.apply(this)
					window[callbackName] = null
					oHead.removeChild(oS)
					let response = config.beforeResponse.apply(this, { config })
					if (response instanceof Promise) {
						return response
					}
					reject(new Error('timeout of ' + config.timeout + 'ms exceeded'))
				}, config.timeout)
			} else {
				if (config.type.toLocaleLowerCase() == 'get') {
					if (this.__getParams(config.data)) {
						xhr.open('GET', config.baseUrl + config.url + '?' + this.__getParams(config.data), config.async)
					} else {
						xhr.open('GET', config.baseUrl + config.url, config.async)
					}
					if (config.async) {
						//异步才设置超时时间
						xhr.timeout = config.timeout //设置超时时间
					}

					//添加配置的请求头
					for (let item in config.headers) {
						xhr.setRequestHeader(item, config.headers[item])
					}
					//添加ContentType
					if (typeof config.contentType == 'string') {
						xhr.setRequestHeader('Content-Type', config.contentType)
					}
					xhr.withCredentials = config.withCredentials
					xhr.send(null)
				} else if (config.type.toLocaleLowerCase() == 'post') {
					xhr.open('POST', config.baseUrl + config.url, config.async)
					if (config.async == true) {
						//异步才设置超时时间
						xhr.timeout = config.timeout //设置超时时间
					}

					//添加配置的请求头
					for (let item in config.headers) {
						xhr.setRequestHeader(item, config.headers[item])
					}
					//添加ContentType
					if (typeof config.contentType == 'string') {
						xhr.setRequestHeader('Content-Type', config.contentType)
					}
					if (config.processData) {
						config.data = this.__getParams(config.data) //转换成序列化参数
					}
					xhr.withCredentials = config.withCredentials
					xhr.send(config.data)
				}
				const abort = function () {
					xhr.abort()
				}
				config.cancelRequest.apply(this, [abort])
			}
		})
	}

	//post请求
	post(url, data) {
		let config = {
			url: url,
			data: data,
			type: 'POST'
		}
		return this.create(config)
	}

	//get请求
	get(url, data) {
		let config = {
			url: url,
			data: data,
			type: 'GET'
		}
		return this.create(config)
	}
}

export default Ruax
