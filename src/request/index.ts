// import { App } from 'vue';
// import router from '@/router';
// import store from '@/store';
import createRequest from './instance';

const request = createRequest(router, store);

export function installApi(app: App): void {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$api = request;
}

export default request;
