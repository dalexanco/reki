import { createApp } from 'vue'
import App from './App.vue'
import "./style.scss";
import store from './store'

declare global {
  interface Window {
    sendHttpRequest: (requestRaw: string) => Promise<string>;
  }
}

createApp(App).use(store).mount('#app')
