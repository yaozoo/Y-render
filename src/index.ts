/*
 * @Author: luyao
 * @Date: 2022-12-09 15:42:38
 * @LastEditTime: 2022-12-10 14:13:45
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/index.ts
 */
import RenderForm from "./views/renderForm/renderForm.vue"; // 引入封装好的组件
import CardArea from "./views/renderForm/component/jsonToPage/area/CardArea.vue";
import FormArea from "./views/renderForm/component/jsonToPage/area/FormArea.vue";
import TableWidget from "./views/renderForm/component/jsonToPage/widget/TableWidget.vue";
import { App } from "vue";

// 按需导入用
export { RenderForm, FormArea, CardArea, TableWidget };
// 全局导入用
export default {
  install: (app: App) => {
    app.component("RenderForm", RenderForm);
    app.component("FormArea", FormArea);
    app.component("CardArea", CardArea);
    app.component("TableWidget", TableWidget);
  },
};
