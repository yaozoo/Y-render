<!--
 * @Author: luyao
 * @Date: 2022-08-23 15:11:36
 * @LastEditTime: 2022-11-17 17:15:24
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/top/preview.vue
-->

<template>
  <el-drawer
    v-model="dialogVisible"
    title="预览"
    :fullscreen="true"
    width="100%"
    size="100%">
    <!-- {{ widget }} -->
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
</script>
