<template>
  <el-scrollbar height="600px">
    <el-card class="box-card">
      <div class="box-inner">
        <div class="item">
          <div :size="large" >样本总量</div>
          <div class="digit">12345</div>
        </div>
        <div class="item">内容2</div>
        <div class="item">内容3</div>
      </div>
    </el-card>
  </el-scrollbar>
</template>

<script>
import CmpTags from "../components/cmpTags.vue";
import CmpPlot from "@/components/cmpPlot.vue";
import Glbs from "@/components/glb.js";

export default {
  components: {
    CmpTags,
    CmpPlot,
  },

  data() {
    return {
      loading: true,
      interval: Glbs.settingObj["nir"]["interval"],
      avg: Glbs.settingObj["nir"]["avg"],
    };
  },

  methods: {
    saveSetting() {
      // Update settingObj
      Glbs.settingObj["sample"]["sp_name"] = this.$refs.sp_name.getTags();
      Glbs.settingObj["sample"]["op_name"] = this.$refs.op_name.getTags();
      let cfgStr = JSON.stringify(Glbs.settingObj);
      CefPipe.saveCfg(cfgStr);
    },
  },

  mounted() {
    // 更新UI元素
    // this.$refs.sp_name.setTags(Glbs.settingObj["sample"]["sp_name"]);
    // this.$refs.op_name.setTags(Glbs.settingObj["sample"]["op_name"]);
    // let dark_std = [Glbs.settingObj["nir"]["ref"]["base_dark"], Glbs.settingObj["nir"]["ref"]["base_std"]];
    // this.$refs.nir_base.setdata(dark_std);
    // this.loading = false;
  },
};
</script>




<style>
  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .text {
    font-size: 20px;
    margin: 3px;
  }
  .digit{
    font-size: 20px;
    margin: 3px;
    color: #8e4506;
  }
  .box-card {
    width: 99%;
    margin: 5px;
  }
  .box-inner {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  .item {
    flex: auto; /* 均分宽度 */
    text-align: center; /* 水平居中 */
  }
</style>