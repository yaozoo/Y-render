<!--
 * @Author: 鲁遥
 * @Date: 2021-04-07 10:32:08
 * @LastEditTime: 2022-11-17 17:12:56
 * @LastEditors: luyao
 * @Description: 
 * @FilePath: /y-render/src/components/dbsTable/dbsTable.vue
-->

<template>
  <div class="PublicTable">
    <!-- 主题el-table一些设置表头可根据情况添加 -->
    <el-table
      v-loading="loading"
      ref="tableRef"
      class="dbs-table"
      :class="[cusClass]"
      style="width: 100%"
      :border="configFlag.border"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :data="data"
      :max-height="tableMaxHeight"
      :height="tableHeight"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="-1"
      @sort-change="sortChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @cell-click="cellClickFun"
      @row-dblclick="rowDblclickFun"
      :span-method="objectSpanMethod"
      :row-class-name="tableRowClassName"
      :row-key="rowKey">
      <!--    :key="key" -->
      <!-- 全选单选 -->
      <!--  :align="configFlag.tableAlign" -->
      <el-table-column
        v-if="configFlag.selection"
        :selectable="selecTableFun"
        width="40"
        type="selection"
        fixed="left" />
      <!-- 序号列 -->
      <!--  :align="configFlag.tableAlign" -->
      <el-table-column
        v-if="needIndex || configFlag.index"
        width="50"
        type="index"
        :index="1"
        :title="configFlag.indexName || '序号'" />

      <!-- 循环遍历表头展示数据 -->
      <!-- v-for="item in col" :key="item.label" :col="item" -->
      <ColumnItem
        v-for="(item, columnIndex) in columns"
        :item="item"
        :columnIndex="columnIndex.toString()">
        <template v-for="slot in Object.keys(slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </ColumnItem>
    </el-table>

    <!-- :hide-on-single-page="true" -->
    <!--  v-model:currentPage="pageNum" -->
    <el-pagination
      background
      class="el-pagination"
      v-if="needPage"
      :total="totalNum"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next"
      @size-change="sizeChange"
      @current-change="currentChange"
      small />
  </div>
</template>

<script lang="ts" setup>
import SortableJs from "sortablejs";
import { onMounted, ref, computed, useSlots } from "vue";
import ColumnItem from "./columnItem.vue";
let props = defineProps({
  columns: {
    // 表头数据  文案和绑定值，以及需要特殊处理的slot
    type: Array,
    default: () => [],
  },

  data: {
    type: Array, // 后台数据
    default: () => [],
  },
  totalNum: {
    type: Number,
    default: () => 0,
  },
  pageNum: {
    type: Number,
    default: () => 1,
  },
  pageSize: {
    type: Number,
    default: () => 20,
  },
  // params: {
  //   // 分页数据
  //   type: Object,
  //   default: () => {
  //     return {
  //       pageNum: 1,
  //       pageSize: 20,
  //     };
  //   },
  // },
  loading: {
    type: Boolean,
  },

  configFlag: {
    // 配置  其他table配置依次添加
    type: Object,
    default: () => {
      return {
        needPage: true, // 是否需要分页
        selection: false, // 是否需要多选
        index: false, // 是否需要序号
        border: true,
        tableAlign: "left",
      };
    },
  },
  // 是否需要分页
  needPage: {
    type: Boolean,
    default: true,
  },
  // 是否需要index
  needIndex: {
    type: Boolean,
    default: false,
  },
  // 是否需要自适应屏幕高度
  autoHeight: {
    type: Boolean,
    default: false,
  },
  tableHeight: {
    // 可以监听屏幕高度获取。
    // 高度
    type: String,
    // default: () => "100%",
  },
  tableMaxHeight: {
    // 可以监听屏幕高度获取。
    // 高度
    type: String,
    // default: () => "100%",
  },
  headerCellStyle: {
    type: Object,
    default: () => {
      return {
        color: "#333",
        backgroundColor: "#e1e1e1",
        // lineHeight: "18px",
      };
    },
  },
  cellStyle: {
    type: Function || Object,
    default: () => {
      return {
        color: "",
        backgroundColor: "",
        // lineHeight: "18px",
      };
    },
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
  selecTableFun: {
    type: Function,
    default: () => {
      return true;
    },
  },
  objectSpanMethod: {
    type: Function,
    default: () => {
      return true;
    },
  },
  key: {
    type: String,
    default: () => {
      return "";
    },
  },
  rowKey: {
    type: String,
    default: () => {
      return "";
    },
  },
  tableRowClassName: {
    type: Function,
  },
  dragRow: {
    type: Boolean,
    default: false,
  },
  cusClass: {
    type: String,
    default: () => {
      return "";
    },
  },
  dragBtn: {
    type: String,
    default: () => {
      return "";
    },
  },
});
let slots = useSlots();
let emit = defineEmits([
  "getTableRef",
  "handlePageChange",
  "handleSelectionChange",
  "handleSortChange",
  "handleCurrentChange",
  "cellClick",
  "rowDblclick",
  "dragChangeData",
]);

const tableRef: any = ref(null);
let sortable: any = "";
let tableHeight: any = ref(props.tableHeight);
let columns: any = ref(computed(() => props.columns));
emit("getTableRef", tableRef);
// 设置条数
function sizeChange(pageSize: any) {
  console.log("设置条数:", pageSize);
  emit("handlePageChange", { pageSize: pageSize });
}

// 翻页
function currentChange(pageNum: any) {
  console.log("翻页:", pageNum);
  emit("handlePageChange", { pageNum: pageNum });
}
function handleCurrentChange(row: any) {
  emit("handleCurrentChange", row);
}

// 多选
function handleSelectionChange(rows: any) {
  emit("handleSelectionChange", rows);
}
// 排序
function sortChange(item: { order: string; prop: string }) {
  emit("handleSortChange", { order: item.order, prop: item.prop });
}
// 点击单元格
function cellClickFun(row: any, column: any) {
  emit("cellClick", row, column);
}

function rowDblclickFun(row: any, column: any, event: any) {
  emit("rowDblclick", row, column, event);
}
function setHeight() {
  setTimeout(() => {
    let dom = document.querySelector(".dbs-table");
    if (dom) {
      let th = window.innerHeight - dom?.getBoundingClientRect().top - 40;
      tableHeight.value = th;
    }
  }, 500);
}

function rowDrop() {
  let tbody: any = "";
  let dragData: any = [];
  if (props.cusClass) {
    tbody = document.querySelector(
      `.${props.cusClass} .el-table__body-wrapper tbody`
    );
  } else {
    tbody = document.querySelector(`.el-table__body-wrapper tbody`);
  }
  dragData = props.data;
  sortable = SortableJs.create(tbody, {
    animation: 150,
    handle: props.dragBtn,
    onEnd({ newIndex, oldIndex }: any) {
      let currRow = dragData.splice(oldIndex, 1)[0];
      dragData.splice(newIndex, 0, currRow);
      emit("dragChangeData", dragData);
    },
  });
}
onMounted(() => {
  !props.tableMaxHeight && props.autoHeight && setHeight();
  window.addEventListener("resize", (e) => {
    !props.tableMaxHeight && props.autoHeight && setHeight();
  });
  props.dragRow && rowDrop();
});
</script>

<style lang="less" scoped>
.PublicTable {
  size: 12px;
  overflow: hidden;
}
.el-pagination {
  margin-top: 3px;
  background: #fff;
  padding: 3px 0;
  float: right;
  width: 100%;
  justify-content: flex-end;
}

.dbs-table &:deep(.el-checkbox.el-checkbox--mini) {
  height: 18px;
}
</style>
