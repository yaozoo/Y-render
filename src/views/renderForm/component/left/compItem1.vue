<!--
 * @Author: luyao
 * @Date: 2022-08-15 17:40:10
 * @LastEditTime: 2022-11-17 17:14:43
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/left/compItem1.vue
-->

<template>
  <div class="comp-item">
    <h4>组件</h4>
    <hr />
    <VueDraggableNext
      chosenClass="chosen"
      :list="compList"
      :group="{ name: 'compList', pull: 'clone', put: true }"
      :sort="true"
      :clone="clone"
      class="comp-box">
      <div v-for="item in compList" :key="item.key" class="form-item">
        <!-- <Items :item="item" :searchData="searchData" /> -->
        <span>{{ item.placeholder }}</span>
      </div>
    </VueDraggableNext>
  </div>
  <div class="comp-item">
    <h4>表格</h4>
    <hr />
    <VueDraggableNext
      chosenClass="chosen"
      :list="columns"
      :group="{ name: 'compList', pull: 'clone', put: true }"
      :sort="true"
      class="comp-box">
      <div class="form-item"><span>表格</span></div>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import { VueDraggableNext } from "vue-draggable-next";

let compList = [
  // 输入类
  {
    key: 10001,
    prop: "",
    type: "Input",
    placeholder: "输入框",
  },
  {
    key: 10002,
    prop: "",
    type: "InputNumber",
    placeholder: "数字输入框",
    min: null,
    max: null,
  },
  {
    key: 10003,
    prop: "",
    type: "Textarea",
    placeholder: "文本输入框",
    rows: 2,
    showWordLimit: true,
    maxlength: 500,
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
  },
];

let tables = {
  type: "Table",
  columns: [
    {
      title: "id",
      key: "id",
      minWidth: 250,
    },
  ],
};

function clone(origin: any) {
  //这一步最关键，没处理好，后面会数据混乱
  //通过转成字符串，让他变成一个新对象，不然拖拽第二个组件将会和第一个组件一模一样，改变第一个组件第二个、第三个也会跟着变动。
  const data = JSON.parse(JSON.stringify(origin));
  data.prop = `${data.type}_${new Date().getTime()}`;
  data._uid = parseInt(
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
}
.form-item {
  margin: 5px;
  padding: 5px 5px;
  border: 1px solid rgb(239, 237, 237);
  text-align: center;
  font-size: 14px;
  box-shadow: 5px 1px 19px #d2c9c9;
}
</style>
