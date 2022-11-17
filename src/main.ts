/*
 * @Author: luyao
 * @Date: 2022-11-17 15:47:12
 * @LastEditTime: 2022-11-17 17:02:52
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /y-render/src/main.ts
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//导入代码高亮文件
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import dbsGlobalComp from "./components/index";
import globalComponents from "@/views/renderForm/globalComponents.ts";
import "@/common/css/global.less";

const app = createApp(App);
dbsGlobalComp(app);
globalComponents(app);
app.use(ElementPlus);
app.use(hljsVuePlugin);

app.mount("#app");
