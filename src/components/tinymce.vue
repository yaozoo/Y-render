<template>
  <editor v-model="editorValue" :init="init" :disabled="disabled"></editor>
</template>

<script setup>
import { reactive, ref, watch, toRefs, computed, inject } from "vue";
// import tinymce from "tinymce/tinymce.js";
let tinymce = inject("tinymce");
import { API } from "@/api";
// 外觀
import "tinymce/skins/content/default/content.css";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/themes/silver";
// Icon
import "tinymce/icons/default";

// 用到的外掛
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis.js";
import "tinymce/plugins/table";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/image";
import "tinymce/plugins/preview";
import "tinymce/plugins/table";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";

// 語言包
import "tinymce-i18n/langs5/zh_CN.js";
// import 'tinymce-i18n/langs/zh_Hans.js' (TinyMCE 6 的簡體中文)
// TinyMCE-Vue
import Editor from "@tinymce/tinymce-vue";

const props = defineProps({
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
});

const emit = defineEmits(["update:value", "onchange"]);
const init = reactive({
  selector: "textarea", // change this value according to your HTML
  height: props.height,
  width: props.width,
  menubar: false,
  inline: props.disabled,
  language: "zh_CN",
  branding: false,
  style_formats_autohide: true, //（隐藏当前不可用的样式列表）
  plugins: "emoticons table link image preview code image lists",
  toolbar:
    "undo redo | fontsize blocks | fontsizeselect | fontselect " +
    "bold italic strikethrough underline forecolor lineheight | align |lists " +
    "bullist numlist outdent indent | " +
    "table | codesample code|" +
    "fullscreen  preview |" +
    "insertfile image template link codesample |" +
    "emoticons removeformat",
  fontsize_formats: "12px 14px 16px 18px 20px 24px 30px 36px 40px 48px",
  font_formats:
    "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
  extended_valid_elements: "script[src|async|defer|type|charset], style ",
  custom_elements: "style, script",
  relative_urls: false,
  file_picker_types: "image",
  image_advtab: true,
  image_uploadtab: true,
  images_reuse_filename: true,
  images_upload_handler: example_image_upload_handler,
});

const editorValue = ref(props.value);
watch(editorValue, (newValue) => {
  emit("update:value", newValue);
  // emit("onchange", newValue);
});

function example_image_upload_handler(blobInfo, success, failure) {
  var xhr, formData;
  xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("POST", props.uploadUrl || API.uploadFileDMM());
  xhr.onload = function () {
    var json;
    if (xhr.status != 200) {
      failure("HTTP Error: " + xhr.status);
      return;
    }
    json = JSON.parse(xhr.responseText);
    if (!json || typeof json.url != "string") {
      failure("Invalid JSON: " + xhr.responseText);
      return;
    }
    success(json.url);
  };
  formData = new FormData();
  formData.append("upload", blobInfo.blob(), blobInfo.filename());
  xhr.send(formData);
}
</script>
