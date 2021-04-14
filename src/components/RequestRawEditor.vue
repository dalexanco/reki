<template>
  <AceEditor
    class="request-raw-editor"
    :model="content"
    @init="editorInit"
    lang="javascript"
    theme="github"
    width="100%"
    height="auto"
    :options="{
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 12,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
      showPrintMargin: false,
      showGutter: true,
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AceEditor from "./AceEditor.vue";

export default defineComponent({
  name: "RequestRawEditor",
  components: {
    AceEditor,
  },
  props: {
    content: String,
  },
  methods: {
    editorInit(): void {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/github");
      require("brace/snippets/javascript");
    },
  },
});
</script>

<style scoped></style>
