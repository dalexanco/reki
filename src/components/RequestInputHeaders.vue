<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from '../store'
import RequestInputHeader from './RequestInputHeader.vue'
// import { HttpRequestMethodModel } from '@/models/HttpRequestMethodModel'

export default defineComponent({
  name: "RequestInputHeaders",
  components: {
    RequestInputHeader,
  },
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
        <tr v-for="header in headers" :key="header.id">
          <RequestInputHeader v-bind:header="header" />
          <!-- <th class="width-30">
            <input class="input is-small has-text-weight-bold	" type="text" placeholder="Header key" :value="header.key" />
          </th>
          <td>
            <input class="input is-small" type="text" placeholder="Header value" :value="header.value" />
          </td> -->
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
