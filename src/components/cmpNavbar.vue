<template>
  <el-menu style="height: 40px;" class="navbar" background-color="#FF9E2C" text-color="#fff" :default-active="activePath" mode="horizontal" @select="handleMenuSelect">
    <el-menu-item index="/">检 测</el-menu-item>
    <el-menu-item index="/data">数据管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activePath: "/",
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activePath = index;
      this.$router.push(index);
    },
  },
};
</script>

