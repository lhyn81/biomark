<template>
  <div id="app">
    <div class="header">
      <div style="width: 200px;">Biomark检测系统</div>
      <el-input v-model="searchText" placeholder="Search..." class="search-input"/>
    </div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/cmpNavbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      searchText: '快速查询检测记录',
    };
  },
  methods: {
  }
};
</script>

<style>
.header {
  background-color: #4860c8;
  padding: 20px;
  font-size: large;
  display: flex;  /* 将子元素水平排列在一行 */
  align-items: center; /* 垂直居中对齐 */
}
.search-input {
  margin-right: 10px;  /* 调整搜索栏与图标按钮之间的间距 */
  width: 300px;
}
body,html {
  margin:0;
  padding: 0;
}
</style>