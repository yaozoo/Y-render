<!--
 * @Author: luyao
 * @Date: 2022-11-01 15:44:24
 * @LastEditTime: 2022-11-19 18:48:56
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
</template>
<script lang="ts" setup>
import { computed, inject } from "vue";

let props: any = defineProps({
  widgetItem: {
    type: Object,
  },
});
let widgetItem: any = computed(() => props.widgetItem);
let widget: any = inject("widget");

function withHandle(e: any, item: any, index: any) {
  let newFun = new Function("return " + item?.eventHandle?.[index]?.handle)();
  newFun && newFun(e, widgetItem.value, widget);
}
</script>
