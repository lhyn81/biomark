import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/display.css";
import "element-plus/dist/index.css";

import Glbs from "@/components/glb.js";
import "@/assets/glb.css";

function fakenir(length, min, max) {
  const array = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    array.push(randomNum);
  }
  return array;
}

(async function () {
  await CefSharp.BindObjectAsync("CefPipe");
  CefPipe.init();
  CefPipe.readCfg().then(function (ret) {
    Glbs.settingObj = JSON.parse(ret);
    Glbs.settingObj["nir"]["ref"]["base_dark"] = fakenir(128, 1000, 2000);
    Glbs.settingObj["nir"]["ref"]["base_std"] = fakenir(128, 1000, 5000);
  });
  CefPipe.chkModel().then((ret)=>{
    Glbs.modelInfo=JSON.parse(ret);
  });
})();

createApp(App).use(router).use(ElementPlus).mount("#app");
