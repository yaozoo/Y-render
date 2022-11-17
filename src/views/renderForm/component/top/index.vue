<!--
 * @Author: luyao
 * @Date: 2022-10-08 15:37:13
 * @LastEditTime: 2022-11-17 17:15:22
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/top/index.vue
-->

<template>
  <div class="layout">
    <el-button type="success" @click="preview">预览</el-button>
    <el-button type="primary" @click="viewJSON">查看JSON</el-button>
    <el-button type="primary" @click="viewVUE">查看VUE</el-button>
    <el-button type="danger" @click="refreshClear">刷新清空数据</el-button>
  </div>
  <ViewJSON ref="viewJSONRef" />
  <ViewVUE ref="viewVUERef" />
  <Preview ref="PreviewRef" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue-demi";
import { useRouter } from "vue-router";

const ViewJSON = defineAsyncComponent(() => import("./viewJSON.vue"));
const ViewVUE = defineAsyncComponent(() => import("./viewVUE.vue"));
let Preview = defineAsyncComponent(() => import("./preview.vue"));
let router = useRouter();

function refreshClear() {
  router.go(0);
}

let viewJSONRef: any = ref(null);
function viewJSON() {
  viewJSONRef.value.showFun();
}
let viewVUERef: any = ref(null);
function viewVUE() {
  viewVUERef.value.showFun();
}

let PreviewRef: any = ref(null);
function preview() {
  PreviewRef.value.showFun();
}
</script>
<style lang="less" scoped>
.layout {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
}
</style>
