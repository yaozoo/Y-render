<!--
 * @Author: luyao
 * @Date: 2022-08-19 16:12:57
 * @LastEditTime: 2022-11-19 15:11:45
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/origins/Table.vue
-->

<template>
  <div class="wrapper">
    <ul class="form-set">
      <!-- <li>
        <span>字段名 </span>
        <div><el-input v-model="curSelItem['prop']"></el-input></div>
      </li> -->
      <li>
        <span>是否需要序号列 </span>
        <div>
          <el-radio-group v-model="curSelItem['index']" size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
      </li>
      <li>
        <span>是否需要多选 </span>
        <div>
          <el-radio-group v-model="curSelItem['selection']" size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
      </li>
      <li>
        <span>是否需要分页 </span>
        <div>
          <el-radio-group v-model="curSelItem['needPage']" size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
      </li>
      <li v-if="!!curSelItem['needPage']">
        <span>每页条数</span>
        <div>
          <el-select v-model="curSelItem['pageSize']">
            <el-option label="10条/每页" :value="10" />
            <el-option label="20条/每页" :value="20" />
            <el-option label="30条/每页" :value="30" />
            <el-option label="50条/每页" :value="50" />
            <el-option label="100条/每页" :value="100" />
          </el-select>
        </div>
      </li>
      <!--  v-if="!!curSelItem['needPage']" -->
      <li v-for="(item, index) in curSelItem?.eventHandle">
        <span> {{ item.eventName }} ({{ item.label }})</span>
        <ol class="opts">
          <li v-if="curSelItem?.eventHandle">
            <div>
              <vAceEditor
                style="width: 100%; display: inline-block"
                v-model:modelValue="item.handle" />
            </div>
          </li>
        </ol>
      </li>
      <li>
        <span>高度自适应 </span>
        <div>
          <el-radio-group
            @change="hasAutoHeight(curSelItem['autoHeight'])"
            v-model="curSelItem['autoHeight']"
            size="small">
            <el-radio-button :label="true" />
            <el-radio-button :label="false" />
          </el-radio-group>
        </div>
      </li>
      <li v-if="!curSelItem['autoHeight']">
        <!-- <span>最大高度 </span>
        <div>
          <el-input v-model="curSelItem['tableMaxHeight']" size="small" />
        </div>
        <br /> -->
        <span>高度 </span>
        <div>
          <el-input v-model="curSelItem['tableHeight']" size="small" />
        </div>
      </li>

      <li>
        <span>列属性 </span>
        <div>
          <ol>
            <li
              style="padding: 10px 0"
              v-for="(item, index) in curSelItem.columns">
              <el-input
                v-model="item.title"
                placeholder="属性名"
                style="width: 35%; margin-right: 5%"></el-input>
              <el-input
                v-model="item.key"
                placeholder="属性值"
                style="width: 35%; margin-right: 5%"></el-input>
              <el-input
                v-model="item.width"
                placeholder="宽度"
                style="
                  width: 35%;
                  margin-right: 5%;
                  margin-top: 2px;
                "></el-input>
              <el-input
                v-model="item.minWidth"
                placeholder="最小宽度"
                style="
                  width: 35%;
                  margin-right: 5%;
                  margin-top: 2px;
                "></el-input>
              <el-icon
                @click="
                  () => {
                    curSelItem.columns.push(JSON.parse(JSON.stringify(item)));
                  }
                "
                color="green"
                title="添加一行"
                ><CirclePlusFilled
              /></el-icon>
              <el-icon
                v-show="curSelItem.columns.length > 1"
                @click="
                  () => {
                    curSelItem.columns.splice(index, 1);
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
import vAceEditor from "@/components/aceEditor.vue";

let Props = defineProps({
  curSelItem: {
    type: Object,
    default: {},
  },
  curSelItemIndex: {
    type: Number,
    default: -1,
  },
});

function hasAutoHeight(bol: any) {
  if (!bol) {
    Props.curSelItem["tableHeight"] = "auto";
  }
}
</script>
<script lang="ts">
export default defineComponent({
  name: "Table",
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
        word-break: keep-all;
        word-wrap: break-word;
      }
      > div {
        flex: 1;
      }
    }
  }
}
.opts {
  flex: 1;
  li {
    border: 1px solid #eee;
    margin: 5px 0;
  }
}
</style>
