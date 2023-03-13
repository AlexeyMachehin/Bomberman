import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const SERVER_API = 'https://ya-praktikum.tech/api/v2';

const apiAxiosInstance = Axios.create({
  withCredentials: true,
  baseURL: SERVER_API,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
import { AnyObject, AnyArray } from 'immer/dist/types/types-internal';

export type IBasePayload = AnyObject | AnyArray;

export abstract class AxiosService {
  private readonly axios: AxiosInstance = apiAxiosInstance;

  protected constructor() {
    this.axios.interceptors.response.use(undefined, error => {
      return Promise.reject(error);
    });
  }

  public async get<T>(url: string, payload?: AxiosRequestConfig): Promise<T> {
    return await this.axios.get<T>(url, payload).then(result => result.data);
  }

  public async post<Request, Payload extends IBasePayload>(
    url: string,
    payload?: Request
  ): Promise<Payload> {
    return this.axios.post(url, payload);
  }
}
