<template>
  <div :style="style"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ace from "brace";

export default defineComponent({
  name: "RequestInputRaw",
  props: {
    modelValue: String,
    lang: { type: String, default: "text" },
    theme: { type: String, default: "github" },
    height: { type: String, default: 'auto' },
    width: { type: String, default: 'auto' },
    options: Object,
  },
  data(): { editor: ace.Editor | null; contentBackup: string | undefined } {
    return {
      editor: null,
      contentBackup: "",
    };
  },
  computed: {
    style(): string {
      return `width: ${this.width}; height: ${this.height};`;
    },
  },
  methods: {
    onEditorResize() {
      this.$nextTick(() => {
        this.editor?.resize();
      });
    },
    editorInit(): void {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/github");
      require("brace/snippets/javascript");
    },
    px(n: string) {
      return /^\d*$/.test(n) ? n + "px" : n;
    },
  },
  watch: {
    modelValue: function (val) {
      if (this.contentBackup !== val) {
        this.editor?.session.setValue(val);
        this.contentBackup = val;
      }
    },
    theme: function (newTheme) {
      this.editor?.setTheme("ace/theme/" + newTheme);
    },
    lang: function (newLang) {
      const newMode = "ace/mode/" + newLang;
      this.editor?.getSession().setMode(newMode);
    },
    options: function (newOption) {
      this.editor?.setOptions(newOption);
    },
    height: {
      handler: "onEditorResize",
      immediate: true,
    },
    width: {
      handler: "onEditorResize",
      immediate: true,
    },
  },
  beforeUnmount() {
    this.editor?.destroy();
    this.editor?.container.remove();
  },
  mounted() {
    var lang = this.lang || "text";
    var theme = this.theme || "chrome";

    require("brace/ext/emmet");

    const editor = ace.edit(this.$el as HTMLElement);
    this.editor = editor;
    editor.$blockScrolling = Infinity;

    // this.$emit("init", editor);
    this.editorInit();

    //editor.setOption("enableEmmet", true);
    const mode = "ace/mode/" + lang;
    editor.getSession().setMode(mode);
    editor.getSession().setUseWorker(false);
    editor.setTheme("ace/theme/" + theme);
    if (this.modelValue) editor.setValue(this.modelValue, 1);
    this.contentBackup = this.modelValue;

    editor.on("change", () => {
      var content = editor.getValue();
      this.$emit('change', content);
      this.contentBackup = content;
    });
    if (this.options) editor.setOptions(this.options);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.full-height {
  flex-grow: 1;
  display: flex;
}
.el-select.input-select .el-input {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.btn-submit {
  width: 100%;
}
.section-url .el-col {
  margin: 0 10px;
}
</style>
