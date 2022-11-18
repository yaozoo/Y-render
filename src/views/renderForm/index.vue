<!--
 * @Author: luyao
 * @Date: 2022-08-15 17:40:10
 * @LastEditTime: 2022-11-18 18:26:34
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/index.vue
-->
<template>
  <Top />
  <el-row class="warper">
    <div class="out-box" style="width: 250px"><CompItem /></div>
    <div class="out-box" style="flex: 1">
      <div>
        <Exhibit style="flex: 1" :widget="widget" />
      </div>
    </div>
    <div class="out-box" style="width: 25vw">
      <Setup />
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { defineComponent, provide, reactive, ref } from "vue-demi";
import { useRouter } from "vue-router";
import CompItem from "./component/left/compItem.vue";
import Exhibit from "./component/middle/exhibit.vue";
import Setup from "./component/right/setup.vue";
import Top from "./component/top/index.vue";
let widget: any = reactive([
  {
    key: 40001,
    prop: "",
    type: "FormArea",
    component: "div",
    placeholder: "表单容器",
    width: "100%",
    isBox: true,
    data: {},
    children: [],
    config: {
      allDisabled: false,
      inline: true,
      itemWidth: "auto",
      labelWidth: "80px",
      hasHandle: false,
      hasReset: false,
      hasSearch: false,
    },
    eventHandle: [
      {
        label: "查询",
        type: "primary",
        handle: 'alert("查询");',
      },
      {
        label: "重置",
        type: "",
        handle: ' console.log("重置");',
      },
    ],
  },
]);
provide("widget", widget);
</script>
<script lang="ts">
export default defineComponent({
  name: "RenderForm",
});
</script>
<style lang="less" scoped>
.warper {
  height: calc(~"100vh - 50px");
  background-color: rgb(244, 240, 240);
  display: flex;

  .out-box {
    height: calc(~"100vh - 50px");
    overflow: auto;
  }
}
</style>
