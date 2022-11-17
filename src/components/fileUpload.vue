<!--
 * @Author: luyao
 * @Date: 2022-01-28 18:31:09
 * @LastEditTime: 2022-11-17 17:13:39
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/fileUpload.vue
-->

<template>
  <!-- multiple -->
  <el-upload
    ref="elFileUpload"
    style="display: inline-block"
    :action="fileUrl()"
    :accept="format.toString()"
    :with-credentials="true"
    :show-file-list="fileListShow"
    :before-upload="beforeUpload"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :on-remove="uploadRemove"
    :disabled="uploading"
    :headers="headers"
    :data="data"
    :multiple="showMultiple"
    :limit="limit"
    :file-list="fileList">
    <el-button size="small" type="primary" :loading="uploading">{{
      text
    }}</el-button>
  </el-upload>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    fileUrl: {
      type: Function || String,
    },
    text: {
      type: String,
      default: "导入",
    },
    // 文件格式
    format: {
      type: Array,
      default: () => ["image/jpg", "image/jpeg", "image/png"],
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    fileList: {
      type: Array,
      default: [],
    },
    fileListShow: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: {},
    },
    limit: {
      type: Number,
      default: 10,
    },
    showMultiple: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["onSuccess"],
  setup(props, context) {
    const state = reactive({});
    const uploading = ref(false);
    const headers = {
      "system-source": "WEB",
      currency: "USD",
      lang: navigator.language,
      "app-id": "0",
    };

    // 上传
    function beforeUpload(file: any) {
      let typeIndex = file.name.lastIndexOf(".");
      let type = file.name.slice(typeIndex + 1, file.name.length);
      console.log("文件类型：", type, " --- 允许上传文件类型：", props.format);
      const isJPG = props.format.includes(type);

      const isLt2M = file.size / 1024 / 1024 < props.maxSize;

      if (!isJPG) {
        ElMessage.error("上传格式错误!");
        return false;
      }
      if (!isLt2M) {
        ElMessage.error(`上传头像图片大小不能超过 ${props.maxSize}MB!`);
        return false;
      }
      uploading.value = true;
      return true;
    }

    // 上传成功
    function uploadSuccess(response: any, file: any, fileList: any) {
      uploading.value = false;
      if (response.code < 0) {
        ElMessage.error(response.msg);
        clearFiles();
      } else {
        let res = fileList.map((item: any) => {
          return {
            ...item.response,
            name: item.name || file.name,
          };
        });
        context.emit("onSuccess", res);
      }
    }

    // 删除
    function uploadRemove(file: any, fileList: any) {
      console.log(file, fileList);
      let res = fileList.map((item: { response: any }) => item.response);
      context.emit("onSuccess", res);
    }
    // 失败
    function uploadError() {
      uploading.value = false;
      clearFiles();
      console.log("失败");
    }
    let elFileUpload: any = ref(null);
    context.expose({ clearFiles });
    function clearFiles() {
      console.log("clearFiles ---");
      elFileUpload.value.clearFiles();
    }

    return {
      ...toRefs(state),
      headers,
      uploading,
      beforeUpload,
      uploadSuccess,
      uploadError,
      uploadRemove,
      elFileUpload,
    };
  },
});
</script>
