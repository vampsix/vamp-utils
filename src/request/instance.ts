import axios,{AxiosInstance} from "axios";
// import { Router } from 'vue-router';
// import { Store } from 'vuex';
// import qs from 'qs';
// import { RootState } from '@/store/types';
import {
  signRequestInterceptor,
  createErrorResponseInterceptor,
  extractResponseInterceptor,
  createPrincipalCheckInterceptor,
} from './interceptors';

function createRequest(router: Router, store: Store<RootState>): AxiosInstance {
  // console.log(router, '----', store);
  // 创建axios实例
  const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE,
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  
  request.interceptors.response.use(
    extractResponseInterceptor,
    createErrorResponseInterceptor(router)
  );
  // 请求签名拦截
  request.interceptors.request.use(signRequestInterceptor);
  // 创建请求拦截
  request.interceptors.request.use(
    createPrincipalCheckInterceptor(store, router)
  );
  return request;
}

export default createRequest;
