<template>
  <div id="app-topbar"></div>
  <Request  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Request from './views/Request.vue';

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
</style>
