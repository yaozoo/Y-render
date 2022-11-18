/*
 * @Author: luyao
 * @Date: 2022-11-17 17:26:41
 * @LastEditTime: 2022-11-18 17:34:51
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /Y-render/src/vite-env.d.ts
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
