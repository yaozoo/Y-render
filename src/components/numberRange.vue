<!--
 * @Author: 鲁遥
 * @Date: 2021-05-17 21:09:46
 * @LastEditTime: 2022-11-17 17:13:47
 * @LastEditors: luyao
 * @Description: 
 * @FilePath: /y-render/src/components/numberRange.vue
-->

<template>
  <div>
    <el-input-number
      :controls="false"
      v-model="startNum"
      style="width: 70px"
      size="small"
      controls-position="right"
      @change="handleChangeStart"
      :min="min"
      :max="endNum"></el-input-number>
    -
    <el-input-number
      v-model="endNum"
      :controls="false"
      style="width: 70px"
      size="small"
      controls-position="right"
      @change="handleChangeEnd"
      :min="startNum"
      :max="max"></el-input-number>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, watch } from "vue";
export default defineComponent({
  props: {
    min: {
      type: Number,
      dafault: -1000000000,
    },
    max: {
      type: Number,
      dafault: 1000000000,
    },
    data: {
      type: Object,
    },
  },
  setup(props, context) {
    let { min, max, data } = toRefs(props);
    let state = reactive({
      startNum: props.data[0],
      endNum: props.data[1],
    });

    watchEffect(() => {
      state.startNum = props.data[0];
      state.endNum = props.data[1];
    });

    function handleChangeStart(val: any) {
      props.data[0] = val;
      context.emit("numberRanger", [val, state.endNum]);
    }
    function handleChangeEnd(val: any) {
      props.data[1] = val;
      context.emit("numberRanger", [state.startNum, val]);
    }

    return {
      min,
      max,
      data,
      handleChangeStart,
      handleChangeEnd,
      ...toRefs(state),
    };
  },
});
</script>
