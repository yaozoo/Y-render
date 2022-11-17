<!--
 * @Author: luyao
 * @Date: 2021-11-29 15:13:12
 * @LastEditTime: 2022-11-17 17:13:19
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/cascaderCategory.vue
-->

<template>
  <el-cascader
    v-model="categoryList"
    :props="optData"
    @change="changeCascader" />
</template>

<script lang="ts" setup>
import { defineComponent, inject, ref } from "vue-demi";
let props = defineProps({
  FixReqData: {
    type: Object,
  },
  categoryData: {
    type: Array,
  },
  disabled: {
    type: Boolean,
  },
  changeOnSelect: {
    type: Boolean,
    default: false,
  },
});

let $API: any = inject("$API");
let emit = defineEmits(["categorys"]);
defineExpose({ crearFun });
let categoryList = ref([]);
let parentData = ref([]);
let category2Data = ref([]);
let category3Data = ref([]);
let category4Data = ref([]);

let optData = {
  lazy: true,
  checkStrictly: props.changeOnSelect,
  lazyLoad: async (
    node: { level: any; value?: any },
    resolve: (arg0: any[]) => void
  ) => {
    const { level } = node;
    let nodes: any[] = [];
    if (level == 0) {
      let res = await getCategory1Data(props.FixReqData);
      res.map(
        (item: {
          category1Id: any;
          category1CnName: any;
          category1Name: any;
        }) => {
          let obj = {
            value: item.category1Id,
            label: `${item.category1CnName}(${item.category1Name})`,
            leaf: node.level >= 3,
          };
          nodes.push(obj);
        }
      );
    } else if (level == 1) {
      let res = await getCategory2Data(node.value);
      res.map(
        (item: {
          category2Id: any;
          category2CnName: any;
          category2Name: any;
        }) => {
          let obj = {
            value: item.category2Id,
            label: `${item.category2CnName}(${item.category2Name})`,
            leaf: node.level >= 3,
          };
          nodes.push(obj);
        }
      );
    } else if (level == 2) {
      let res = await getCategory3Data(node.value);
      res.map(
        (item: {
          category3Id: any;
          category3CnName: any;
          category3Name: any;
        }) => {
          let obj = {
            value: item.category3Id,
            label: `${item.category3CnName}(${item.category3Name})`,
            leaf: node.level >= 3,
          };
          nodes.push(obj);
        }
      );
    } else if (level == 3) {
      let res = await getCategory4Data(node.value);
      res.map(
        (item: {
          category4Id: any;
          category4CnName: any;
          category4Name: any;
        }) => {
          let obj = {
            value: item.category4Id,
            label: `${item.category4CnName}(${item.category4Name})`,
            leaf: node.level >= 3,
          };
          nodes.push(obj);
        }
      );
    }
    resolve(nodes);
  },
};

getCategory1Data();

function crearFun() {
  categoryList.value = [];
}

function changeCascader(val: any) {
  emit("categorys", val);
}
/**
 * 一级分类数据
 */
function getCategory1Data() {
  return new Promise((resolve, reject) => {
    $API
      .getBaseCategory1List({
        // pageNum: 1,
        // pageSize: 100,
      })
      .then((res) => {
        res.forEach(
          (item: {
            value: any;
            category1Id: any;
            label: string;
            category1CnName: any;
            category1Name: any;
            haveChild: boolean;
            loading: boolean;
            learve: number;
            children: never[];
          }) => {
            if (item) {
              item.value = item.category1Id;
              item.label = `${item.category1CnName} (${item.category1Name})`;
              item.haveChild = true;
              item.loading = false;
              item.learve = 1;
              item.children = [];
            }
          }
        );
        parentData.value = res;
        resolve(parentData.value);
      })
      .catch((err: any) => {});
  });
}
/**
 * 获取二级分类
 */
function getCategory2Data(val: any) {
  return new Promise((resolve, reject) => {
    $API
      .getBaseCategory2List({
        // pageNum: 1,
        // pageSize: 100,
        category1Id: val,
        // criteria: [
        //   {
        //     field: "category1Id",
        //     op: "in",
        //     value: [val],
        //   },
        // ],
      })
      .then((res) => {
        res.forEach(
          (item: {
            value: any;
            category2Id: any;
            label: string;
            category2CnName: any;
            category2Name: any;
            learve: number;
            haveChild: any;
            loading: boolean;
            children: never[];
          }) => {
            item.value = item.category2Id;
            item.label = `${item.category2CnName} (${item.category2Name})`;
            item.learve = 2;
            if (item.haveChild) {
              item.loading = false;
              item.children = [];
            } else {
              delete item.children;
            }
          }
        );
        category2Data.value = res;
        resolve(category2Data.value);
      })
      .catch((err: any) => {});
  });
}
/**
 * 获取三级分类
 */
function getCategory3Data(val: any) {
  return new Promise((resolve, reject) => {
    $API
      .getBaseCategory3List({
        // pageNum: 1,
        // pageSize: 100,
        category2Id: val,
        // category1Id: this.FixReqData.category1Id,
        // criteria: [
        //   {
        //     field: "category2Id",
        //     op: "in",
        //     value: [val],
        //   },
        // ],
      })
      .then((res) => {
        res.forEach(
          (item: {
            value: any;
            category3Id: any;
            label: string;
            category3CnName: any;
            category3Name: any;
            learve: number;
            haveChild: any;
            loading: boolean;
            children: never[];
          }) => {
            item.value = item.category3Id;
            item.label = `${item.category3CnName} (${item.category3Name})`;
            item.learve = 3;

            if (item.haveChild) {
              item.loading = false;
              item.children = [];
            }
          }
        );
        category3Data.value = res;
        resolve(category3Data.value);
      })
      .catch((err: any) => {});
  });
}
/**
 * 获取4级分类
 */
function getCategory4Data(val: any) {
  return new Promise((resolve, reject) => {
    $API
      .getBaseCategory4List({
        // pageNum: 1,
        // pageSize: 100,
        category3Id: val,
        // category2Id: this.FixReqData.category2Id,
        // category1Id: this.FixReqData.category1Id,
        // criteria: [
        //   {
        //     field: "category3Id",
        //     op: "in",
        //     value: [val],
        //   },
        // ],
      })
      .then((res) => {
        // console.log(res, "4级分类数据");
        res.forEach(
          (item: {
            value: any;
            category4Id: any;
            label: string;
            category4CnName: any;
            category4Name: any;
            learve: number;
          }) => {
            item.value = item.category4Id;
            item.label = `${item.category4CnName} (${item.category4Name})`;
            item.learve = 4;
          }
        );

        category4Data.value = res;
        resolve(category4Data.value);
      })
      .catch((err: any) => {});
  });
}
</script>
<script lang="ts">
export default defineComponent({
  name: "CascaderCategory",
});
</script>
<style lang="less" scoped>
.catgory {
  display: inline;
  > div {
    margin-right: 10px;
  }
}
</style>
