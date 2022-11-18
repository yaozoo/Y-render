<!--
 * @Author: luyao
 * @Date: 2022-11-01 15:44:24
 * @LastEditTime: 2022-11-18 17:31:21
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/jsonToPage/widget/TableWidget.vue
-->

<template>
  <dbsTable
    style="width: 100%"
    :autoHeight="widgetItem.autoHeight"
    :tableHeight="widgetItem.tableHeight"
    :needPage="widgetItem.needPage"
    :totalNum="widgetItem.tableData.length"
    :pageNum="widgetItem.pageNum"
    :pageSize="widgetItem.pageSize"
    :columns="widgetItem.columns"
    :data="widgetItem.tableData"
    :configFlag="{
      needPage: widgetItem.needPage, // 需要分页
      border: true,
      selection: widgetItem.selection,
      index: widgetItem.index,
    }"
    @handlePageChange="(e:any) => withHandle(e, widgetItem, 0)"
    @handleSelectionChange="(e:any) => withHandle(e, widgetItem, 1)" />

  <!--  @handlePageChange="handlePageChange"
    @handleSelectionChange="handleSelectionChange" -->
</template>
<script lang="ts" setup>
import { computed } from "vue";

let props: any = defineProps({
  widgetItem: {
    type: Object,
  },
});
let widgetItem: any = computed(() => props.widgetItem);

function withHandle(e: any, item: any, index: any) {
  let newFun = new Function("return " + item?.eventHandle?.[index]?.handle)();
  newFun && newFun(e, widgetItem.value);
}
</script>
