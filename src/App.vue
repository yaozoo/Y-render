<!--
 * @Author: luyao
 * @Date: 2022-11-17 15:47:12
 * @LastEditTime: 2022-11-17 16:52:50
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/App.vue
-->

<template>
  <el-config-provider :locale="zhCn">
    <router-view>
      <renderForm />
    </router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { provide } from "vue";
import eventBus from "./utils/eventBus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import renderForm from "./views/renderForm/index.vue";
provide("eventBus", eventBus);
</script>
