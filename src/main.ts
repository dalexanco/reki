import { createApp } from 'vue'
import App from './App.vue'
import "./style.scss";
import { store } from './store'
import { HttpRequestModel } from './parser/HttpRequestModel';

declare global {
  interface Window {
    sendHttpRequest: (request: HttpRequestModel) => Promise<string>;
    parseHttpRequest: (raw: string) => HttpRequestModel;
  }
}

createApp(App).use(store).mount('#app')
