<!--
 * @Author: luyao
 * @Date: 2022-10-25 17:42:44
 * @LastEditTime: 2022-12-10 14:13:30
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/jsonToPage/index.vue
-->

<template>
  <FormArea
    v-if="!!widgetItem?.isBox && widgetItem?.type == 'FormArea'"
    :widgetItem="widgetItem" />
  <CardArea
    v-if="!!widgetItem?.isBox && widgetItem?.type == 'CardArea'"
    :widgetItem="widgetItem" />
  <TableWidget v-if="widgetItem?.type == 'Table'" :widgetItem="widgetItem" />
  <!--  style="border: 5px solid #b4d7f3; padding: 2px; border-radius: 0" -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "JsonToPage",

  props: {
    widgetItem: {
      type: Object,
      default: () => {},
    },
  },
});
</script>
