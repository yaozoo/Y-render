<!--
 * @Author: 鲁遥
 * @Date: 2021-09-17 16:03:09
 * @LastEditTime: 2022-11-17 17:13:45
 * @LastEditors: luyao
 * @Description: 
 * @FilePath: /y-render/src/components/marqueeCom.vue
-->

<template>
  <div class="marquee-com">
    <span class="text" :style="{ left: num + '%' }"
      ><slot>请更新版本</slot></span
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      num: 0,
      direction: "ltr",
      domWidth: 0,
    };
  },
  created() {
    this.step();
  },
  mounted() {
    this.$nextTick(() => {
      let textWidth: any = (document as any).querySelector(".text").offsetWidth;
      let marqueeWidth: any = (document as any).querySelector(
        ".marquee-com"
      ).offsetWidth;
      this.domWidth = parseInt((textWidth / marqueeWidth) * 100);
    });
  },
  methods: {
    step() {
      if (this.direction == "ltr") {
        if (this.num + this.domWidth > 100) {
          this.direction = "rtl";
        } else {
          this.num += 0.1;
        }
      }
      if (this.direction == "rtl") {
        if (this.num < 0) {
          this.direction = "ltr";
        } else {
          this.num -= 0.1;
        }
      }
      window.requestAnimationFrame(this.step);
    },
  },
});
</script>
<style lang="less" scoped>
.marquee-com {
  position: relative;
  height: 30px;
  .text {
    // transform: translateX(10px);
    position: absolute;
    line-height: 30px;
  }
}
</style>
