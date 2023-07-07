import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css';
import "element-plus/dist/index.css"
import Glbs from '@/components/glb.js';

(async function()
{
  await CefSharp.BindObjectAsync("CefPipe");
  CefPipe.cefInit();
  CefPipe.readCfg()
  .then(function(ret){
    Glbs.settingObj = JSON.parse(ret);
  })
})();

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
