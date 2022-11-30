import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 请求拦截器
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const { needLoadingBar = false } = config
    if (needLoadingBar) {
      NProgress.start()
    }
    config.params = {
      // realIP: '116.25.146.177',
      timerstamp: Date.parse(new Date().toString()) / 1000,
      ...config.params,
    }
    return config
  },
  error => {
    return error
  },
)
// 响应拦截器
axios.interceptors.response.use(res => {
  NProgress.done()
  return res
})

interface ResType<T> {
  [propsName: string]: any
  code: number
  data?: any
  msg?: string
  err?: string
}
interface Service {
  get<T>(url: string, params?: unknown, options?: AxiosRequestConfig<string> | undefined): Promise<ResType<T>>
  post<T>(url: string, params?: unknown, options?: AxiosRequestConfig<string> | undefined): Promise<ResType<T>>
  upload<T>(url: string, params: unknown, options?: AxiosRequestConfig<string> | undefined): Promise<ResType<T>>
  download(url: string, options?: AxiosRequestConfig<string> | undefined): void
}

const service: Service = {
  get(url, params, options) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params,  ...options})
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  },
  post(url, params, options) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params), options)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default service
