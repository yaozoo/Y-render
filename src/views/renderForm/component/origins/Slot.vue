<!--
 * @Author: luyao
 * @Date: 2022-08-19 16:12:57
 * @LastEditTime: 2022-12-19 15:39:14
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/origins/Slot.vue
-->

<template>
  <div class="wrapper">
    <ul class="form-set">
      <em
        class="red"
        style="text-align: center; font-size: 12px; width: 100%; display: block"
        >插槽名称必须保持其唯一性</em
      >
      <li>
        <span>插槽名 </span>
        <el-input v-model="curSelItem['slot']"></el-input>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";

const Props = defineProps({
  curSelItem: {
    type: Object,
    default: {},
  },
  curSelItemIndex: {
    type: Number,
    default: -1,
  },
  // state: {
  //   type: Object,
  //   default: {},
  // },
});

// let initData = {
//   type: "Input",
//   placeholder: "",
//   prop: "",
// };

// console.log(Props.state.searchForm[Props.curSelItemIndex], 8888);

// Props.state.searchForm[Props.curSelItemIndex] = {
//   ...Props.curSelItem,
// };
</script>
<script lang="ts">
export default defineComponent({
  name: "Slot",
});
</script>
<style lang="less" scoped>
.wrapper {
  ul.form-set {
    > li {
      width: 100%;
      padding: 5px;
      display: flex;
      align-items: center;
      > span {
        width: 100px;
        display: block;
        text-align: right;
        font-size: 12px;
        color: #555;
        margin-right: 5px;
      }
      > div {
        flex: 1;
      }
    }
  }
}
</style>
