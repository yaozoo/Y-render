<!--
 * @Author: luyao
 * @Date: 2022-08-19 16:12:57
 * @LastEditTime: 2022-11-17 17:14:59
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/origins/Datetimerange.vue
-->

<template>
  <div class="wrapper">
    <ul class="form-set">
      <li>
        <span>字段名 </span>
        <el-input v-model="curSelItem['prop']"></el-input>
      </li>
      <li>
        <span>label </span>
        <el-input v-model="curSelItem['label']"></el-input>
      </li>
      <li>
        <span>startPlaceholder </span>
        <el-input v-model="curSelItem['startPlaceholder']"></el-input>
      </li>
      <li>
        <span>endPlaceholder </span>
        <el-input v-model="curSelItem['endPlaceholder']"></el-input>
      </li>
      <li>
        <span>placeholder </span>
        <el-input v-model="curSelItem['placeholder']"></el-input>
      </li>
      <li>
        <span>width </span>
        <el-input v-model="curSelItem['width']"></el-input>
      </li>
      <!-- <li>
        <span>defaultTime </span>
        <el-input v-model="curSelItem['defaultTime']"></el-input>
      </li> -->
      <!-- <li>
        <span>disabledDate </span>
        <el-input v-model="curSelItem['disabledDate']"></el-input>
      </li> -->

      <li>
        <span>clearable </span>
        <div>
          <el-radio-group v-model="curSelItem['clearable']" size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
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
  name: "Datetimerange",
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
