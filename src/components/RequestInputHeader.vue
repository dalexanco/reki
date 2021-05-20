<script lang="ts">
import { defineComponent, PropType } from "vue";

import { HttpRequestHeaderModel } from "@/models/HttpRequestHeaderModel";
import { useStore } from '../store'
import mutations from "@/store/mutation-types";

export default defineComponent({
  name: "RequestInputHeader",
  props: {
    header: Object as PropType<HttpRequestHeaderModel>,
  },
  setup(props) {
    const store = useStore()
    const onHeaderChange = (key: 'key' | 'value', value: string) => {
      if (!props.header) return;
      const newHeader = HttpRequestHeaderModel.clone(props.header)
      newHeader[key] = value
      store.commit(mutations.PATCH_REQUEST_HEADER, newHeader);
    }
    return {
      onHeaderChange,
    }
  },
})
</script>

<template>
  <th class="width-30">
    <input @change="onHeaderChange('key', $event.target.value)" :value="header.key" class="input is-small has-text-weight-bold	" type="text" placeholder="Header key" />
  </th>
  <td>
    <input @change="onHeaderChange('value', $event.target.value)" :value="header.value" class="input is-small" type="text" placeholder="Header value" />
  </td>
</template>

