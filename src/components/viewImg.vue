<!--
 * @Author: luyao
 * @Date: 2022-03-08 14:42:17
 * @LastEditTime: 2022-11-17 17:14:02
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/viewImg.vue
-->

<template>
  <div class="demo-image__preview">
    <el-image
      :style="{ width: width, height: height }"
      :src="url"
      :preview-src-list="[url]"
      :initial-index="9999"
      fit="cover"
      :z-index="9999">
    </el-image>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue-demi";

let props = defineProps({
  width: {
    type: String,
    default: "60px",
  },
  height: {
    type: String,
    default: "60px",
  },
  url: String,
});
</script>
