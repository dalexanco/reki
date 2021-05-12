<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface TabEntry {
  key: string;
  label: string;
}

// eslint-disable-next-line no-unused-vars
type OnChangeCallback = (a: string) => void

export default defineComponent({
  name: "RequestInputUrl",
  props: {
    tabs: { type: Array as PropType<Array<TabEntry>>, default: () => [] },
    active: String,
    onChange: Function as PropType<OnChangeCallback>,
  },
  setup(props) {
    const select = (targetKey: string) => {
      const tab = props.tabs.find(({ key }) => key == targetKey)
      if (tab && props.onChange) props.onChange(tab.key)
    }

    return {
      select,
    }
  }
})
</script>

<template>
  <div class="tabs is-small is-centered mb-0">
    <ul>
      <li v-for="tab in tabs" v-bind:class="{ ['is-active']: active == tab.key }" v-bind:key="tab.key" @click="select(tab.key)">
        <a>{{tab.label}}</a>
      </li>
    </ul>
  </div>
</template>
