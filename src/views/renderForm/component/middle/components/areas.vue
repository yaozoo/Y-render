<!--
 * @Author: luyao
 * @Date: 2022-10-17 16:43:10
 * @LastEditTime: 2023-02-28 14:21:40
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/component/middle/components/areas.vue
-->

<template>
  <!-- card 容器 -->
  <el-card v-if="widgetItem.type == 'CardArea'" shadow="hover">
    <p class="tip">Card 容器</p>
    <template #header v-if="widgetItem.config.hasCardHeader">
      <div class="card-header">
        <span>{{ widgetItem.config.cardName }}</span>
        <span class="card-header-slot" v-if="!!widgetItem.config.cardHeaderSlot"
          >slotName:{{ widgetItem.config.cardHeaderSlot }}</span
        >
      </div>
    </template>
    <VueDraggableNext
      :list="widgetItem.children"
      group="base-compList"
      tag="ul"
      class="widget-item"
      chosenClass="chosen-out"
      :options="{ name: 'compList', pull: 'clone', put: true }"
      handle=".mover-widget-item"
      ghost-class="ghost">
      <li
        :uuid="formItem._uuid"
        :is="formItem.type"
        v-for="(formItem,formCurIndex) in (widgetItem.children as any)"
        :class="[
          'form-item',
          formItem.isBox ? 'box' : 'not-box',
          formItem.hasOwnProperty('children')
            ? 'form-item-left'
            : 'form-item-right',
          formItem._uuid == actItemUUid ? 'actItem' : '',
        ]"
        :style="[
          {
            // 容器组件的宽度默认100%  我的规则 听我的
            width: !formItem.isBox ? widgetItem?.config?.itemWidth : '100%',
            // display: !formItem.isBox ? 'inline-block' : 'block',
          },
        ]"
        @click.stop="(e) => selItem(formItem, formCurIndex, e)">
        <!-- 
         display:
              !formItem.isBox && widgetItem?.config?.inline
                ? 'inline-block'
                : 'block',
        -->
        <div class="set-box">
          <el-icon
            title="删除"
            color="#fff"
            :size="20"
            @click="
              () => {
                widgetItem.children.splice(formCurIndex, 1);
              }
            "
            ><ElDeleteIcon
          /></el-icon>
          <el-icon class="mover-widget-item" color="#fff" :size="20"
            ><Rank
          /></el-icon>
        </div>

        <Areas
          v-if="formItem.hasOwnProperty('children')"
          :widgetItem="formItem"
          :state="props.state" />
        <div class="items-base-comp">
          <label
            v-if="formItem?.label"
            :style="[{ width: widgetItem?.config?.labelWidth }]"
            class="item-label"
            >{{ formItem?.label || "" }}
          </label>
          <Items
            v-if="!formItem.hasOwnProperty('children')"
            :item="formItem"
            :key="formCurIndex" />
        </div>
      </li>
    </VueDraggableNext>
  </el-card>

  <div
    v-if="widgetItem.type == 'FormArea'"
    :class="widgetItem.isBox ? 'box' : 'not-box'">
    <p class="tip">Form 容器</p>
    <VueDraggableNext
      :list="widgetItem.children"
      group="base-compList"
      tag="ul"
      class="widget-item"
      chosenClass="chosen-out"
      :options="{ name: 'compList', pull: 'clone', put: true }"
      handle=".mover-widget-item"
      ghost-class="ghost"
      @change="dragItem">
      <li
        :uuid="formItem._uuid"
        :is="formItem.type"
        v-for="(formItem,formCurIndex) in (widgetItem.children as any)"
        :class="[
          'form-item',
          formItem.isBox ? 'box' : 'not-box',
          formItem.hasOwnProperty('children')
            ? 'form-item-left'
            : 'form-item-right',
          formItem._uuid == actItemUUid ? 'actItem' : '',
        ]"
        :style="[
          {
            // 容器组件的宽度默认100%  我的规则 听我的
            width: !formItem.isBox ? widgetItem?.config?.itemWidth : '100%',
            // display: !formItem.isBox ? 'inline-block' : 'block',
          },
        ]"
        @click.stop="(e) => selItem(formItem, formCurIndex, e)">
        <div class="set-box">
          <el-icon
            title="删除"
            color="#fff"
            :size="20"
            @click="
              () => {
                delItem(formItem, formCurIndex);
              }
            "
            ><ElDeleteIcon
          /></el-icon>
          <el-icon class="mover-widget-item" color="#fff" :size="20">
            <Rank
          /></el-icon>
        </div>

        <Areas
          v-if="formItem.hasOwnProperty('children')"
          :widgetItem="formItem"
          :state="props.state" />
        <div class="items-base-comp">
          <label
            v-if="formItem?.label"
            :style="[{ width: widgetItem?.config?.labelWidth }]"
            class="item-label"
            >{{ formItem?.label || "" }}
          </label>
          <Items
            v-if="!formItem.hasOwnProperty('children')"
            :item="formItem"
            :key="formCurIndex" />
        </div>
      </li>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from "vue-demi";
