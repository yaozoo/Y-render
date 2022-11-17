<!--
 * @Author: luyao
 * @Date: 2022-10-26 10:54:38
 * @LastEditTime: 2022-11-17 17:12:10
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/component/jsonToPage/area/CardArea.vue
-->

<template>
  <el-card
    style="border: 5px solid #b4d7f3; padding: 2px; border-radius: 0"
    v-if="widgetItem.type == 'CardArea'"
    shadow="hover">
    <template #header v-if="widgetItem.config.hasCardHeader">
      <div class="card-header">
        <span>{{ widgetItem.config.cardName }}</span>
      </div>
    </template>
    <FormArea :widgetItem="widgetItem" />
  </el-card>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
// import JsonToPage from "../index.vue";
export default defineComponent({
  name: "CardAreaWidget",
  components: {
    // JsonToPage,
  },
  props: {
    widgetItem: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    let widgetItem = computed(() => props.widgetItem);

    function withHandle(item: any) {
      console.log(item, 9999);
      // eval(item.handle)(widgetItem.value);
      let newFun = new Function("return " + item.handle)();
      newFun(widgetItem.value);
    }
    // let a = ref('<el-button size="small" class="button">btn</el-button>');
    return {
      widgetItem,
      withHandle,
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
