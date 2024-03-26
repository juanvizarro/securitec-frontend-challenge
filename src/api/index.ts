import axios, { type AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { generateToken, getToken } from '@/helpers/session.helper'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const injectToken = async (config: InternalAxiosRequestConfig) => {
  try {
    let token = getToken()
    if(!token) {
      // generate token with default test credentials
      token = await generateToken()
    }

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error: any) {
    throw new Error(error)
  }
}

class Api {
  private instance: AxiosInstance | null = null

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp()
  }

  initHttp() {
    const http = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    })

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error))

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error
        return this.handleError(response)
      }
    )

    this.instance = http
    return http
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: any|undefined) {
    if(!error) return
    console.log('handle error:', error)
    const { status } = error;

    switch (status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      break
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break
    }
    }

    return Promise.reject(error)
  }
}

export const api = new Api()
