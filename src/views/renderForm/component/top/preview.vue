<!--
 * @Author: luyao
 * @Date: 2022-08-23 15:11:36
 * @LastEditTime: 2022-11-19 18:25:59
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/top/preview.vue
-->

<template>
  <el-drawer
    v-model="dialogVisible"
    title="预览"
    width="100%"
    size="100%"
    :fullscreen="true"
    :destroy-on-close="true"
    @closed="handleClose">
    <RenderForm :widget="widget" :ref="renderFormRef" />
    <el-button @click="viewData"> 查看数据 </el-button>
  </el-drawer>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
let dialogVisible = ref(false);
defineExpose({ showFun });
let widget: any = inject("widget");

function showFun() {
  dialogVisible.value = true;
}
function handleClose() {
  console.log("关闭预览");
}

let renderFormRef: any = ref(null);
function viewData() {
  console.log(widget);
}
</script>
