/*
 * @Author: luyao
 * @Date: 2022-10-26 16:23:36
 * @LastEditTime: 2022-11-17 17:12:04
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /y-render/src/views/renderForm/globalComponents.ts
 */

import CardArea from "./component/jsonToPage/area/CardArea.vue";
import FormArea from "./component/jsonToPage/area/FormArea.vue";
import TableWidget from "./component/jsonToPage/widget/TableWidget.vue";
import RenderForm from "./renderForm.vue";

export default (app: any) => {
  app.component("FormArea", FormArea);
  app.component("CardArea", CardArea);
  app.component("TableWidget", TableWidget);
  app.component("RenderForm", RenderForm);
};
