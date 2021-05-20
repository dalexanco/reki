<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from '../store'
import { HttpRequestMethodModel } from '../models/HttpRequestMethodModel'
import mutations from "../store/mutation-types";

const DEFAULT_METHOD = HttpRequestMethodModel.GET

export default defineComponent({
  name: "RequestInputMethod",
  setup() {
    const store = useStore()
    const availableMethods: string[] = Object.values(HttpRequestMethodModel)
    const selectedMethod = computed(() => store.state.request?.method || DEFAULT_METHOD)
    const onMethodChange = (newMethod: string) => {
      const safeMethod = newMethod as keyof typeof HttpRequestMethodModel
      store.commit(mutations.PATCH_REQUEST_METHOD, HttpRequestMethodModel[safeMethod])
    };

    return {
      availableMethods,
      onMethodChange,
      selectedMethod,
    }
  },
})
</script>

<template>
  <select @change="onMethodChange($event.target.value)">
    <option v-for="item in availableMethods" :key="item" :value="item" :selected="selectedMethod == item">{{ item }}</option>
  </select>
</template>
