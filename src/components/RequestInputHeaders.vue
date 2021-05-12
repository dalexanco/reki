<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from '../store'
// import { HttpRequestMethodModel } from '@/models/HttpRequestMethodModel'

export default defineComponent({
  name: "RequestInputMethod",
  setup() {
    const store = useStore()
    const headers = computed(() => store.state?.request?.headers || [])

    return {
      headers
    }
  },
})
</script>

<template>
  <div class="wrapper-scroll-overflow">
    <table class="table is-fullwidth is-size-7">
      <tbody>
        <tr v-for="header in headers" :key="header[0]">
          <th class="width-30">
            <input class="input is-small has-text-weight-bold	" type="text" placeholder="Header key" :value="header[0]" />
          </th>
          <td>
            <input class="input is-small" type="text" placeholder="Header value" :value="header[1]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.wrapper-scroll-overflow {
  height: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.width-30 {
  width: 30%;
}
</style>
