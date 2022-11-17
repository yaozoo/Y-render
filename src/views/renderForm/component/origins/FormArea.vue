template
<!--
    * @Author: luyao
    * @Date: 2022-08-22 15:38:47
 * @LastEditTime: 2022-11-17 17:15:01
    * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/origins/FormArea.vue
   -->

<template>
  <div class="wrapper">
    <ul class="form-set">
      <el-divider content-position="left">属性</el-divider>
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
      <el-divider content-position="left">操作区</el-divider>
      <li>
        <span>是否需要操作区域</span>
        <el-radio-group
          style="width: 100px"
          v-model="curSelItem.config.hasHandle"
          size="small">
          <el-radio-button :label="true" />
          <el-radio-button :label="false" />
        </el-radio-group>
      </li>

      <li
        v-if="curSelItem.config.hasHandle"
        v-for="(item, index) in curSelItem?.eventHandle">
        <span>{{ item.eventName }}</span>
        <ol class="opts">
          <li v-if="curSelItem?.eventHandle">
            <div>
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
              <vAceEditor
                style="width: 82%; margin: 1%; display: inline-block"
                v-model:modelValue="item.handle" />
              <el-icon
                @click="
                  () => {
                    curSelItem?.eventHandle.push(
                      JSON.parse(JSON.stringify(item))
                    );
                  }
                "
                color="green"
                title="添加一行"
                ><CirclePlusFilled
              /></el-icon>
              <el-icon
                v-show="curSelItem?.eventHandle.length > 1"
                @click="
                  () => {
                    curSelItem?.eventHandle.splice(index, 1);
                  }
                "
                color="red"
                title="删除一行"
                ><RemoveFilled
              /></el-icon>
            </div>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";
import vAceEditor from "@/components/aceEditor.vue";
let props = defineProps({
  curSelItem: {
    type: Object,
    default: {},
  },
});

let curSelItem = ref(computed(() => props.curSelItem));

function isInline(bol: any) {
  props.curSelItem.config.itemWidth = bol ? "auto" : "100%";
}
</script>
<script lang="ts">
export default defineComponent({
  name: "FormArea",
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
