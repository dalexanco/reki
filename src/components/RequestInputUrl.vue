<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from '../store'

export default defineComponent({
  name: "RequestInputUrl",
  setup() {
    const store = useStore()
    const requestUrl = computed(() => store.state.request ? store.state.request.url : '')

    return {
      requestUrl,
    }
  }
})
</script>

<template>
  <input v-model="requestUrl" class="input" type="text" placeholder="https://www.example.com/path-to..." />
</template>
