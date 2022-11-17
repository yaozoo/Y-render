<!--
 * @Author: luyao
 * @Date: 2022-05-31 20:00:47
 * @LastEditTime: 2022-05-31 20:10:11
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /dmd-pc/src/components/dbsCard.vue
-->
<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <p slot="title" style="font-weight: 600">{{ props.title }}</p>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<script setup lang="ts">
let props = defineProps({
  title: {
    type: String,
  },
});
</script>
<style lang="less">
.card {
  margin-bottom: 10px;
}
</style>
