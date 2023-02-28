<!--
 * @Author: luyao
 * @Date: 2022-08-19 16:12:57
 * @LastEditTime: 2023-02-07 16:35:22
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

      <el-divider> 列属性 </el-divider>
      <!-- <span class="red" style="font-size: 10px">插槽名称必须保持其唯一性</span> -->
      <li>
        <div>
          <ol>
            <li
              style="padding: 5px 2px; border: 1px solid #eee; margin: 5px 0"
              v-for="(item, index) in curSelItem.columns">
              <p
                style="
                  background-color: #eee;
                  font-size: 10px;
                  font-weight: 700;
                ">
                &nbsp; 第{{ index + 1 }}列
              </p>
              <!-- <div style="display: flex; margin-bottom: 2px">
                <span style="margin-right: 5px; font-size: 10px"
                  >是否是插槽
                </span>
                <el-radio-group v-model="item['isSlot']" size="small">
                  <el-radio-button :label="true" />
                  <el-radio-button :label="false" />
                </el-radio-group>
              </div> -->
              <div class="columns-item">
                <span class="item-name">属性名 </span>
                <el-input
                  v-model="item.title"
                  placeholder="属性名"
                  class="set-input"></el-input>
              </div>
              <div class="columns-item">
                <span class="item-name">属性值 </span>
                <el-input
                  v-model="item.key"
                  placeholder="属性值"
                  class="set-input"></el-input>
              </div>
              <div class="columns-item">
                <span class="item-name">宽度 </span>
                <el-input
                  v-model="item.width"
                  placeholder="宽度"
                  class="set-input"></el-input>
              </div>
              <div class="columns-item">
                <span class="item-name">最小宽度 </span>
                <el-input
                  v-model="item.minWidth"
                  class="set-input"
                  placeholder="最小宽度"></el-input>
              </div>
              <div class="columns-item">
                <span class="item-name">插槽名称 </span>
                <el-input
                  v-model="item.slot"
                  class="set-input"
                  placeholder="插槽名称"></el-input>
              </div>

              <div class="columns-item">
                <el-icon
                  @click="
                    () => {
                      curSelItem.columns.splice(
                        index,
                        0,
                        JSON.parse(JSON.stringify(item))
                      );
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
              </div>
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

:deep(.columns-item) {
  display: inline-flex;
  align-items: baseline;
  margin-bottom: 2px;
  width: 50%;
  .item-name {
    margin-right: 5px;
    font-size: 10px;
    display: inline-block;
    width: 48px;
    text-align: right;
  }
  .set-input {
    flex: 0.9;
    margin-right: 1%;
    margin-top: 2px;
  }
}
</style>
