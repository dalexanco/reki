<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { useStore } from '../store'
import RequestInputHeaders from "../components/RequestInputHeaders.vue";
import RequestInputMethod from "../components/RequestInputMethod.vue";
import RequestInputRaw from "../components/RequestInputRaw.vue";
import RequestInputUrl from "../components/RequestInputUrl.vue";
import TabBar from "../components/TabBar.vue";

const TabKeys = {
  RAW: 'raw',
  PARAMS: 'params',
  HEADERS: 'headers',
  BODY: 'body',
}

export default defineComponent({
  name: "Request",
  components: {
    RequestInputHeaders,
    RequestInputMethod,
    RequestInputRaw,
    RequestInputUrl,
    TabBar,
  },
  props: {
    msg: String,
  },
  setup() {
    const store = useStore()
    const request = computed(() => store.state.request)
    const requestRaw = computed(() => store.getters.requestRaw)

    const requestTabs = [
      { key: TabKeys.RAW, label: 'Raw' },
      { key: TabKeys.PARAMS, label: 'URL/Params' },
      { key: TabKeys.HEADERS, label: 'Headers' },
      { key: TabKeys.BODY, label: 'Body' },
    ]
    const requestTabsActive = ref(requestTabs[0].key)
    const onRequestTabChange = (key: string) => {
      requestTabsActive.value = key;
    }

    return {
      TabKeys,
      request,
      requestRaw,
      requestTabs,
      requestTabsActive,
      onRequestTabChange,
    };
  },
  methods: {
    async clickOnSendButton() {
      if (this.request !== undefined) {
        this.responseRaw = await window.sendHttpRequest(this.request);
      }
    },
  },
  data() {
    return {
      responseRaw: "",
      urlInputModel: "",
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-container {
  min-height: 44px;
  @media (min-width: $tablet) {
    min-height: 60px;
  }
}
.textarea-editor-header {
  display: flex;
  align-items: center;
  padding-left: $column-gap;
  padding-right: $column-gap;
  & > span {
    margin-right: $column-gap;
  }
}
.req-res-separator {
  min-width: 2px;
  min-height: 2px;
}

.columns.is-expanded {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (min-width: $tablet) {
    flex-direction: row;
  }
  // @apply is-flex is-flex-grow-1 is-flex-direction-column;
}
</style>
<template>
  <main class="is-flex is-flex-direction-column is-flex-grow-1">
    <section class="columns is-gapless is-expanded has-background-grey-lighter">
      <div class="column is-flex is-flex-grow-1 is-flex-direction-column has-background-white">
        <div class="header-container">
          <div class="field is-grouped mx-3 mt-3">
            <div class="control">
              <div class="select">
                <RequestInputMethod />
              </div>
            </div>
            <div class="control is-expanded">
              <RequestInputUrl />
            </div>
            <div class="control">
              <a @click="clickOnSendButton" class="button is-primary">Envoyer</a>
            </div>
          </div>
        </div>
        <TabBar v-bind:tabs="requestTabs" v-bind:active="requestTabsActive" v-bind:onChange="onRequestTabChange" />
        <RequestInputRaw v-if="requestTabsActive == TabKeys.RAW" class="is-flex is-flex-grow-1 is-flex-direction-column" v-bind:request="requestRaw" />
        <RequestInputHeaders v-if="requestTabsActive == TabKeys.HEADERS" />
      </div>
      <div class="column req-res-separator mx-0 is-flex-grow-0"></div>
      <div class="column is-flex is-flex-grow-1 is-flex-direction-column has-background-white">
        <div class="level header-container textarea-editor-header is-right mb-0">
          <div class="level-left">
            <div class="level-item tags has-addons">
              <span class="tag is-dark">2 874 ko</span>
              <span class="tag is-light">23 seconds</span>
            </div>
          </div>
          <div class="level-right mt-0">
            <div class="level-item">
              <span class="tag is-light is-success">Status 200 OK</span>
            </div>
          </div>
        </div>
        <div class="tabs is-small is-centered mb-0">
          <ul>
            <li class="is-active"><a>Raw</a></li>
            <li><a>Headers</a></li>
            <li><a>Body (json)</a></li>
          </ul>
        </div>
        <RequestInputRaw class="is-flex is-flex-grow-1 is-flex-direction-column" />
      </div>
    </section>
  </main>
</template>
