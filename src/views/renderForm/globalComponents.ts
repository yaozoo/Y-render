/*
 * @Author: luyao
 * @Date: 2022-10-26 16:23:36
 * @LastEditTime: 2023-01-31 11:57:20
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/views/renderForm/globalComponents.ts
 */

import CardArea from "./component/jsonToPage/area/CardArea.vue";
import FormArea from "./component/jsonToPage/area/FormArea.vue";
import TableWidget from "./component/jsonToPage/widget/table/TableWidget.vue";
import RenderForm from "./renderForm.vue";
export default (app: any) => {
  app.component("FormArea", FormArea);
  app.component("CardArea", CardArea);
  app.component("TableWidget", TableWidget);
  app.component("RenderForm", RenderForm);
};
