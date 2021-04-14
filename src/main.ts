import { createApp } from 'vue'
import App from './App.vue'
import "./style.scss";

declare global {
  interface Window {
    sendHttpRequest: (requestRaw: string) => Promise<string>;
  }
}

createApp(App).mount('#app')
