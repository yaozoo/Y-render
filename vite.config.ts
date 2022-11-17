/*
 * @Author: luyao
 * @Date: 2022-11-17 15:47:12
 * @LastEditTime: 2022-11-17 17:08:27
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /y-render/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), commonjs({ requireReturnsDefault: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  base: "./",
});
