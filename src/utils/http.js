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
    if (data instanceof Blob) {
      return response
    } else if (data.code === '0000') {
      return data.data
    } else {
      message.open({
        type: 'error',
        content: data.message || 'Server Error',
      })
      return Promise.reject(data)
    }
  }

  handleError(error) {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
    }
    message.open({
      type: 'error',
      content: error?.response?.data?.message || 'Server Error',
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
    return this.instance.request(requestOptions)
  }
}
