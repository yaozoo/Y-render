/*
 * @Author: 鲁遥
 * @Date: 2021-04-07 10:49:18
 * @LastEditTime: 2022-11-17 16:51:37
 * @LastEditors: luyao
 * @Description: 全局封装的table组件
 * @FilePath: /y-render/src/components/index.ts
 */

// import dbsTable from "./dbsTable/index";
// import dbsForm from "./dbsForm/index";
import dbsTable from "./dbsTable/dbsTable.vue";
import dbsForm from "./dbsForm/dbsForm.vue";
import dbsDialog from "./dbsDialog/index.vue";
import CardBox from "./cardBox.vue";
import ViewImg from "./viewImg.vue";
import dbsCard from "./dbsCard.vue";

export default (app: any) => {
  app.component("dbsTable", dbsTable);
  app.component("dbsForm", dbsForm);
  app.component("dbsDialog", dbsDialog);
  app.component("CardBox", CardBox);
  app.component("ViewImg", ViewImg);
  app.component("dbsCard", dbsCard);
};
