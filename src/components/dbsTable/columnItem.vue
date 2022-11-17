<!--
 * @Author: luyao
 * @Date: 2022-06-08 15:48:23
 * @LastEditTime: 2022-11-17 17:12:45
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsTable/columnItem.vue
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
      <slot
        :class="item.className"
        v-if="item.slot"
        :name="item.slot"
        :scope="scope" />
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
import { computed, defineComponent, h, useSlots } from "vue";

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
let slots: any = useSlots();
let item = computed(() => props.item);
</script>

<script lang="ts">
export default defineComponent({
  name: "ColumnItem",
});
</script>
