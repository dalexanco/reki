import { createApp } from 'vue'
import App from './App.vue'
import "./style.scss";
import { store } from './store'
import { HttpRequestModel } from './models/HttpRequestModel';
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    sendHttpRequest: (request: HttpRequestModel) => Promise<string>;
    parseHttpRequest: (raw: string) => HttpRequestModel;
    ipc: IpcRenderer,
  }
}

createApp(App).use(store).mount('#app')
