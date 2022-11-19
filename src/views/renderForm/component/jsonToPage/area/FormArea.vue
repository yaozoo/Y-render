<!--
 * @Author: luyao
 * @Date: 2022-10-26 10:54:38
 * @LastEditTime: 2022-11-19 18:52:38
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/jsonToPage/area/FormArea.vue
-->

<template>
  <el-form
    style="border: 5px solid #b4d7f3; padding: 2px"
    class="search-form-box"
    :class="[
      !!(widgetItem?.config?.rules?.length > 0) ? 'has-rules' : 'not-rules',
      widgetItem?.config?.inline ? 'form-inline-cus' : 'form-block-cus',
    ]"
    ref="dbsFormRef"
    :model="widgetItem?.data"
    :size="widgetItem?.config?.size || 'default'"
    :inline="widgetItem?.config?.inline"
    :label-width="widgetItem?.config?.labelWidth"
    :rules="widgetItem?.config?.rules || []"
    :disabled="widgetItem?.config?.allDisabled">
    <div
      class="form-item-box"
      v-for="(item, index) in widgetItem.children"
      :style="{
        // 容器组件的宽度默认100%  我的规则 听我的
        width:
          !item.isBox && item.type != 'Table'
            ? widgetItem?.config?.itemWidth
            : '100%',

        // 就是说当前如果是inlne 并且被循环项不是容器元素的时候才能是inline-flex
        display:
          widgetItem?.config?.inline && !item?.isBox && item.type != 'Table'
            ? 'inline-flex'
            : '',
      }">
      <JsonToPage
        v-if="
          item.type == 'FormArea' ||
          item.type == 'CardArea' ||
          item.type == 'Table'
        "
        :widgetItem="item" />

      <el-form-item
        v-else
        :class="[
          item.className,
          index > 0 ? 'hide-item' : '',
          item.label ? 'has-label-cus' : 'not-label-cus',
        ]"
        :label="item.label"
        :key="item.prop"
        :prop="widgetItem.data[item.prop]"
        :rules="item.rules">
        <el-input
          clearable
          :disabled="item.disable"
          v-if="item.type === 'Input'"
          :type="item.inputType || 'text'"
          v-model.trim="widgetItem.data[item.prop]"
          :placeholder="item.placeholder"
          :maxlength="item.maxlength"
          :minlength="item.minlength"
          :prefix-Icon="item.prefixIcon || ''"
          :style="{ width: item.width || '180px' }"></el-input>
        <el-input
          type="number"
          clearable
          :disabled="item.disable"
          v-if="item.type === 'InputNumber'"
          v-model="widgetItem.data[item.prop]"
          :placeholder="item.placeholder"
          controls-position="right"
          :precision="item.precision"
          :style="{ textAlign: item.textAlign, width: item.width || '180px' }"
          :min="item.min"
          :max="item.max"></el-input>
        <el-input
          clearable
          type="textarea"
          :disabled="item.disable"
          v-if="item.type === 'Textarea'"
          v-model.trim="widgetItem.data[item.prop]"
          :placeholder="item.placeholder"
          :style="{ width: item.width || '180px' }"
          :rows="item.rows || 1"
          :show-word-limit="item.showWordLimit"
          :maxlength="item.maxlength"></el-input>

        <el-select
          :disabled="item.disable"
          :clearable="item.clearable === false ? false : true"
          :filterable="item.filterable || true"
          :multiple="item.multiple"
          v-if="item.type === 'Select'"
          :placeholder="item.placeholder"
          v-model="widgetItem.data[item.prop]"
          :style="{ width: item.width || '180px' }">
          <el-option
            v-for="op in item.options"
            :label="op[item.itemName || 'value']"
            :value="op[item.itemValue || 'key']"
            :key="op[item.itemValue || 'key']">
          </el-option>
        </el-select>

        <el-date-picker
          v-if="item.type === 'Datetimerange'"
          v-model="widgetItem.data[item.prop]"
          type="datetimerange"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          :placeholder="item.placeholder"
          :default-time="defaultTime"
          :disabled-date="item.disabledDate"
          :clearable="item.clearable"
          @change="(v:any) => setDate(v, item.prop)">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="btn-box" v-if="widgetItem.config.hasHandle">
      <span
        v-for="item in (widgetItem.eventHandle as any)"
        style="margin-right: 10px">
        <!--  v-show="
          !item.isShow ||
          searchData[item.isShow.prop] == item.isShow.value ||
          item.isShow.value === true ||
          (typeof item.isShow.value === 'function' &&
            item.isShow.value() === true)
        " -->
        <!-- -->
        <el-button
          :style="{ width: item.width }"
          :disabled="item.controlClick || false"
          :type="item.type"
          v-if="!item.slot"
          @click="withHandle(item)"
          >{{ item.label }}</el-button
        >
        <slot v-else="item.slot" :name="item.slot"> </slot>
      </span>

      <!-- <el-button
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
      <i :class="open ? 'el-icon-top' : 'el-icon-bottom'"></i> 
        {{ state.open ? "收起筛选" : "展开筛选" }}
      </span> -->
    </div>
  </el-form>
</template>
<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  inject,
  ref,
} from "vue";
import JsonToPage from "../index.vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "FormAreaWidget",
  components: {
    JsonToPage,
  },
  props: {
    widgetItem: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    let defaultTime = ref([
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59),
    ]);
    let widgetItem = computed(() => props.widgetItem);
    let widget: any = inject("widget");

    function withHandle(item: any) {
      // console.log(item, 9999);
      // eval(item.handle)(widgetItem.value);
      let newFun = new Function("return " + item.handle)();
      newFun(widgetItem.value, widget);
    }

    function setDate(val: any, prop: any) {
      if (val) {
        widgetItem.value.data[prop] = [
          dayjs(val[0]).format("YYYY-MM-DD HH:mm:ss"),
          dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss"),
        ];
      } else {
        widgetItem.value.value[prop] = null;
      }
    }
    return {
      widgetItem,
      defaultTime,
      withHandle,
      setDate,
    };
  },
});
</script>

<style lang="less" scoped>
.search-form-box {
  vertical-align: bottom;
  align-items: center;
  .btn-box {
    // display: flex;
    display: inline-block;
  }
  .el-form-item {
    width: 100%;
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
.form-block-cus > div > div {
  width: 100%;
}
.form-item-box {
  display: inline-block;
}
.not-label-cus {
  :deep(.el-form-item__content) {
    margin-left: 0px !important;
    margin-right: 10px;
  }
}
</style>
