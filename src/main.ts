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

const app = createApp(App)
app.use(store)
app.mount('#app')
