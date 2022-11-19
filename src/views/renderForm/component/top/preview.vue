<!--
 * @Author: luyao
 * @Date: 2022-08-23 15:11:36
 * @LastEditTime: 2022-11-19 15:10:04
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
    <RenderForm :widget="widget" />
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
</script>
