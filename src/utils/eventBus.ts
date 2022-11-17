/*
 * @Author: 鲁遥
 * @Date: 2021-05-08 11:45:19
 * @LastEditTime: 2022-11-17 17:14:07
 * @LastEditors: luyao
 * @Description:
 * @FilePath: /y-render/src/utils/eventBus.ts
 */

import mitt from "mitt";

interface EventBusType {
  [key: string]: any;
}

const eventBus: EventBusType = {};
const emitter = mitt();

eventBus.$emit = emitter.emit;
eventBus.$off = emitter.off;
eventBus.$on = emitter.on;

export default eventBus;
