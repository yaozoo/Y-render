<!--
 * @Author: your name
 * @Date: 2021-08-26 19:43:30
 * @LastEditTime: 2022-11-17 17:13:16
 * @LastEditors: luyao
 * @Description: In User Settings Edit
 * @FilePath: /y-render/src/components/cardBox.vue
-->

<template>
  <div class="container">
    <el-card class="box-card">
      <template v-slot:header>
        <div class="clearfix">
          <span>{{ title }}</span>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "CardBox",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
