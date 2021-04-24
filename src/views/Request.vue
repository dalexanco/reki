<script lang="ts">
import { computed, defineComponent } from "vue";
import throttle from "lodash/throttle";

import { useStore } from '../store'
import Actions from "../store/action-types";
import RequestInputRaw from "../components/RequestInputRaw.vue";
import RequestInputUrl from "../components/RequestInputUrl.vue";
import RequestInputMethod from "../components/RequestInputMethod.vue";

export default defineComponent({
  name: "Request",
  components: {
    RequestInputRaw,
    RequestInputUrl,
    RequestInputMethod,
  },
  props: {
    msg: String,
  },
  setup() {
    const store = useStore()
    const request = computed(() => store.state.request)
    const requestRaw = computed(() => store.state.request ? store.state.request.raw : '')
    const onRequestRawChange = throttle((rawValue: string) => {
      store.dispatch(Actions.ON_REQUEST_RAW_CHANGE, rawValue);
    }, 250)

    return {
      onRequestRawChange,
      request,
      requestRaw,
      initRequest: () => {
        store.dispatch(Actions.ON_REQUEST_RAW_CHANGE, `POST https://reqbin.com/echo/post/json HTTP/1.1
Content-Type: application/xml
Authorization: token xxx

<request>
    <name>sample</name>
    <time>Wed, 21 Oct 2015 18:27:50 GMT</time>
</request>`)
      }
    }
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
        <div class="tabs is-small is-centered mb-0">
          <ul>
            <li class="is-active"><a>Raw</a></li>
            <li><a>URL/Params</a></li>
            <li><a>Headers</a></li>
            <li><a>Body</a></li>
          </ul>
        </div>
        <RequestInputRaw class="is-flex is-flex-grow-1 is-flex-direction-column" v-model="requestRaw" v-on:change="onRequestRawChange" />
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
          <button @click="initRequest">test</button>
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
