<!--
 * @Author: luyao
 * @Date: 2022-08-08 15:41:26
 * @LastEditTime: 2022-11-17 17:12:26
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsDialog/index.vue
-->
<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="title"
    :width="width"
    :show-close="showClose"
    :destroy-on-close="destroyOnClose"
    :close-on-click-modal="closeOnClickModal">
    <slot name="default" />
    <template #footer v-if="!footerHide">
      <span class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
        <el-button type="primary" @click="ok">{{ okText }}</el-button>
      </span>
    </template>
    <slot name="footer" v-if="footerHide" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";

let props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "tips",
  },
  width: {
    type: String,
    default: "600px",
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  footerHide: {
    type: Boolean,
    default: false,
  },
  okText: {
    type: String,
    default: "确认",
  },
});

let { title, width, okText, footerHide }: any = toRefs(props);

let emit = defineEmits(["cancel", "ok", "update:dialogVisible"]);

function cancel() {
  emit("cancel");
  emit("update:dialogVisible", false);
  //   dialogVisible.value = false;
}

function ok() {
  emit("ok");
  emit("update:dialogVisible", false);
  //   dialogVisible.value = false;
}
</script>
<style lang="less" scoped></style>
