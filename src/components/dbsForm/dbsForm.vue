<!--
 * @Author: 鲁遥
 * @Date: 2021-04-08 14:49:07
 * @LastEditTime: 2022-11-17 17:12:31
 * @LastEditors: luyao
 * @Description: 
 * @FilePath: /y-render/src/components/dbsForm/dbsForm.vue
-->
<template>
  <el-form
    class="search-form-box"
    :class="[
      !!(state.formConfig.rules && state.formConfig.rules.length > 0)
        ? 'has-rules'
        : 'not-rules',
    ]"
    ref="dbsFormRef"
    :model="searchData"
    :size="state.formConfig.size || 'default'"
    :inline="state.formConfig.inline"
    :label-width="state.formConfig.labelWidth"
    :rules="state.formConfig.rules || []"
    :disabled="allDisabled"
    @keydown="
      (e) => {
        e.keyCode == 13 && search();
      }
    ">
    <el-form-item
      :class="[item.className, !state.open && index > 0 ? 'hide-item' : '']"
      v-for="(item, index) in state.searchFormList"
      :label="item.label"
      :key="item.prop"
      :style="{ width: state.formConfig.formItemWidth }"
      :prop="searchData.hasOwnProperty(item.prop) ? item.prop : ''"
      :rules="item.rules"
      v-show="
        !item.isShow ||
        searchData[item.isShow.prop] == item.isShow.value ||
        item.isShow.value === true
      ">
      <!-- ｜｜ item.isShow.value.find((itemchild) =>
          searchData[item.isShow.prop].includes(itemchild)
        ) -->
      <!--    v-show="!item.isShow || searchData[item.isShow.prop] == item.isShow.value || item.isShow.value === true" -->
      <!-- 输入框 -->
      <el-input
        clearable
        :disabled="item.disable"
        v-if="item.type === 'Input'"
        :type="item.inputType || 'text'"
        v-model.trim="searchData[item.prop]"
        :placeholder="item.placeholder"
        :maxlength="item.maxlength"
        :minlength="item.minlength"
        :prefix-Icon="item.prefixIcon || ''"
        :style="{ width: item.width || '180px' }"
        @keyup="item.keyup && item.keyup(searchData[item.prop])">
        <!--    @clear="(item) => item.clear && item.clear(searchData[item.prop])" -->
      </el-input>
      <!-- 数字 -->
      <el-input-number
        v-if="item.type === 'InputNumber'"
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :disabled="item.disable"
        controls-position="right"
        :precision="item.precision"
        :style="{ textAlign: item.textAlign, width: item.width || '180px' }"
        @keyup="item.keyup && item.keyup(searchData[item.prop])"
        :min="item.min"
        :max="item.max"></el-input-number>
      <!-- 密码输入框 -->
      <el-input
        clearable
        :disabled="item.disable"
        v-if="item.type === 'InputPwd'"
        show-password
        :type="item.inputType || 'text'"
        v-model.trim="searchData[item.prop]"
        :placeholder="item.placeholder"
        :prefix-Icon="item.prefixIcon || ''"
        :style="{ width: item.width || '180px' }"
        @keyup="item.keyup && item.keyup(searchData[item.prop])">
        <!--     @clear="item.clear && item.clear(searchData[item.prop])" -->
      </el-input>
      <!-- 文本域 -->
      <el-input
        clearable
        type="textarea"
        :disabled="item.disable"
        v-if="item.type === 'Textarea'"
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width || '180px' }"
        :rows="item.rows || 1"
        :show-word-limit="item.showWordLimit"
        :maxlength="item.maxlength"></el-input>
      <!-- 下拉框 -->
      <el-select
        :disabled="item.disable"
        :clearable="item.clearable === false ? false : true"
        :filterable="item.filterable || true"
        :multiple="item.multiple"
        v-if="item.type === 'Select'"
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
      <!-- 级联选择器 -->
      <el-cascader
        clearable
        v-if="item.type === 'Cascader'"
        v-model="searchData[item.prop]"
        :options="item.options"
        :props="item.props"
        :style="{ width: item.width || '180px' }"
        @change="item.change && item.change(searchData[item.prop])"
        :placeholder="item.placeholder">
      </el-cascader>
      <!-- 单选 -->
      <el-radio-group
        v-if="item.type === 'Radio'"
        v-model="searchData[item.prop]">
        <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{
          ra.label
        }}</el-radio>
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type === 'RadioButton'"
        v-model="searchData[item.prop]"
        @change="item.change && item.change(searchData[item.prop])">
        <el-radio-button
          v-for="ra in item.radios"
          :label="ra.value"
          :key="ra.value"
          >{{ ra.label }}</el-radio-button
        >
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        :class="item.className"
        v-if="item.type === 'Checkbox'"
        :style="{ width: item.width || '180px' }"
        v-model="searchData[item.prop]">
        <el-checkbox
          v-for="ch in item.checkboxs"
          :label="ch.value"
          :key="ch.value"
          >{{ ch.label }}</el-checkbox
        >
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type === 'Date'"
        type="date"
        :disabled="item.disable"
        :placeholder="item.placeholder || '选择日期'"
        v-model="searchData[item.prop]"
        :format="item.format || 'YYYY-MM-DD'"
        :value-format="item.valueFormat || 'YYYY-MM-DD'"
        :style="{ width: item.width || '180px' }"
        :clearable="item.clearable === false ? false : true"></el-date-picker>

      <!-- 日期范围 -->
      <el-date-picker
        v-if="item.type === 'Daterange'"
        v-model="searchData[item.prop]"
        type="daterange"
        :disabled="item.disable"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        range-separator=" - "
        :disabled-date="item.disabledDate"
        :format="item.format || 'YYYY-MM-DD'"
        :value-format="item.valueFormat || 'YYYY-MM-DD'"></el-date-picker>
      <!-- 时间 -->
      <el-time-select
        v-if="item.type === 'Time'"
        :disabled="item.disable"
        :placeholder="item.placeholder || '选择时间'"
        v-model="searchData[item.prop]"
        type=""></el-time-select>
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type === 'DateTime'"
        :placeholder="item.placeholder || '选择日期'"
        type="datetime"
        v-model="searchData[item.prop]"
        :disabled="item.disable"
        :disabled-date="item.disabledDate"></el-date-picker>

      <!-- 日期时间范围 -->
      <el-date-picker
        v-if="item.type === 'Datetimerange'"
        v-model="searchData[item.prop]"
        type="datetimerange"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        :placeholder="item.placeholder"
        :default-time="state.defaultTime"
        :disabled-date="item.disabledDate"
        :clearable="item.clearable"
        @change="(v:any) => setDate(v, item.prop)">
      </el-date-picker>

      <numberRange
        v-if="item.type === 'Sliderrange'"
        :min="item.min"
        :max="item.max"
        v-model="searchData[item.prop]"
        :data="searchData[item.prop]"
        @numberRanger="numberRanger($event, item.prop)"></numberRange>
      <!-- 开关 -->
      <el-switch
        v-if="item.type === 'Switch'"
        v-model="searchData[item.prop]"></el-switch>

      <slot v-if="item.slot" :name="item.slot">{{ item.solt }} </slot>
    </el-form-item>

    <!-- :style="{ width: state.formConfig.formItemWidth }" -->
    <div class="btn-box" v-if="state.formConfig.isHandle">
      <span
        v-for="item in (searchHandle as any)"
        style="margin-right: 10px"
        v-show="
          !item.isShow ||
          searchData[item.isShow.prop] == item.isShow.value ||
          item.isShow.value === true ||
          (typeof item.isShow.value === 'function' &&
            item.isShow.value() === true)
        ">
        <el-button
          :style="{ width: item.width }"
          :disabled="item.controlClick || false"
          :type="item.type"
          @click="item.handle(dbsFormRef)"
          v-if="!item.slot"
          >{{ item.label }}</el-button
        >

        <slot v-else="item.slot" :name="item.slot"> </slot>
      </span>

      <el-button
        @click="search"
        v-if="state.formConfig.hasSearch"
        :size="state.formConfig.size"
        type="primary"
        style="width: 80px"
        >查询</el-button
      >
      <el-button
        @click="reset"
        v-if="state.formConfig.hasReset"
        :size="state.formConfig.size"
        style="width: 80px"
        >重置</el-button
      >
      <span
        @click="isOpen"
        class="form-move-search"
        v-if="state.formConfig.isShowFilter && state.searchBtnShow">
        <el-icon :size="16" v-if="state.open"><top /></el-icon>
        <el-icon :size="16" v-else><bottom /></el-icon>
        <!-- <i :class="open ? 'el-icon-top' : 'el-icon-bottom'"></i> -->
        {{ state.open ? "收起筛选" : "展开筛选" }}
      </span>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { reactive, computed, ref, nextTick } from "vue";
