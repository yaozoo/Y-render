<!--
 * @Author: luyao
 * @Date: 2022-09-21 17:45:03
 * @LastEditTime: 2022-09-23 15:25:09
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /dmd-pc/src/components/dbsTable/renderFun.vue
-->
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    row: Object,
    render: Function,
    index: Number || String,
    column: { type: Object, default: null },
  },
  render: function () {
    return this.render(this.row, this.index);
  },
});
</script>
