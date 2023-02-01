<!--
 * @Author: luyao
 * @Date: 2022-08-15 17:40:10
 * @LastEditTime: 2023-02-01 17:51:33
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/left/compItem.vue
-->

<template>
  <div class="comp-item">
    <el-divider>组件</el-divider>
    <VueDraggableNext
      chosenClass="chosen"
      :list="compList"
      :group="{ name: 'base-compList', pull: 'clone', put: true }"
      :sort="true"
      :clone="clone"
      class="comp-box">
      <div v-for="item in compList" :key="item.key" class="form-item">
        <span>{{ item.placeholder }}</span>
      </div>
    </VueDraggableNext>
  </div>
  <div class="comp-item">
    <el-divider>表格</el-divider>
    <VueDraggableNext
      chosenClass="chosen"
      :list="[tables]"
      :group="{ name: 'base-compList', pull: 'clone', put: true }"
      :sort="true"
      :clone="clone"
      class="comp-box">
      <div class="form-item"><span>表格</span></div>
    </VueDraggableNext>
  </div>
  <div class="comp-item">
    <el-divider>容器</el-divider>
    <VueDraggableNext
      chosenClass="chosen"
      :list="container"
      :group="{ name: 'base-compList', pull: 'clone', put: true }"
      :sort="true"
      :clone="clone"
      class="comp-box">
      <div v-for="item in container" :key="item.key" class="form-item">
        <span>{{ item.placeholder }}</span>
      </div>
    </VueDraggableNext>
  </div>
  <div class="comp-item">
    <el-divider>其他</el-divider>
    <VueDraggableNext
      chosenClass="chosen"
      :list="otherList"
      :group="{ name: 'base-compList', pull: 'clone', put: true }"
      :sort="true"
      :clone="clone"
      class="comp-box">
      <div v-for="item in otherList" :key="item.key" class="form-item">
        <span>{{ item.placeholder }}</span>
      </div>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import { VueDraggableNext } from "vue-draggable-next";
// 组件
let compList = [
  // 输入类
  {
    key: 10001,
    prop: "",
    type: "Input",
    placeholder: "输入框",
    width: "100%",
  },
  {
    key: 10002,
    prop: "",
    type: "InputNumber",
    placeholder: "数字输入框",
    min: null,
    max: null,
    width: "100%",
  },
  {
    key: 10003,
    prop: "",
    type: "Textarea",
    placeholder: "文本输入框",
    rows: 1,
    showWordLimit: true,
    maxlength: 500,
    width: "100%",
  },

  // 选择类
  {
    key: 20001,
    prop: "",
    type: "Select",
    placeholder: "下拉",
    multiple: true,
    options: [
      { value: "对", key: "1" },
      { value: "错", key: "0" },
    ],
    width: "100%",
  },
  {
    key: 20002,
    prop: "",
    type: "Datetimerange",
    placeholder: "日期时间选择",
    startPlaceholder: "范围选择时开始日期的占位内容",
    endPlaceholder: "范围选择时结束日期的占位内容",
    defaultTime: "",
    // disabledDate: "",
    clearable: true,
    width: "100%",
  },
];

// table
let tables = {
  type: "Table",
  key: 30001,
  prop: "",
  needPage: true,
  pageSize: 20,
  pageNum: 1,
  index: true,
  selection: true,
  autoHeight: true,
  tableMaxHeight: "",
  tableHeight: "100px",
  tableData: [
    {
      name: "富贵",
      age: "40",
      sex: "女",
      adress: "New York No. 1 Lake Park",
    },
    {
      name: "建国",
      age: "30",
      sex: "女",
      adress: "London No. 1 Lake Park",
    },
    {
      name: "翠花",
      age: "19",
      sex: "男",
      adress: "Sydney No. 1 Lake Park",
    },
  ],
  columns: [
    {
      title: "姓名",
      key: "name",
      minWidth: 100,
      width: 250,
      slot: "",
    },
    {
      title: "年龄",
      key: "age",
      minWidth: 100,
      slot: "",
    },
    {
      title: "性别",
      key: "sex",
      minWidth: 100,
      slot: "",
    },
    {
      title: "住址",
      key: "adress",
      minWidth: 500,
      slot: "",
    },
  ],
  eventHandle: [
    {
      label: "翻页",
      eventName: "handlePageChange",
      type: "primary",
      handle: '(pages,data)=>console.log("翻页:",pages,data);',
    },
    {
      label: "选中",
      eventName: "handleSelectionChange",
      type: "",
      handle: '(selData,data)=>console.log("选择:",selData,data);',
    },
  ],
};

//  容器
let container = [
  {
    key: 40001,
    prop: "",
    type: "FormArea",
    placeholder: "表单容器",
    width: "100%",
    children: [],
    isBox: true,
    data: {},
    config: {
      allDisabled: false,
      inline: true,
      itemWidth: "auto",
      labelWidth: "80px",
      hasHandle: true,
      hasReset: false,
      hasSearch: false,
    },
    eventHandle: [
      {
        label: "查询",
        eventName: "submitForm",
        type: "primary",
        handle: '(curData,data)=>console.log("查询",curData,data);',
      },
      {
        label: "重置",
        eventName: "resetForm",
        type: "",
        handle: '(curData,data)=>console.log("重置",curData,data);',
      },
    ],
  },
  {
    key: 40003,
    prop: "",
    isBox: true,
    type: "CardArea",
    placeholder: "卡片",
    width: "100%",
    children: [],
    data: {},
    config: {
      hasCardHeader: true,
      cardName: "我的卡片",
      cardHeaderSlot: "cardheaderslot",
      allDisabled: false,
      inline: true,
      itemWidth: "auto",
      labelWidth: "80px",
      isHandle: true,
      hasReset: false,
      hasSearch: false,
    },
  },
];

// 其他
let otherList = [
  // 输入类
  {
    key: 50001,
    slot: "",
    type: "Slot",
    placeholder: "插槽",
    width: "100%",
  },
];
function clone(origin: any) {
  //这一步最关键，没处理好，后面会数据混乱
  //通过转成字符串，让他变成一个新对象，不然拖拽第二个组件将会和第一个组件一模一样，改变第一个组件第二个、第三个也会跟着变动。
  const data = JSON.parse(JSON.stringify(origin));
  data.prop = `${data.type}_${new Date().getTime()}`;
  if (data.type == "Slot") {
    data.slot = `${data.type}_${new Date().getTime()}`;
  }
  data._uuid = parseInt(
    new Date().getMilliseconds() + "" + Math.ceil(Math.random() * 100000)
  ).toString(16);
  return data;
}
</script>
<style lang="less" scoped>
.comp-item {
  background-color: white;
  margin: 10px;
  padding: 10px;
}

/*选中样式*/
.chosen {
  border: solid 1px red !important;
}

.comp-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
}
.form-item {
  margin: 5px;
  padding: 5px 5px;
  border: 1px solid rgb(239, 237, 237);
  text-align: center;
  font-size: 12px;
  box-shadow: 5px 1px 19px #d2c9c9;
  display: inline-block;
  min-width: 80px;
  max-width: 150px;
}
</style>
