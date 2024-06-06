type ObjectType = {
	[key: string]: any
}

type ConfigurationType = {
	//baseUrl基本路径
	baseUrl?: string
	//url路径
	url?: string
	//data请求数据
	data?: ObjectType | string
	//type请求方式post/get
	type?: 'get' | 'post' | 'POST' | 'GET'
	//timeout请求超时时间
	timeout?: number
	//dataType返回参数类型
	dataType?: 'json' | 'string' | 'xml' | 'html' | 'blob' | 'jsonp'
	//jsonpCallback跨域回调方法名称
	jsonpCallback?: string
	//headers请求头配置
	headers?: ObjectType
	//contentType配置
	contentType?: string | boolean
	//processData配置
	processData?: boolean
	//cache缓存配置
	cache?: boolean
	//async异步
	async?: boolean
	//跨站点访问控制
	withCredentials?: boolean
	//请求发送前
	beforeSend?: null | ((xhr?: XMLHttpRequest) => void)
	//请求完成
	complete?: null | ((xhr?: XMLHttpRequest) => void)
	//请求进度
	onProgress?: null | ((e: ProgressEvent) => void)
	//取消请求
	cancelRequest?: null | ((abort: () => void) => void)
	//请求发送前对数据处理的方法
	beforeRequest?: null | ((config: ConfigurationType) => ConfigurationType)
	//请求发送相应前处理结果的方法
	beforeResponse?: null | ((res: BeforeResponeParamType) => void | Promise<any>)
}

type BeforeResponeParamType = {
	config?: ConfigurationType
	response?: any
	error?: Error
	xhr?: XMLHttpRequest
}

class Ruax {
	defaults: ConfigurationType

	constructor() {
		//全局默认参数配置
		this.defaults = {
			//baseUrl基本路径
			baseUrl: '',
			//url路径
			url: '',
			//data请求数据
			data: {},
			//type请求方式post/get
			type: 'get',
			//timeout请求超时时间
			timeout: 8000,
			//dataType返回参数类型
			dataType: 'json',
			//jsonpCallback跨域回调方法名称
			jsonpCallback: 'callback',
			//headers请求头配置
			headers: {},
			//contentType配置
			contentType: 'application/x-www-form-urlencoded',
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
		}
	}

	//对create的参数config进行初始化，获取初始化后的config
	private __getValidatedConfig(config: ConfigurationType) {
		//初始化为defaults
		let returnConfig = Object.assign({}, this.defaults)
		//如果传入的config是对象
		if (typeof config == 'object' && config) {
			if (typeof config.baseUrl == 'string') {
				returnConfig.baseUrl = config.baseUrl
			}
			if (typeof config.url == 'string') {
				returnConfig.url = config.url
			}
			if (typeof config.data == 'object' && config.data) {
				Object.assign(returnConfig.data!, config.data)
			}
			if (typeof config.type == 'string') {
				returnConfig.type = config.type
			}
			if (typeof config.timeout == 'number' && !isNaN(config.timeout)) {
				returnConfig.timeout = config.timeout
			}
			if (typeof config.dataType == 'string' && ['STRING', 'XML', 'HTML', 'JSON', 'BLOB', 'JSONP'].includes(config.dataType.toLocaleUpperCase())) {
				returnConfig.dataType = config.dataType
			}
			if (typeof config.jsonpCallback == 'string') {
				returnConfig.jsonpCallback = config.jsonpCallback
			}
			if (typeof config.headers == 'object' && config.headers) {
				Object.assign(returnConfig.headers!, config.headers)
			}
			if (typeof config.contentType == 'string' || config.contentType === false) {
				returnConfig.contentType = config.contentType
			}
			if (typeof config.processData == 'boolean') {
				returnConfig.processData = config.processData
			}
			if (typeof config.cache == 'boolean') {
				returnConfig.cache = config.cache
			}
			if (typeof config.async == 'boolean') {
				returnConfig.async = config.async
			}
			if (typeof config.withCredentials == 'boolean') {
				returnConfig.withCredentials = config.withCredentials
			}
			if (typeof config.beforeSend == 'function') {
				returnConfig.beforeSend = config.beforeSend
			}
			if (typeof config.complete == 'function') {
				returnConfig.complete = config.complete
			}
			if (typeof config.onProgress == 'function') {
				returnConfig.onProgress = config.onProgress
			}
			if (typeof config.cancelRequest == 'function') {
				returnConfig.cancelRequest = config.cancelRequest
			}
			if (typeof config.beforeRequest == 'function') {
				returnConfig.beforeRequest = config.beforeRequest
			}
			if (typeof config.beforeResponse == 'function') {
				returnConfig.beforeResponse = config.beforeResponse
			}
		}

		return returnConfig
	}

