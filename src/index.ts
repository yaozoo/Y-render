// import renderForm from "./views/renderForm/index.vue"; // 引入封装好的组件
// import {App} from "vue";

// export { renderForm }; //实现按需引入*

// const components = [renderForm];
// const install = function (App: any, options: any) {
//   components.forEach((component) => {
//     App.component(component.name, component);
//   });
// };
// export default { install }; // 批量的引入*

import renderForm from "./views/renderForm/index.vue"; // 引入封装好的组件
import { App } from "vue";

// 按需导入用
export { renderForm };
// 全局导入用
export default {
  install: (app: App) => {
    app.component("renderForm", renderForm);
  },
};
