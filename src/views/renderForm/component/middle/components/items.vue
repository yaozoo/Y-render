<!--
 * @Author: luyao
 * @Date: 2022-08-16 16:28:51
 * @LastEditTime: 2022-12-19 15:19:48
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/middle/components/items.vue
-->

<template>
  <div v-if="item.type === 'Input'" class="base-item-comp-title-box">
    <el-input
      size="default"
      clearable
      :disabled="item.disable"
      :type="item.inputType || 'text'"
      v-model.trim="searchData[item.prop]"
      :placeholder="item.placeholder"
      :maxlength="item.maxlength"
      :minlength="item.minlength"
      :prefix-Icon="item.prefixIcon || ''"
      :style="{ width: item.width || '180px' }">
    </el-input>
  </div>

  <!-- 下拉框 -->
  <div v-if="item.type === 'Select'" class="base-item-comp-title-box">
    <el-select
      size="default"
      :disabled="item.disable"
      :clearable="item.clearable === false ? false : true"
      :filterable="item.filterable || true"
      :multiple="item.multiple"
      :placeholder="item.placeholder"
      v-model="searchData[item.prop]"
      :style="{ width: item.width || '180px' }"
      @change="item.change && item.change(searchData[item.prop])">
      <el-option
        v-for="op in item.options"
        :label="op[item.itemName || 'value']"
        :value="op[item.itemValue || 'key']"
        :key="op[item.itemValue || 'key']">
      </el-option>
    </el-select>
  </div>
  <!-- 数字 -->
  <div v-if="item.type === 'InputNumber'" class="base-item-comp-title-box">
    <el-input-number
      size="default"
      v-model="searchData[item.prop]"
      :placeholder="item.placeholder"
      :disabled="item.disable"
      controls-position="right"
      :precision="item.precision"
      :style="{ textAlign: item.textAlign, width: item.width || '180px' }"
      @keyup="item.keyup && item.keyup(searchData[item.prop])"
      :min="item.min"
      :max="item.max"></el-input-number>
  </div>
  <!-- 文本域 -->
  <div v-if="item.type === 'Textarea'" class="base-item-comp-title-box">
    <el-input
      size="default"
      clearable
      type="textarea"
      :disabled="item.disable"
      v-model="searchData[item.prop]"
      :placeholder="item.placeholder"
      :style="{ width: item.width || '180px' }"
      :rows="item.rows || 1"
      :show-word-limit="item.showWordLimit"
      :maxlength="item.maxlength"
      :minlength="item.minlength"></el-input>
  </div>

  <div v-if="item.type === 'Datetimerange'" class="base-item-comp-title-box">
    <!-- 日期时间范围 -->
    <el-date-picker
      size="default"
      v-model="searchData[item.prop]"
      type="datetimerange"
      :style="{ width: item.width || '360px' }"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.endPlaceholder || '结束日期'"
      :placeholder="item.placeholder"
      :default-time="defaultTime"
      :clearable="item.clearable"
      @change="(v:any) => setDate(v, item.prop)">
      <!--   :disabled-date="item.disabledDate"  -->
    </el-date-picker>
  </div>
  <div v-if="item.type === 'Slot'" class="cus-slot">
    slotName:{{ item.slot }}
  </div>
  <div
    v-if="item.type === 'Table'"
    class="item-table base-item-comp-title-box"
    style="width: 100%">
    <dbsTable
      :columns="item.columns"
      :data="item.tableData"
      :totalNum="item.tableData.length"
      :pageNum="item.pageNum"
      :pageSize="item.pageSize"
      :needPage="item.needPage"
      :autoHeight="false"
      :configFlag="{
        needPage: item.needPage, // 需要分页
        border: true,
        selection: item.selection,
        index: item.index,
      }" />
    <!--   :data="tableData"
        :totalNum="total"
        :pageNum="FixReqData.pageNum"
        :pageSize="FixReqData.pageSize"
        :configFlag="configFlag"
        @handlePageChange="handlePageChange"
        @handleSelectionChange="handleSelectionChange" -->
  </div>
  <!-- </el-form-item> -->
</template>

<script setup lang="ts">
import dayjs from "dayjs";

import { computed, ref } from "vue";

let props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  // searchData: {
  //   type: Object,
  //   default: {},
  // },
});
let defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);
let searchData: any = ref({});
let item = computed(() => props.item);

function setDate(val: any, prop: any) {
  if (val) {
    searchData.value.prop = [
      dayjs(val[0]).format("YYYY-MM-DD HH:mm:ss"),
      dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss"),
    ];
  } else {
    searchData.value.prop = null;
  }
}
</script>
<style lang="less" scoped>
.base-item-comp-title-box {
  flex: 1;
}
.cus-slot {
  min-width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: bisque;
  border: 1px solid #ccc;
}
</style>
