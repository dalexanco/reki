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
  <td class="header-action-drag">
    <p class="button is-dark is-inverted">
      <font-awesome-icon icon="grip-lines" />
    </p>
  </td>
  <td class="header-key">
    <input @change="onHeaderChange('key', $event.target.value)" :value="header.key" class="input is-small has-text-weight-bold" type="text" placeholder="Header key" />
  </td>
  <td class="header-value">
    <input @change="onHeaderChange('value', $event.target.value)" :value="header.value" class="input is-small" type="text" placeholder="Header value" />
  </td>
  <td class="header-action-drag">
    <p class="button is-dark is-inverted">
      <font-awesome-icon icon="minus-square" />
    </p>
  </td>
</template>

<style lang="scss" scoped>
.table {
  td.header-action-drag, td.header-key, td.header-value, td.header-action-delete {
    padding: 0;
    & input {
      box-shadow: none;
      border: none;
      margin: 0;
      padding-left: 0;
      height: 100%;
    }
  }
  td.header-action-drag .button {
    border-radius: 0;
  }
  td.header-key {
    width: 35%;
  }
}
</style>
