<!--
 * @Author: luyao
 * @Date: 2022-08-23 15:11:36
 * @LastEditTime: 2023-01-31 17:43:02
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/top/viewJSON.vue
-->

<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    title="查看JSON"
    width="800px">
    <el-button
      style="
        height: 28px;
        margin-bottom: 10px;
        width: 100px;
        position: absolute;
        left: 10px;
      "
      type="success"
      @click="copyText(widget)"
      >COPY</el-button
    >
    <highlightjs :code="JSON.stringify(widget, null, 2)" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { cloneDeep } from "lodash";
import { ElMessage } from "element-plus";
let widget: any = inject("widget");

let dialogVisible = ref(false);
defineExpose({ showFun });

function showFun() {
  dialogVisible.value = true;
}
let timer: any | null | undefined = null;
const copyText = (text: any, time = 400) => {
  if (timer) clearInterval(timer);
  timer = setTimeout(async () => {
    let oInput = document.createElement("input") as any; //创建input节点
    oInput.value = JSON.stringify(text); //给input的value赋值
    // oInput.value = text; //给input的value赋值
    document.body.appendChild(oInput); //向页面插入input节点
    oInput.select(); // 选中input
    try {
      await document.execCommand("Copy"); // 执行浏览器复制命令
      ElMessage.success("复制成功");
    } catch {
      ElMessage.error("复制失败");
    } finally {
      document.body.removeChild(oInput);
      oInput = null;
    }
    timer = null;
  }, time);
};
</script>
