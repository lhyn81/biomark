<template>
  <el-scrollbar height="600px">
    <div class="viewNir">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="第一步:样品采谱" name="1" class="custom-collapse-item">
          <div>
            <span>默认积分时间</span>
            <el-input-number v-model="theSampleData.interval" :step="100" :min="100" :max="1000" step-strictly></el-input-number>
            <span>默认采样次数</span>
            <el-input-number v-model="theSampleData.avg" :step="1" :min="5" :max="10" step-strictly></el-input-number>
            <el-button type="primary" @click="scan(false)">采集光谱</el-button>
          </div>
          <el-tabs>
            <el-tab-pane label="反射值" name="tab_raw"><CmpPlot ref="plot_rfl" /></el-tab-pane>
            <el-tab-pane label="吸收率" name="tab_abs"><CmpPlot ref="plot_abs" /></el-tab-pane>
          </el-tabs>
        </el-collapse-item>
        <el-collapse-item title="第二步:完善样品信息" name="2" class="custom-collapse-item">
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
        </el-collapse-item>
        <el-collapse-item title="第三步:模型计算" name="3" class="custom-collapse-item">
          <el-button type="primary" @click="infer">模型计算</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-scrollbar>
</template>

<script>
import CmpPlot from "@/components/cmpPlot.vue";
import Glbs from "@/components/glb.js";

export default {
  components: {
    CmpPlot,
  },

  data() {
    return {
      sp_names: [],
      op_names: [],
      theSampleData: {
        id:"",
        ts:-1,
        name: "",
        desc:"",
        oper: "",
        interval: -1,
        avg: -1,
        nir: {
          "rfl":[],
          "abs":[],
          "dark":[],
          "std":[]
        },
        hasMark: false,
        markName: "",
        markVal: "",
      },
      theInferData: {
        id:"",
        ts:-1,     
        spid:"",
        desc:"",
        modid:"",
        value:[]
      },
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
          let nir_rfl = ret;
          let nir_abs = [];
          for (let i = 0; i < 128; i++) {
            nir_abs.push((nir_rfl[i] - Glbs.settingObj["nir"]["ref"]["base_dark"][i]) / Glbs.settingObj["nir"]["ref"]["base_std"][i]);
          }

          this.$refs.plot_rfl.setdata([nir_rfl, []]);
          this.$refs.plot_abs.setdata([nir_abs, []]);

          this.theSampleData.nir["rfl"] = nir_rfl;
          this.theSampleData.nir["abs"] = nir_abs;
          this.theSampleData.nir["dark"] = Glbs.settingObj["nir"]["ref"]["base_dark"];
          this.theSampleData.nir["std"] = Glbs.settingObj["nir"]["ref"]["base_std"];
        })
        .catch((e) => {
          CefPipe.err(e.toString());
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    saveSample(spdata){
      this.theSampleData.id = Glbs.guid("smp");
      this.theSampleData.ts = Math.floor(Date.now() / 1000);
      CefPipe.saveSmpData(JSON.stringify(this.theSampleData));
    },

    saveInfer(inferdata){
      
    },

    infer(){
      CefPipe.infer("mod/model01/biomodel.dll", JSON.stringify(this.theSampleData.nir["abs"]))
      .then(()=>{
        this.theInferData.value = ret;
      })
      .catch((e)=>{

      })
    }
  },

  mounted() {
    let delay = 0;
    if (Glbs.settingObj == null) delay = 3000;
    const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    setTimeout(() => {
      this.sp_names = this.extlist(Glbs.settingObj["sample"]["sp_name"]);
      this.op_names = this.extlist(Glbs.settingObj["sample"]["op_name"]);
      this.theSampleData.interval = Glbs.settingObj["nir"]["interval"];
      this.theSampleData.avg = Glbs.settingObj["nir"]["avg"];
      this.theSampleData.nir.dark = Glbs.settingObj["nir"]["ref"]["base_dark"],
      this.theSampleData.nir.std = Glbs.settingObj["nir"]["ref"]["base_std"],
      loading.close();
    }, delay);
  },
};
</script>

<style>
.viewNir {
  padding: 20px;
  margin-bottom: 10px;
}
</style>
