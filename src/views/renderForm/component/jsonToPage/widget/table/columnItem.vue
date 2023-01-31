<!--
 * @Author: luyao
 * @Date: 2022-06-08 15:48:23
 * @LastEditTime: 2023-01-31 14:54:19
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/jsonToPage/widget/table/columnItem.vue
-->

<template>
  <el-table-column
    :show-overflow-tooltip="item.tooltip || false"
    :key="item.key"
    :width="item.width || ''"
    :height="item.height || ''"
    :max-height="item.maxHeight || ''"
    :min-width="item.minWidth || ''"
    :prop="item.key"
    :label="item.label || item.title"
    :align="item.align || 'left'"
    :sortable="item.sortable"
    :sort-method="item.sortMethod"
    header-align="left"
    :fixed="item.fixed">
    <template v-if="!!item.children" v-for="(inItem, inIndex) of item.children">
      <ColumnItem
        v-if="item.children"
        :item="inItem"
        :columnIndex="`${columnIndex}-${inIndex}`">
        <template v-for="slot in Object.keys(slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </ColumnItem>
    </template>

    <template v-if="!!!item.children" #default="scope">
      <!-- <slot
        :class="item.className"
        v-if="item.slot"
        :name="item.slot"
        :scope="scope" /> -->

      <templateContainer
        v-if="slots[item.slot] && !!item.slot"
        :template="slots[item.slot]"
        :column="item"
        :row="scope.row"
        :index="Number(scope.$index)">
      </templateContainer>
      <div v-else-if="!item.render">
        <span :class="item.className">{{ scope.row[item.key] }} </span>
      </div>
      <div v-else-if="item.render">
        <!-- <span :class="item.className">
          {{ item.render(scope.row) }}
        </span> -->

        <RenderFun
          :column="item"
          :row="scope.row"
          :render="item.render"
          :index="Number(columnIndex)" />
      </div>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  useSlots,
  getCurrentInstance,
} from "vue";

import RenderFun from "./renderFun.vue";

let props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  columnIndex: {
    type: String,
    default: "",
  },
});

/**
 * 获取父组件
 */
const getDataFormComponent: any = (component: {
  type: { name: string };
  parent: any;
}) => {
  if (component && component.type.name === "RenderFormComp") {
    return component;
  }

  if (component && component.parent) {
    const parent = component.parent;
    return getDataFormComponent(parent);
  }
};

// const dataTree = getDataFormComponent(getCurrentInstance());
const slots = getDataFormComponent(getCurrentInstance())?.slots;

// let slots: any = useSlots();
let item = computed(() => props.item);
</script>

<script lang="ts">
export default defineComponent({
  name: "ColumnItem",
  components: {
    TemplateContainer: {
      functional: true,
      props: {
        template: {
          type: Function,
        },
        column: {
          type: Object,
        },
        row: {
          type: Object,
        },
        index: {
          type: String || Number,
        },
      },
      render: (props: any, ctx: any) => {
        return h("div", [
          props.template({ row: props.row, $index: props.index }),
        ]);
      },
    },
  },
});
</script>