import { VueDraggableNext } from "vue-draggable-next";
import { Delete as ElDeleteIcon, Rank } from "@element-plus/icons-vue";
import Items from "./items.vue";

export default defineComponent({
  name: "Areas",
  components: {
    Items,
    ElDeleteIcon,
    Rank,
    VueDraggableNext,
  },
  props: {
    widgetItem: {
      type: Object,
    },

    state: {
      type: Object,
      default: {},
    },
  },
  emits: ["SelItem"],
  setup(props, context) {
    const eventBus: any = inject("eventBus");
    let widgetItem: any = ref(computed(() => props.widgetItem));
    let actItemUUid: any = computed({
      get() {
        return props.state.actItemUUid;
      },
      set(v) {
        props.state.actItemUUid = v;
        return v;
      },
    });
    function selItem(formItem: any, formCurIndex: any, e: any) {
      console.log(formItem, formCurIndex, e, 9999);

      props.state.actItemUUid = actItemUUid.value = formItem._uuid;
      formItem._uuid && eventBus.$emit("SelItem", formItem);
    }

    function dragItem(item: any) {}
    function delItem(formItem: any, formCurIndex: any) {
      widgetItem.value.children.splice(formCurIndex, 1);
    }
    return {
      widgetItem,
      props,
      actItemUUid,
      dragItem,
      delItem,
      selItem,
    };
  },
});
</script>
<style lang="less" scoped>
.widget-item {
  min-height: 50px;
  width: 100%;
  padding: 10px;
  border: 1px solid #cecece;
  background: white;
  overflow: auto;
}

.form-item {
  position: relative;
  vertical-align: middle;
  // margin: 20px 5px;
  padding: 20px 10px;
  max-width: 100%;
  overflow: auto;
  display: inline-block;

  .set-box {
    display: none;
    position: absolute;
    top: 2px;
    width: 60px;
    text-align: end;
  }
  &:hover {
    // background-color: #faab78;
    background-color: #c6d2ff;
    .set-box {
      display: block;
      z-index: 10;
      display: flex;
      justify-content: space-around;
      padding: 5px;
      position: absolute;
      top: 0px;
    }
  }
}

.form-item-left {
  border: 1px dashed blue;
  margin-bottom: 2px;
  > .set-box {
    left: 0 !important;
  }
  &:hover {
    border: 1px solid blue;
    > .set-box {
      background: #2192ff;
    }
  }
}

.form-item-right {
  // border: 1px dashed red;

  > .set-box {
    right: 0px !important;
  }
  &:hover {
    > .set-box {
      background: #2192ff;
    }
  }
}
.actItem {
  color: #333;
  background-color: #afb4ff;
  border-color: #8c8c8c;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box {
  display: block;
}

// 每个非容器组件  item的label、和内容（input）什么的
.items-base-comp {
  display: flex;
  align-items: center;
  font-size: 14px;
  .item-label {
    display: inline-block;
    text-align: end;
    padding-right: 2px;
    font-size: 14px;
  }
}

.tip {
  text-align: end;
  color: #888;
  font-weight: 700;
  font-size: 13px;
  position: absolute;
  top: 1px;
  right: 2px;
}

.card-header-slot {
  min-width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #ffd581;
  color: #666;
  border: 1px solid #ccc;
}
</style>
