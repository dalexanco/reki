import { createApp } from 'vue'
import App from './App.vue'
import "./style.scss";
import { store } from './store'
import { HttpRequestModel } from './models/HttpRequestModel';
import { IpcRenderer } from 'electron';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGripLines, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGripLines, faMinusSquare)
declare global {
  interface Window {
    sendHttpRequest: (request: HttpRequestModel) => Promise<string>;
    parseHttpRequest: (raw: string) => HttpRequestModel;
    ipc: IpcRenderer,
  }
}

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.mount('#app')