import numberRange from "./../numberRange.vue";
import { Bottom, Top } from "@element-plus/icons-vue";
let props = defineProps({
  ref: {
    type: String,
    default: "form",
  },

  // 搜索项
  searchForm: {
    type: Array,
    default: [],
  },
  // 操作按钮组
  searchHandle: {
    type: Array,
    default: () => [],
  },

  // 搜索项对应字段
  searchData: {
    type: Object,
    default: {},
  },
  // 设置表格高度方法
  containerEle: Object,
  allDisabled: {
    type: Boolean,
  },
  formConfig: {
    type: Object,
    // default: () => {
    //   return {
    //     size: "small",
    //     inline: true,
    //     isHandle: true,
    //     formItemWidth: "auto",
    //     labelWidth: "110px",
    //     hasReset: true,
    //     hasSearch: true,
    //   };
    // },
  },
});

let emit = defineEmits(["getFormRef", "handleReset", "handleSearch"]);

const dbsFormRef: any = ref(null);
const state: any = reactive({
  searchBtnShow: true,
  defaultTime: [
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
  ],
  searchFormList: computed(() => {
    return props.searchForm.filter((item: any) => {
      return !item.isHidden;
    });
  }),
  formConfig: computed(() => {
    return {
      ...{
        size: "small",
        inline: true,
        isHandle: true,
        formItemWidth: "auto",
        labelWidth: "110px",
        hasReset: true,
        hasSearch: true,
      },
      ...props.formConfig,
    };
  }),
  open: true,
});
function isOpen() {
  state.open = !state.open;
}
function numberRanger(ev: any, props: any) {
  console.log(ev, props);
}
emit("getFormRef", dbsFormRef);

