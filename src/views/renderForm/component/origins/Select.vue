<!--
 * @Author: luyao
 * @Date: 2022-08-19 16:12:57
 * @LastEditTime: 2022-11-17 17:15:10
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/origins/Select.vue
-->

<template>
  <div class="wrapper">
    <ul class="form-set">
      <li>
        <span>字段名 </span>
        <div><el-input v-model="curSelItem['prop']"></el-input></div>
      </li>
      <li>
        <span>label </span>
        <div><el-input v-model="curSelItem['label']"></el-input></div>
      </li>
      <li>
        <span>placeholder </span>
        <div><el-input v-model="curSelItem['placeholder']"></el-input></div>
      </li>
      <li>
        <span>width </span>
        <el-input v-model="curSelItem['width']"></el-input>
      </li>
      <li>
        <span>允许多选 </span>
        <div>
          <el-radio-group v-model="curSelItem['multiple']" size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
      </li>
      <li>
        <span>选项 </span>
        <div>
          <ol>
            <li
              style="padding: 10px 0"
              v-for="(item, index) in curSelItem.options">
              <el-input
                v-model="item.value"
                style="width: 30%; margin-right: 5%"></el-input>
              <el-input
                v-model="item.key"
                style="width: 30%; margin-right: 5%"></el-input>
              <el-icon
                @click="
                  () => {
                    curSelItem.options.push(JSON.parse(JSON.stringify(item)));
                  }
                "
                color="green"
                title="添加一行"
                ><CirclePlusFilled
              /></el-icon>
              <el-icon
                v-show="curSelItem.options.length > 1"
                @click="
                  () => {
                    curSelItem.options.splice(index, 1);
                  }
                "
                color="red"
                title="删除一行"
                ><RemoveFilled
              /></el-icon>
            </li>
          </ol>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, watch } from "vue";
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";

let Props = defineProps({
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
//   type: "Select",
//   placeholder: "",
//   prop: "",
//   options: [
//     { value: "选项1", key: "给后端传的值1" },
//     { value: "选项2", key: "给后端传的值2" },
//   ],
//   multiple: true,
// };

// watch(
//   () => [Props.curSelItemIndex],
//   (val, oldval) => {
//     Props.state.searchForm[Props.curSelItemIndex] = {
//       ...Props.curSelItem,
//     };
//     console.log(Props.state.searchForm[Props.curSelItemIndex], 9999111);
//   }
// );
</script>
<script lang="ts">
export default defineComponent({
  name: "Select",
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
