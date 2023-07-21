<template>
  <el-scrollbar height="600px" class="viewData">
      <el-tabs class="el-tabs" v-model="activeTab" width="100%" height="600px">
        <el-tab-pane label="1.样品采谱" name="1st">
          <div>
            <span>默认积分时间</span>
            <el-input-number v-model="theSampleData.interval" :step="100" :min="100" :max="1000" step-strictly></el-input-number>
            <span>默认采样次数</span>
            <el-input-number v-model="theSampleData.avg" :step="1" :min="5" :max="10" step-strictly></el-input-number>
            <el-button type="primary" @click="scan(false)">采集光谱</el-button>
          </div>
          <div>
            <CmpChart  ref="plot_rfl" :the-option="opt_rfl" :mysize="{width:'50%', height:'100%'}"/>
            <CmpChart  ref="plot_abs" :the-option="opt_abs" :mysize="{width:'50%', height:'100%'}"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.填写信息" name="2nd">
          <div>
            <span style="width: 100px">样品名称</span>
            <el-select v-model="theSampleData.name" placeholder="选择样品名称">
              <el-option v-for="item in sp_names" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span style="width: 100px">操作员</span>
            <el-select v-model="theSampleData.oper" placeholder="选择检测员">
              <el-option v-for="item in op_names" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div>
            <el-switch v-model="theSampleData.hasMark" active-text="标定数据" inactive-text="非标定数据"></el-switch>
            <div v-if="theSampleData.hasMark">
              <el-input v-model="theSampleData.markName" placeholder="标定指标"></el-input>
              <el-input v-model="theSampleData.markVal" placeholder="标定数值"></el-input>
            </div>
            <div>
              <el-button type="primary" @click="saveSample">保存数据</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="3.模型计算" name="3rd">
          <el-table ref="modelTable" :data="mod_list" highlight-current-row @current-change="handleCurrentChange">
            <!-- <el-table-column type="index" width="50"></el-table-column> -->
            <el-table-column property="id" label="编号" width="100"></el-table-column>
            <el-table-column property="name" label="名称" width="80"></el-table-column>
            <el-table-column property="type" label="类型" width="80"></el-table-column>
            <el-table-column property="desc" label="描述" width="180"></el-table-column>
          </el-table>
          <el-button type="primary" @click="infer">模型计算</el-button>
        </el-tab-pane>
      </el-tabs>
  </el-scrollbar>
</template>

<script>
import CmpChart from "@/components/cmpChart.vue";
import Glbs from "@/components/glb.js";

export default {
  components: {
    CmpChart,
  },

  data() {
    return {
      sp_names: [],
      op_names: [],
      mod_list: [],
      theSampleData: {
        id: "",
        ts: -1,
        name: "",
        desc: "",
        oper: "",
        interval: -1,
        avg: -1,
        nir: {
          rfl: [],
          abs: [],
          dark: [],
          std: [],
        },
        hasMark: false,
        markName: "",
        markVal: "",
      },
      theInferData: {
        id: "",
        ts: -1,
        spid: "",
        desc: "",
        modid: "",
        value: [],
      },
      currentRow: null,
      opt_rfl: JSON.parse(JSON.stringify(Glbs.baseOption)),
      opt_abs: JSON.parse(JSON.stringify(Glbs.baseOption)),
      activeTab: "1st",
      activePlot: "tab_abs",
    };
  },

  methods: {
    extlist(rawlist) {
      let rlt = [];
      for (let i = 0; i < rawlist.length; i++) {
        rlt.push({
          label: rawlist[i],
          value: rawlist[i],
        });
      }
      return rlt;
    },

    scan(darkMode) {
      this.isLoading = true;
      CefPipe.scanNirB(darkMode)
        .then((ret) => {

          // 获取仪器数据
          let nir_rfl = ret;
          let nir_abs = [];
          for (let i = 0; i < 128; i++) {
            nir_abs.push((nir_rfl[i] - Glbs.settingObj["nir"]["ref"]["base_dark"][i]) / Glbs.settingObj["nir"]["ref"]["base_std"][i]);
          }

          // 填充样本对象
          this.theSampleData.nir["rfl"] = nir_rfl;
          this.theSampleData.nir["abs"] = nir_abs;
          this.theSampleData.nir["dark"] = Glbs.settingObj["nir"]["ref"]["base_dark"];
          this.theSampleData.nir["std"] = Glbs.settingObj["nir"]["ref"]["base_std"];

          // 设置反射率和吸收率图表
          let a = {
            type: "line",
            smooth: true,
            name: "暗电流",
            data: nir_rfl,
          };
          let b = {
            type: "line",
            smooth: true,
            name: "标准反射",
            data: nir_abs,
          };

          this.opt_rfl.xAxis.data = Glbs.wvls;
          this.opt_rfl.series = [a,b];
          this.opt_rfl.legend.data = this.opt_rfl.series.map((obj) => obj.name);
          this.$refs.plot_rfl.setdata();

          this.opt_abs.xAxis.data = Glbs.wvls;
          this.opt_abs.series = [a,b];
          this.opt_abs.legend.data = this.opt_abs.series.map((obj) => obj.name);
          this.$refs.plot_abs.setdata();
        })
        .catch((e) => {
          CefPipe.err(e.toString());
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    saveSample(spdata) {
      this.theSampleData.id = Glbs.guid("smp");
      this.theSampleData.ts = Math.floor(Date.now() / 1000);
      CefPipe.saveSmpData(JSON.stringify(this.theSampleData));
    },

    saveInfer(inferdata) {},

    infer() {
      CefPipe.infer("mod/model01/biomodel.dll", JSON.stringify(this.theSampleData.nir["abs"]))
        .then(() => {
          this.theInferData.value = ret;
        })
        .catch((e) => {});
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },

  mounted() {
    let delay = 0;
    if (Glbs.settingObj == null) delay = 3000;
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.8)",
    });
    setTimeout(() => {
      // 通过C#反射模型列表
      this.mod_list = Glbs.modelInfo;

      // 设置默认仪器基本参数
      this.sp_names = this.extlist(Glbs.settingObj["sample"]["sp_name"]);
      this.op_names = this.extlist(Glbs.settingObj["sample"]["op_name"]);
      this.theSampleData.interval = Glbs.settingObj["nir"]["interval"];
      this.theSampleData.avg = Glbs.settingObj["nir"]["avg"];


      // 终止loading
      loading.close();
    }, delay);
  },
};
</script>

<style>
.viewNir {
  padding-left: 10px;
  margin-bottom: 10px;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
</style>
