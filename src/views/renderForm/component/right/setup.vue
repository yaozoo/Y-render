<!--
 * @Author: luyao
 * @Date: 2022-08-15 20:07:46
 * @LastEditTime: 2023-02-01 17:57:54
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/right/setup.vue
-->

<template>
  <div class="setup">
    <el-divider>设置 {{ selItem?.type }} </el-divider>
    <em
      class="red"
      style="text-align: left; font-size: 12px; width: 100%; display: block"
      >所有插槽名称必须保持其唯一性</em
    >
    <div v-if="!!selItem && selItem?.type">
      <component v-if="hasChange" :is="selItem?.type" :curSelItem="selItem" />
    </div>
    <el-empty v-else description="请选中容器设置属性" image-size="100" />
  </div>
</template>

<script lang="ts">
import { computed, shallowRef, ref, watch, inject, defineComponent } from "vue";

let comps: any = {};
const modules: any = import.meta.globEager("./../origins/*.vue");
for (const path in modules) {
  let cname = modules[path].default.name;
  comps[cname] = modules[path].default;
}

export default defineComponent({
  components: {
    ...comps,
  },
  setup() {
    const eventBus: any = inject("eventBus");
    let selItem: any = ref({});
    let hasChange = ref(true);
    eventBus.$on("SelItem", (e: any) => {
      selItem.value = e;
      console.log("选中的item：", selItem.value);
    });
    return {
      selItem,
      // curComp,
      hasChange,
    };
  },
});
</script>
<style lang="less" scoped>
.setup {
  background-color: white;
  margin: 10px;
  padding: 10px;

  ul.form-set {
    li {
      width: 100%;
      margin: 10px;
      display: flex;
      align-items: center;
      > span {
        width: 150px;
        display: block;
        text-align: right;
        font-size: 12px;
        color: #555;
      }
    }
  }
}
</style>
