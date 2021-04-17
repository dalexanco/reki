<template>
  <main class="is-flex is-flex-direction-column is-flex-grow-1">
    <section class="columns is-gapless is-expanded has-background-grey-lighter">
      <div class="column is-flex is-flex-grow-1 is-flex-direction-column has-background-white">
        <div class="header-container">
          <div class="field is-grouped mx-3 mt-3">
            <div class="control">
              <div class="select">
                <select v-model="verbSelectModel">
                  <option v-for="item in verbs" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
            </div>
            <div class="control is-expanded">
              <input class="input" type="text" placeholder="https://www.example.com/path-to..." />
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
        <HttpRawEditor class="is-flex is-flex-grow-1 is-flex-direction-column" v-model="requestRaw" v-on:change="onRequestRawChange" />
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
        <HttpRawEditor class="is-flex is-flex-grow-1 is-flex-direction-column" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HTTP_VERBS } from "../constants";
import Actions from "../store/action-types";
import HttpRawEditor from "../components/HttpRawEditor.vue";

export default defineComponent({
  name: "Request",
  components: {
    HttpRawEditor,
  },
  props: {
    msg: String,
  },
  methods: {
    async clickOnSendButton() {
      this.responseRaw = await window.sendHttpRequest(this.requestRaw);
    },
    onRequestRawChange(rawValue: string) {
      this.$store.dispatch(Actions.ON_REQUEST_RAW_CHANGE, rawValue);
    },
  },
  data() {
    return {
      requestRaw: `POST https://example.com/comments HTTP/1.1
Content-Type: application/xml
Authorization: token xxx

<request>
    <name>sample</name>
    <time>Wed, 21 Oct 2015 18:27:50 GMT</time>
</request>`,
      responseRaw: "",
      verbs: HTTP_VERBS,
      verbSelectModel: HTTP_VERBS[0],
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
