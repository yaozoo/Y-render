<!--
 * @Author: luyao
 * @Date: 2022-10-26 18:46:06
 * @LastEditTime: 2022-11-19 14:55:15
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/renderForm.vue
-->

<template>
  <ul>
    <li v-for="(widgetItem, widgetIndex) in widget">
      <JsonToPage :widgetItem="widgetItem" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { cloneDeep } from "lodash";
import JsonToPage from "./component/jsonToPage/index.vue";
let props: any = defineProps({
  widget: {
    type: Array,
    default: () => [],
  },
});

let widget: any = computed(() => props.widget);
// 把数据克隆一份
let cloneData = cloneDeep(widget.value);
// 处理数据 把children中的prop放在data中
widget.value = formatData(cloneData);
function formatData(data: any) {
  data.forEach((item: any) => {
    if (!!item?.isBox) {
      item.children.forEach((itemChildren: any, index: any) => {
        if (!!!itemChildren?.isBox) {
          if (itemChildren.type != "Table") {
            item.data[itemChildren.prop] = null;
          }
        } else {
          formatData([itemChildren]);
        }
      });
    } else {
      formatData(item.children);
    }
  });
  return data;
}
</script>
<script lang="ts">
export default defineComponent({
  name: "RenderFormComp",
});
</script>
