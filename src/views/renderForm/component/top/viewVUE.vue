<!--
 * @Author: luyao
 * @Date: 2022-08-23 15:11:36
 * @LastEditTime: 2022-11-17 17:15:30
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/top/viewVUE.vue
-->

<template>
  <el-dialog v-model="dialogVisible" title="查看VUE" width="800px">
    <el-button
      style="
        height: 28px;
        margin-bottom: 10px;
        width: 100px;
        position: absolute;
        left: 10px;
      "
      @click="copyText(code)"
      type="success"
      >COPY</el-button
    >
    <!-- @click="copyText(JSON.parse(new Function('return ' + code)()))" -->
    <highlightjs autodetect :code="code" />
  </el-dialog>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { cloneDeep } from "lodash";
import { ElMessage } from "element-plus";

let dialogVisible = ref(false);
defineExpose({ showFun });

let code = ref("");
let widget: any = inject("widget");
function showFun() {
  code.value = "";
  dialogVisible.value = true;
  creatTemp(widget);
}

function creatTemp(val: any) {
  let widgetJson = JSON.stringify(val);

  code.value = `
<template>
  <RenderForm :widget="widget" />
</template>

<script setup lang="ts">
import {  ref } from "vue";
  let widget = ref(${widgetJson});
<\/script>
`;
}
let timer: any | null | undefined = null;
const copyText = (text: any, time = 400) => {
  if (timer) clearInterval(timer);
  timer = setTimeout(async () => {
    let oInput = document.createElement("input") as any; //创建input节点
    // oInput.value = JSON.stringify(text); //给input的value赋值
    oInput.value = text; //给input的value赋值
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
