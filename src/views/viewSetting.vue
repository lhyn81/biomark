<template>
  <el-scrollbar height="600px" v-loading="loading" element-loading-text="数据加载中..."
  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="viewSetting">
      <el-tabs v-model="activeTab"  v-loading="loading">
        <el-tab-pane label="仪器设置" name="1st">
          <div>
            <span class="num-spin">默认积分时间</span>
            <el-input-number ref="ref_interval" v-model="interval" :step="100" :min="100" :max="1000" step-strictly></el-input-number>
            <span class="num-spin">默认采样次数</span>
            <el-input-number ref="ref_avg" v-model="avg" :step="1" :min="5" :max="10" step-strictly></el-input-number>
            <div class="nirbox">
              <div class="nirbox_sub1">
                <el-button round type="primary" size="large" style="margin: 10px 20px;" @click="setDark" plain>重置暗电流</el-button>
                <el-button round type="primary" size="large" style="margin: 10px 20px;" @click="setStd" plain>重置标准反射</el-button>
              </div>
              <div class="nirbox_sub2"><CmpChart ref="chart_line"  :the-option="opt"></CmpChart></div>
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="采样设置" name="2nd">
          <CmpTags ref="sp_name" myTitle="样本名设置" />
          <CmpTags ref="op_name" myTitle="操作员设置" />
        </el-tab-pane>
      </el-tabs>
      <div class="savebtn">
        <el-button @click="saveSetting" size="large" type="danger" plain>保存设置</el-button>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import CmpTags from "../components/cmpTags.vue";
import CmpChart from "@/components/cmpChart.vue";
import Glbs from "@/components/glb.js";

export default {
  components: {
    CmpTags,
    CmpChart,
  },

  data() {
    return {
      loading: false,
      interval: Glbs.settingObj["nir"]["interval"],
      avg: Glbs.settingObj["nir"]["avg"],
      activeTab:'1st',
      opt:JSON.parse(JSON.stringify(Glbs.baseOption))
    };
  },

  methods: {
    saveSetting() {
      Glbs.settingObj["sample"]["sp_name"] = this.$refs.sp_name.getTags();
      Glbs.settingObj["sample"]["op_name"] = this.$refs.op_name.getTags();
      let cfgStr = JSON.stringify(Glbs.settingObj);
      CefPipe.saveCfg(cfgStr);
    },

    setDark(){
      this.loading = true;
      CefPipe.scanNirB(false)
        .then((ret) => {
          // 更新设置文件的暗电流
          Glbs.settingObj["nir"]["ref"]["base_dark"] = ret;
          this.opt.series[0] = ret;
          this.$refs.chart_line.setdata();
        })
        .catch((e) => {
          CefPipe.err(e.toString());
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setStd() {
      this.loading = true;
      CefPipe.scanNirB(false)
        .then((ret) => {
          // 更新设置文件的标定值
          Glbs.settingObj["nir"]["ref"]["base_std"] = ret;
          this.opt.series[1] = ret;
          this.$refs.chart_line.setdata();
        })
        .catch((e) => {
          CefPipe.err(e.toString());
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    // 更新UI元素
    this.$refs.sp_name.setTags(Glbs.settingObj["sample"]["sp_name"]);
    this.$refs.op_name.setTags(Glbs.settingObj["sample"]["op_name"]);
    // 更新UI元素
    let a = {
      type:"line",
      smooth:true,
      name:"暗电流",
      data:Glbs.settingObj["nir"]["ref"]["base_dark"],
    };
    let b = {
      type:"line",
      smooth:true,
      name:"标准反射",
      data:Glbs.settingObj["nir"]["ref"]["base_std"],
    };
    this.opt.xAxis.data = Glbs.wvls;
    this.opt.series = [a,b];
    this.opt.legend.data = this.opt.series.map(obj=>obj.name);
  },
};
</script>

<style scoped>
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

.nirbox {
  display: flex;
  align-items: center;
  height: 300px;
  margin-left: 30px;
}

.nirbox_sub1 {
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  width:10%;
}


.nirbox_sub2 {
  width: 90%;
  height: 100%;
  margin: 10px;
}

</style>
