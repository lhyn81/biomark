<template>
  <div id="app">
    <div class="header">
      <div class="left" style="width: 200px">Biomark检测系统</div>
      <div class="right">
        <el-icon class="icon" :color="color_setting" @mouseover="color_setting = colorB" @mouseout="color_setting = colorA" @click="click_setting"><Setting /></el-icon>
        <el-icon class="icon" :color="color_min" @mouseover="color_min = colorB" @mouseout="color_min = colorA" @click="click_min"><Minus /></el-icon>
        <el-icon class="icon" :color="color_max" @mouseover="color_max = colorB" @mouseout="color_max = colorA" @click="click_max"><Plus /></el-icon>
        <el-icon class="icon" :color="color_close" @mouseover="color_close = colorB" @mouseout="color_close = colorA" @click="click_close"><Close /></el-icon>
      </div>
    </div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/cmpNavbar.vue";
import { Plus, Minus, Setting, Close } from "@element-plus/icons";
import Glbs from "@/components/glb.js";

export default {
  name: "App",
  components: {
    Navbar,
    Plus,
    Minus,
    Setting,
    Close,
  },
  data() {
    return {
      color_setting:Glbs.iconColorA,
      color_min:Glbs.iconColorA,
      color_max:Glbs.iconColorA,
      color_close:Glbs.iconColorA,
      colorA:Glbs.iconColorA,
      colorB:Glbs.iconColorB,
    };
  },
  methods: {
    click_setting() {
      this.$router.push('/setting');
    },
    click_min() {
      // 处理点击事件
      CefPipe.Min();
    },
    click_max() {
      // 处理点击事件
      CefPipe.Max();
    },
    click_close() {
      // 处理点击事件
      CefPipe.Exit();
    },
  }
};
</script>

<style>
.header {
  background-color: #ce1212;
  padding: 20px;
  font-size: large;
  display: flex; /* 将子元素水平排列在一行 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between;
}
.left {
  flex: 0 0 auto;
}
.right {
  flex: 0 0 auto;
}
.icon {
  color: #1562dd;
  width: 50px;
  height: 50px;
  margin: 3px;
}
.icon-hover {
  color: rgb(223, 214, 214);
}
body,
html {
  margin: 0;
  padding: 0;
}
</style>
