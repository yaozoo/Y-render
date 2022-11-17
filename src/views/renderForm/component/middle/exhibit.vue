<!--
 * @Author: luyao
 * @Date: 2022-08-15 17:40:10
 * @LastEditTime: 2022-11-17 17:14:53
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/middle/exhibit.vue
-->

<template>
  <div class="exhibit">
    <el-divider>展示</el-divider>
    <ul class="out-container">
      <li v-for="(widgetItem, widgetIndex) in widget">
        <Areas :widgetItem="widgetItem" v-model:state="state" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, inject, reactive, ref } from "vue-demi";
import Areas from "./components/areas.vue";
let widget: any = inject("widget");
//  其他信息
let state = reactive({
  actItemUUid: -1,
});
</script>
<script lang="ts">
export default defineComponent({
  name: "Exhibit",
});
</script>
<style lang="less" scoped>
.exhibit {
  background-color: white;
  padding: 10px;
  margin: 10px;
}
.out-container > li {
  :deep(.box:first-child) {
    > .tip {
      display: none;
    }
  }
}
</style>
