/*
 * @Author: luyao
 * @Date: 2022-01-07 11:55:31
 * @LastEditTime: 2022-07-15 10:56:38
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /dmd-pc/src/shims-vue.d.ts
 */

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 忽略类型检查
declare module "watermark-dfs";
declare module "element-plus/lib/locale/lang/zh-cn.js";
declare module "element-plus/lib/locale/lang/zh-cn";
declare module "vue3-print-nb";
declare module "html2pdf-dbs";
declare module "lodash";
declare module "nprogress";
declare module "check-version-updates";
declare module "sortablejs";
declare module "*";
