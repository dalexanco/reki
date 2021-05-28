<script lang="ts">
import mutations from "@/store/mutation-types";
import { computed, defineComponent } from "vue";

import { useStore } from '../store'

export default defineComponent({
  name: "RequestInputUrl",
  setup() {
    const store = useStore()
    const requestUrl = computed(() => store.state.request ? store.state.request.url : '')
    const onChangeUrl = (newUrl: string) => {
      store.commit(mutations.PATCH_REQUEST_URL, newUrl);
    }

    return {
      requestUrl,
      onChangeUrl,
    }
  }
})
</script>

<template>
  <input :value="requestUrl" @change="onChangeUrl($event.target.value)" class="input" type="text" placeholder="https://www.example.com/path-to..." />
</template>
