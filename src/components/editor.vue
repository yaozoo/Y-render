<template>
  <div class="editor-box">
    <textarea :id="id" name="ckeditor"></textarea>
  </div>
</template>
<script lang="ts">
import { API } from "@/api";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

export default defineComponent({
  name: "Ckeditor",
  props: {
    height: {
      type: String,
      default: "300px",
    },
    width: {
      type: String,
      default: "100%",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    langDirection: {
      type: String,
      default: "ltr",
    },
    uploadUrl: {
      type: String,
    },
  },

  setup(props, { emit }) {
    let ckeditor: any;
    let value = ref(props.value);
    let id = ref(`Ckeditor${parseInt(Math.random() * 10000).toString()}`);

    let editorConfig = reactive({
      removePlugins: ["about"],
      removeDialogTabs: "image:advanced;image:Link", //隐藏超链接与高级选项
      image_previewText: " ", //预览区域显示内容
      //extraPlugins: 'button,panelbutton,colorbutton',//增加字体和背景颜色
      //extraPlugins: [ MyCustomUploadAdapterPlugin ],
      // 该插件使用<div>元素（而不是传统的<iframe>元素）作为主题编辑器中的可编辑区域
      // extraPlugins: "divarea",
      extraPlugins: "uploadimage",
      // 是否强制复制来的内容去除格式 plugins/pastetext/plugin.js
      forcePasteAsPlainText: false, //不去除
      // 去除内容过滤
      allowedContent: true,
      // 折叠工具栏
      toolbarCanCollapse: false,
      // 只读模式
      readOnly: props.disabled,
      // filebrowserUploadUrl: API.uploadFileDMM(),
      filebrowserUploadUrl: props.uploadUrl || API.uploadFileDMM(),
      fileTools_requestHeaders: {
        // "X-Requested-With": "XMLHttpRequest",
        token: "7777777!",
      },
      language: "zh-cn",
      contentsLangDirection: props.langDirection,
      height: props.height,
      width: props.width,
    });

    onMounted(() => {
      ckeditor = (window as any).CKEDITOR.replace(id.value, editorConfig);
      ckeditor.setData(value.value);
      ckeditor.on("change", () => {
        emit("onchange", ckeditor.getData());
      });
      // 携带cookies
      ckeditor.on(
        "fileUploadRequest",
        (evt: { data: { fileLoader: { xhr: any } } }) => {
          var xhr = evt.data.fileLoader.xhr;
          xhr.withCredentials = true;
        }
      );
    });

    watch(value, () => {
      if (value.value !== ckeditor.getData()) {
        ckeditor.setData(value.value);
      }
    });

    onBeforeUnmount(() => {
      ckeditor.destroy();
    });

    return {
      id,
    };
  },
});
</script>

<style lang="less" scoped>
.editor-box {
  :deep(#cke_1_top) {
    #cke_1_toolbox .cke_toolbar_break {
      display: none;
    }
  }
}
</style>
