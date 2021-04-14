<template>
  <div id="app">
    <div id="app-topbar"></div>
    <Request  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Request from './components/Request.vue';

export default defineComponent({
  name: 'App',
  components: {
    Request
  }
});
</script>

<style lang="scss">
@import "@/style.scss";

html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
// #app-topbar {
//   display: flex;
//   width: 100%;
//   height: 20px;
// }
</style>
