template
<!--
    * @Author: luyao
    * @Date: 2022-08-22 15:38:47
 * @LastEditTime: 2023-02-01 17:50:43
    * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/origins/CardArea.vue
   -->

<template>
  <div class="wrapper">
    <!-- {{ curSelItem }} -->
    <ul class="form-set">
      <el-divider content-position="left">属性</el-divider>
      <li>
        <span> 是否需要卡片头 </span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.hasCardHeader"
          size="small">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>
      <li>
        <span>卡片名称 </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.cardName"
          size="small"></el-input>
      </li>
      <li>
        <span>卡片头部slot </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.cardHeaderSlot"
          size="small"></el-input>
      </li>
      <li>
        <span> inline </span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.inline"
          size="small"
          @change="isInline(curSelItem.config.inline)">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>
      <li>
        <span>itemWidth </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.itemWidth"
          size="small"></el-input>
      </li>
      <li>
        <span>labelWidth </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.labelWidth"
          size="small"></el-input>
      </li>
      <li>
        <span>是否禁用 </span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.allDisabled"
          size="small">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>
      <!-- <li>
        <span> inline </span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.inline"
          size="small"
          @change="isInline(curSelItem.config.inline)">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>
      <li>
        <span>itemWidth </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.itemWidth"
          size="small"></el-input>
      </li>
      <li>
        <span>labelWidth </span>
        <el-input
          style="width: 100px"
          v-model="curSelItem.config.labelWidth"
          size="small"></el-input>
      </li>
      <li>
        <span>是否禁用 </span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.allDisabled"
          size="small">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li> -->
      <!-- <el-divider content-position="left">操作区</el-divider>
      <li>
        <span>是否需要操作区域</span>
        <el-radio-group
          style="width: 100px"
          v-model="state.config.isHandle"
          size="small">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>
      <li v-if="state.config.isHandle">
        <span>按钮配置</span>
        <ol class="opts">
          <li
            v-if="state.searchHandle"
            v-for="(item, index) in state.searchHandle">
            <el-input
              v-model="item.label"
              placeholder="按钮名称"
              style="width: 40%; margin: 1%"></el-input>
            <el-select
              style="width: 40%; margin: 1%"
              v-model="item.type"
              placeholder="按钮类型">
              <el-option key="default" label="default" value="default" />
              <el-option key="primary" label="primary" value="primary" />
              <el-option key="success" label="success" value="success" />
              <el-option key="info" label="info" value="info" />
              <el-option key="warning" label="warning" value="warning" />
              <el-option key="danger" label="danger" value="danger" />
            </el-select>
            <br />

            <el-input
              v-model="item.handle"
              type="textarea"
              autosize
              placeholder="按钮执行函数"
              style="width: 82%; margin: 1%"></el-input>

            <el-icon
              @click="
                () => {
                  state.searchHandle.push(JSON.parse(JSON.stringify(item)));
                }
              "
              color="green"
              title="添加一行"
              ><CirclePlusFilled
            /></el-icon>
            <el-icon
              v-show="state.searchHandle.length > 1"
              @click="
                () => {
                  state.searchHandle.splice(index, 1);
                }
              "
              color="red"
              title="删除一行"
              ><RemoveFilled
            /></el-icon>
          </li>
        </ol> 
    </li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";

let props = defineProps({
  curSelItem: {
    type: Object,
    default: {},
  },
});

let curSelItem = ref(computed(() => props.curSelItem));

function isInline(bol: any) {
  //   props.curSelItem.itemWidth = bol ? "auto" : "100%";
}
</script>
<script lang="ts">
export default defineComponent({
  name: "CardArea",
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
      > .opts {
        flex: 1;
        li {
          border: 1px solid #eee;
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