function resetFun() {
  dbsFormRef.value.resetFields();
}

function validate() {
  return new Promise((resolve, reject) => {
    dbsFormRef.value.validate((valid: unknown) => {
      resolve(valid);
    });
  });
}

function setDate(val: any, prop: any) {
  if (val) {
    props.searchData[prop] = [
      dayjs(val[0]).format("YYYY-MM-DD HH:mm:ss"),
      dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss"),
    ];
  } else {
    props.searchData[prop] = null;
  }
}

function reset() {
  let pageSize =
    props.searchData.hasOwnProperty("pageSize") && props.searchData.pageSize;
  Object.keys(props.searchData).forEach((item, index) => {
    props.searchData[item] = null;
  });
  if (props.searchData.hasOwnProperty("pageSize")) {
    props.searchData.pageSize = pageSize;
  }
  if (props.searchData.hasOwnProperty("pageNum")) {
    props.searchData.pageNum = 1;
  }
  emit("handleReset");
}

function search() {
  Object.keys(props.searchData).forEach((item, index) => {
    if (props.searchData[item] == "") {
      props.searchData[item] = null;
    }
  });
  emit("handleSearch");
}

function showAllSearch() {
  nextTick(() => {
    //收起/展开操作按钮
    let switchBtnDom = document.querySelector(".form-move-search");
    // 搜索项form表单
    let searchFormDom = document.querySelector(".search-form-box");
    let diffHeight = null;

    if (switchBtnDom && searchFormDom) {
      diffHeight =
        switchBtnDom.getBoundingClientRect().top -
        searchFormDom.getBoundingClientRect().top -
        6;

      if (diffHeight > 0) {
        state.searchBtnShow = true;
      } else {
        state.searchBtnShow = false;
      }
    }
  });
}

showAllSearch();
</script>

<style lang="less" scoped>
:deep(.el-checkbox) {
  font-weight: normal;
}

.hide-item {
  display: none;
}
.search-form-box {
  vertical-align: bottom;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .btn-box {
    display: flex;
    // display: inline-block;
  }
  &.not-rules {
    margin-bottom: 2px;
    .el-form-item {
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }

  &.has-rules {
    .el-form-item {
      margin-top: 6px;
      margin-bottom: 18px;
    }
  }
}
:deep(.el-input__inner) {
  text-align: left;
}
.form-move-search {
  vertical-align: middle;
  margin-left: 5px;
  display: flex;
  align-items: center;
  // display: inline-block;
  color: #2d8cf0;
  font-size: 12px;
}
</style>
