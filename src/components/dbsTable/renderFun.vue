<!--
 * @Author: luyao
 * @Date: 2022-09-21 17:45:03
 * @LastEditTime: 2022-11-17 17:13:10
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsTable/renderFun.vue
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
