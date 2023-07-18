<template>
  <el-scrollbar height="600px">
    <div class="viewSetting">
      <el-tabs v-model="activeName"  v-loading="loading">
        <el-tab-pane label="仪器设置" name="first">
          <div>
            <span class="num-spin">默认积分时间</span>
            <el-input-number ref="ref_interval" v-model="interval" :step="100" :min="100" :max="1000" step-strictly></el-input-number>
            <span class="num-spin">默认采样次数</span>
            <el-input-number ref="ref_avg" v-model="avg" :step="1" :min="5" :max="10" step-strictly></el-input-number>
            <div><CmpPlot ref="nir_base"></CmpPlot></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="采样设置" name="second">
          <CmpTags ref="sp_name" myTitle="样本名设置" />
          <CmpTags ref="op_name" myTitle="操作员设置" />
        </el-tab-pane>
      </el-tabs>
      <div class="savebtn">
        <el-button @click="saveSetting" type="success" plain>保存设置</el-button>
      </div>
    </div>
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
    this.$refs.sp_name.setTags(Glbs.settingObj["sample"]["sp_name"]);
    this.$refs.op_name.setTags(Glbs.settingObj["sample"]["op_name"]);
    let dark_std = [Glbs.settingObj["nir"]["ref"]["base_dark"], Glbs.settingObj["nir"]["ref"]["base_std"]];
    this.$refs.nir_base.setdata(dark_std);
    this.loading = false;
  },
};
</script>

<style>
.savebtn {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewSetting {
  padding-left: 10px;
  margin-bottom: 10px;
}

.custom-collapse-item .el-collapse-item__header {
  font-size: 15px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 100px;
  margin-left: 10px;
  vertical-align: bottom;
}

.custom-title {
  font-size: 10px; /* 设置具体的字体大小 */
}

.num-spin {
  font-size: 15px;
  margin-left: 15px;
  margin-right: 5px;
}
</style>
