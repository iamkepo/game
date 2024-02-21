'use client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { endPoints, envConstant } from '@/configs';
import { HttpRequestContentType, HttpRequestType } from '@/core';

export const client = axios.create();
let isRefreshing: boolean = false;
let failedQueue: { resolve: (value: string | PromiseLike<string | null> | null) => void; reject: (reason?: any) => void; }[] = []
class Request {   
  public config: any;

  constructor() {
    this.config = {
      baseURL: envConstant.API_BASE_URL,
      headers: {
        'content-type': HttpRequestContentType.APPLICATION_JSON,
      },
    };

    client.interceptors.request.use(this.handleRequest, this.handleRequestError);
    client.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }

  private handleRequest(config: any): any {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(accessToken);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }

  private handleRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  private async handleResponse(response: AxiosResponse): Promise<AxiosResponse> {
    return response;
  }

  private async handleResponseError(error: any) {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry && !error.config.baseURL.includes("login")) {
      
      console.log(isRefreshing);
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      console.log(refreshToken);
      
      if (!refreshToken) {
        window.localStorage.clear()
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await client.post(endPoints.refreshToken, { refreshToken });
        console.log(refreshResponse);
        
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        this.processQueue(null, newAccessToken);
        return client(originalRequest);
      } catch (refreshError) {
        // console.log(refreshError);
        window.localStorage.clear()
        this.processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }

  private processQueue(error: any, token: string | null): void {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  }

  public headersAuthorization(token: string | null) {
    this.config.headers = { ...this.config.headers, "Authorization": token };
    return this;
  }

  public contentType(type: HttpRequestContentType) {
    this.config.headers = { ...this.config.headers, "content-type": type };
    return this;
  }

  public responseType(type: string) {
    this.config.headers = { ...this.config.headers, responseType: type };
  }

  public append(endpoint: string): this {
    this.config.baseURL += endpoint;
    return this;
  }

  public method(method: HttpRequestType): this {
    this.config.method = method;
    return this;
  }

  public params(params: any) {
    this.config.params = params;
    return this;
  }

  public setData(data: any): this {
    this.config.data = data;

    if (this.config.headers["Content-type"] === "application/x-www-form-urlencoded") {
      this.config.data = JSON.stringify(data);
    }

    if (this.config.headers["Content-type"] === HttpRequestContentType.FORM_DATA) {
      const formData = new FormData();
      for (let key in data) {
        const fieldValue = data[key];
        if (Array.isArray(fieldValue)) {
          fieldValue.forEach((x) => {
            if (x) {
              formData.append(`${key}[]`, x);
            } else {
              formData.append(`${key}[]`, "");
            }
          });
        } else {
          if (data[key]) {
            formData.append(key, data[key]);
          } else {
            formData.append(key, "");
          }
        }
      }
      this.config.data = formData;
    }

    return this;
  }

  public async then(callback: (response: AxiosResponse) => void): Promise<void> {
    const response_1 = await client(this.config);
    callback(response_1);
  }

  public catch(callback: (error: AxiosError) => void): void {
    client(this.config)
      .catch((error: AxiosError) => {
        callback(error);
      });
  }
}

export default Request;
