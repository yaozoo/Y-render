/*
 * @Author: luyao
 * @Date: 2022-11-17 15:47:12
 * @LastEditTime: 2022-11-18 18:21:29
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /Y-render/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts(), commonjs({ requireReturnsDefault: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  base: "./",
  build: {
    lib: {
      // 入口指向组件库入口模块
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "r-render",
      // 构建生成的文件名，与package.json中配置一致
      fileName: "r-render",
      // fileName: (format) => `r-render.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"],
      output: {
        globals: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          vue: "Vue",
        },
      },
    },
  },
});
