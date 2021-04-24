<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from '../store'
import { HttpRequestMethodModel } from '@/models/HttpRequestMethodModel'

const DEFAULT_METHOD = HttpRequestMethodModel.GET

export default defineComponent({
  name: "RequestInputMethod",
  setup() {
    const store = useStore()
    const availableMethods: string[] = Object.values(HttpRequestMethodModel)
    const selectedMethod = computed(() => store.state.request?.method || DEFAULT_METHOD)

    return {
      availableMethods,
      selectedMethod,
    }
  },
})
</script>

<template>
  <select v-model="selectedMethod">
    <option v-for="item in availableMethods" :key="item" :value="item">{{ item }}</option>
  </select>
</template>
