<!--
 * @Author: luyao
 * @Date: 2022-10-26 10:54:38
 * @LastEditTime: 2023-02-01 19:08:04
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/jsonToPage/area/CardArea.vue
-->

<template>
  <el-card
    style="border: 5px solid #b4d7f3; padding: 2px; border-radius: 0"
    v-if="widgetItem.type == 'CardArea'"
    shadow="hover">
    <template #header v-if="widgetItem.config.hasCardHeader">
      <div
        class="card-header"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
        <span>{{ widgetItem.config.cardName }}</span>
        <templateContainer
          v-if="
            slots[widgetItem.config.cardHeaderSlot] &&
            !!widgetItem.config.cardHeaderSlot
          "
          :template="slots[widgetItem.config.cardHeaderSlot]"
          :row="widgetItem">
        </templateContainer>
      </div>
    </template>
    <FormArea :widgetItem="widgetItem" />
  </el-card>
</template>
<script lang="ts">
import { computed, defineComponent, inject, getCurrentInstance, h } from "vue";

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

export default defineComponent({
  name: "CardAreaWidget",
  components: {
    // JsonToPage,
    TemplateContainer: {
      functional: true,
      props: {
        template: {
          type: Function,
        },
        // column: {
        //   type: Object,
        // },
        row: {
          type: Object,
        },
        // index: {
        //   type: String || Number,
        // },
      },
      render: (props: any, ctx: any) => {
        return h("div", [
          // props.template({ row: props.row, $index: props.index }),
          props.template({ row: props.row }),
        ]);
      },
    },
  },
  props: {
    widgetItem: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    // const dataTree = getDataFormComponent(getCurrentInstance());
    const slots = getDataFormComponent(getCurrentInstance()).slots;
    console.log("card-slot", slots);

    let widgetItem = computed(() => props.widgetItem);
    let widget: any = inject("widget");

    function withHandle(item: any) {
      // eval(item.handle)(widgetItem.value);
      let newFun = new Function("return " + item.handle)();
      newFun(widgetItem.value, widget);
    }
    return {
      widgetItem,
      withHandle,
      slots,
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

:deep(.card-header) {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