	//将json类型的数据转为&拼接的字符串
	private __getParams(data: ObjectType) {
		let arr = []
		for (let param in data) {
			arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]))
		}
		return arr.join('&')
	}

	//创建请求发送
	create(config: ConfigurationType) {
		//校验config数据
		config = this.__getValidatedConfig(config)
		//执行beforeRequest
		if (typeof config.beforeRequest == 'function') {
			config = config.beforeRequest.apply(this, [config])
			if (config === undefined) {
				throw new Error('The beforeRequest function must return config')
			}
		}
		//Promise回调
		return new Promise<any>((resolve, reject) => {
			if (config.dataType!.toLocaleLowerCase() == 'jsonp') {
				if (typeof config.beforeSend == 'function') {
					config.beforeSend.apply(this)
				}
				//创建 script 标签并加入到页面中
				let callbackName = ('jsonp_' + Math.random()).replace('.', '')
				let oHead = document.getElementsByTagName('head')[0]
				;(<ObjectType>config.data)[config.jsonpCallback!] = callbackName
				let oS = document.createElement('script')
				oHead.appendChild(oS)
				//创建jsonp回调函数
				;(<any>window)[callbackName] = (result: any) => {
					if (typeof config.complete == 'function') {
						config.complete.apply(this)
					}
					oHead.removeChild(oS)
					clearTimeout((<any>oS).timer)
					;(<any>window)[callbackName] = null
					if (typeof config.beforeResponse == 'function') {
						let response = config.beforeResponse.apply(this, [{ response: result, config }])
						if (response instanceof Promise) {
							resolve(response)
						} else {
							resolve(result)
						}
					} else {
						resolve(result)
					}
				}
				//发送请求
				if ((config.baseUrl! + config.url!).indexOf('?') > -1) {
					//地址栏含参数
					oS.src = config.baseUrl! + config.url! + '&' + this.__getParams(<ObjectType>config.data)
				} else {
					//地址栏不含参数
					oS.src = config.baseUrl! + config.url! + '?' + this.__getParams(<ObjectType>config.data)
				}
				//超时处理
				;(<any>oS).timer = setTimeout(() => {
					if (typeof config.complete == 'function') {
						config.complete.apply(this)
					}
					;(<any>window)[callbackName] = null
					oHead.removeChild(oS)
					const error = new Error('timeout of ' + config.timeout + 'ms exceeded')
					if (typeof config.beforeResponse == 'function') {
						let response = config.beforeResponse.apply(this, [{ config, error }])
						if (response instanceof Promise) {
							resolve(response)
						} else {
							reject(error)
						}
					} else {
						reject(error)
					}
				}, config.timeout)
			} else {
				//创建XMLHttpRequest对象
				let xhr = new XMLHttpRequest()
				//如果是媒体文件则设置responseType="blob"
				if (config.dataType!.toLocaleLowerCase() == 'blob') {
					xhr.responseType = 'blob'
				}
				//给请求添加状态变化事件处理函数
				xhr.onreadystatechange = () => {
					if (xhr.readyState == 4) {
						if (typeof config.complete == 'function') {
							config.complete.apply(this, [xhr])
						}
						if (xhr.status == 200) {
							let res = null
							if (config.dataType!.toLocaleLowerCase() == 'json') {
								try {
									res = JSON.parse(xhr.responseText)
								} catch (error) {
									//json解析失败
									reject(error)
								}
							} else if (config.dataType!.toLocaleLowerCase() == 'xml') {
								res = xhr.responseXML
							} else if (config.dataType!.toLocaleLowerCase() == 'html' || config.dataType == 'string') {
								res = xhr.responseText
							} else if (config.dataType!.toLocaleLowerCase() == 'blob') {
								res = xhr.response
							} else {
								res = xhr.responseText
							}

							if (typeof config.beforeResponse == 'function') {
								let response = config.beforeResponse.apply(this, [{ response: res, xhr, config }])
								if (response instanceof Promise) {
									resolve(response)
								} else {
									resolve(res)
								}
							} else {
								resolve(res)
							}
						} else if (xhr.status != 0) {
							const error = new Error('Request failed with status code ' + xhr.status)
							if (typeof config.beforeResponse == 'function') {
								let response = config.beforeResponse.apply(this, [{ xhr, config, error }])
								if (response instanceof Promise) {
									resolve(response)
								} else {
									reject(error)
								}
							} else {
								reject(error)
							}
						}
					} else if (xhr.readyState == 1) {
						//请求发送之前
						if (typeof config.beforeSend == 'function') {
							config.beforeSend.apply(this, [xhr])
						}
					}
				}
				//超时处理
				xhr.ontimeout = () => {
					const error = new Error('timeout of ' + config.timeout + 'ms exceeded')
					if (typeof config.beforeResponse == 'function') {
						let response = config.beforeResponse.apply(this, [{ xhr, config, error }])
						if (response instanceof Promise) {
							resolve(response)
						} else {
							reject(error)
						}
					} else {
						reject(error)
					}
				}
				//监听上传进度
				xhr.upload.onprogress = e => {
					if (typeof config.onProgress == 'function') {
						config.onProgress.apply(this, [e])
					}
				}
				if (config.type!.toLocaleLowerCase() == 'get') {
					if (this.__getParams(<ObjectType>config.data)) {
						xhr.open('GET', config.baseUrl! + config.url! + '?' + this.__getParams(<ObjectType>config.data), config.async!)
					} else {
						xhr.open('GET', config.baseUrl! + config.url!, config.async!)
					}
					if (config.async) {
						//异步才设置超时时间
						xhr.timeout = config.timeout! //设置超时时间
					}

					//添加配置的请求头
					for (let item in config.headers) {
						xhr.setRequestHeader(item, config.headers[item])
					}
					//添加ContentType
					if (typeof config.contentType == 'string') {
						xhr.setRequestHeader('Content-Type', config.contentType)
					}
					xhr.withCredentials = config.withCredentials!
					xhr.send(null)
				} else if (config.type!.toLocaleLowerCase() == 'post') {
					xhr.open('POST', config.baseUrl! + config.url!, config.async!)
					if (config.async == true) {
						//异步才设置超时时间
						xhr.timeout = config.timeout! //设置超时时间
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
						config.data = this.__getParams(<ObjectType>config.data) //转换成序列化参数
					}
					xhr.withCredentials = config.withCredentials!
					xhr.send(<string>config.data)
				}
				const abort = function () {
					xhr.abort()
				}
				if (typeof config.cancelRequest === 'function') {
					config.cancelRequest.apply(this, [abort])
				}
			}
		})
	}

	//post请求
	post(url: string, data?: ObjectType) {
		let config: ConfigurationType = {
			url: url,
			data: data,
			type: 'post'
		}
		return this.create(config)
	}

	//get请求
	get(url: string, data?: ObjectType) {
		let config: ConfigurationType = {
			url: url,
			data: data,
			type: 'get'
		}
		return this.create(config)
	}
}

export default Ruax
