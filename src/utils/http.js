import axios from 'axios'
import { message } from 'antd'

export default class Http {
  constructor(baseURL, options = {}) {
    this.instance = axios.create({
      baseURL,
    })

    this.options = options

    this.instance.interceptors.request.use((config) => this.handleRequest(config), this.handleError)

    this.instance.interceptors.response.use(this.handleResponse, this.handleError)
  }

  handleRequest(config) {
    const accessToken = ''
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (typeof this.options.beforeRequest === 'function') {
      this.options.beforeRequest(config)
    }

    return config
  }

  handleResponse(response) {
    const data = response.data
    if (data.code !== 200) {
      message.open({
        type: 'error',
        content: data.message,
      })
      return
    }
    return response.data.data // 直接返回数据
  }

  handleError(error) {
    let errorCode, errorMsg
    if (error.response) {
      errorCode = error.response.status // 获取错误代码
      errorMsg = error.message
    } else if (error.request) {
      error.code = error.request.status
      errorMsg = error.message
    } else {
      errorMsg = `错误信息: ${error.message}`
    }

    message.open({
      type: 'error',
      content: errorMsg,
    })

    return Promise.reject(error.response ? error.response.data : error)
  }

  async request(
    url,
    {
      method = 'GET',
      contentType = 'application/json',
      responseType = 'json',
      acceptLanguage = 'zh-CN',
      timeout = this.options.timeout,
      headers = {},
      ...rest
    } = {}
  ) {
    try {
      const requestOptions = {
        url,
        timeout,
        responseType,
        method: method.toUpperCase(),
        headers: {
          'content-type': contentType,
          'Accept-Language': acceptLanguage,
          ...headers,
        },
        ...rest,
      }
      if (rest.baseURL) {
        requestOptions.baseURL = rest.baseURL
      }
      const res = await this.instance.request(requestOptions)
      return res
    } catch (e) {
      return e
    }
  }
}
