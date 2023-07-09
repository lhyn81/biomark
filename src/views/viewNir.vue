<template>
  <el-scrollbar height="600px">
    <div
      class="viewNir"
      v-loading="loading"
      element-loading-text="请等待..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-collapse v-model="activeNames" v-loading="loading">
        <el-collapse-item
          title="第一步:样品采谱"
          name="1"
          class="custom-collapse-item"
        >
          <div>
            <span>默认积分时间</span
            ><el-input-number
              v-model="interval"
              :step="100"
              :min="100"
              :max="1000"
              step-strictly
            ></el-input-number>
            <span>默认采样次数</span
            ><el-input-number
              v-model="avg"
              :step="1"
              :min="5"
              :max="10"
              step-strictly
            ></el-input-number>
            <el-button type="primary" @click="scan(false)">采集光谱</el-button>
          </div>
          <el-tabs>
            <el-tab-pane label="反射值" name="tab_raw"
              ><CmpPlot ref="nir_raw"
            /></el-tab-pane>
            <el-tab-pane label="吸收率" name="tab_abs"
              ><CmpPlot ref="nir_abs"
            /></el-tab-pane>
          </el-tabs>
        </el-collapse-item>
        <el-collapse-item
          title="第二步:保存光谱数据"
          name="2"
          class="custom-collapse-item"
        >
          <div>
            <span style="width: 100px">样品名称</span>
            <el-select v-model="sp_name" placeholder="选择样品名称">
              <el-option
                v-for="item in sp_name_list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span style="width: 100px">操作员</span>
            <el-select v-model="op_name" placeholder="选择检测员">
              <el-option
                v-for="item in op_name_list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-switch
              v-model="hasMark"
              active-text="标定数据"
              inactive-text="非标定数据"
            >
            </el-switch>
            <div v-if="hasMark">
              <el-input v-model="markName" placeholder="标定指标"> </el-input>
              <el-input v-model="markVal" placeholder="标定数值"> </el-input>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="第三步:样品预测"
          name="3"
          class="custom-collapse-item"
        >
        </el-collapse-item>
        <el-collapse-item
          title="第四步:保存结果数据"
          name="4"
          class="custom-collapse-item"
        >
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
      loading: true,
      scanning: false,
      sp_name_list: [],
      sp_name: "",
      op_name_list: [],
      op_name: "",
      interval: -1,
      avg: -1,
      hasMark: false,
      markName: "",
      markVal: "",
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
      this.loading = true;
      CefPipe.scanNirB(darkMode)
        .then((ret) => {
          this.$refs.nir_raw.setdata([ret, []]);
          let abs = [];
          for (let i = 0; i < 128; i++) {
            abs.push(
              (ret[i] - Glbs.settingObj["nir"]["ref"]["base_dark"][i]) /
                Glbs.settingObj["nir"]["ref"]["base_std"][i]
            );
          }
          this.$refs.nir_abs.setdata([abs, []]);
        })
        .catch((e) => {
          CefPipe.cefErr(e.toString());
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  mounted() {
    let delay = 0;
    if (Glbs.settingObj == null) delay = 3000;
    setTimeout(() => {
      this.sp_name_list = this.extlist(Glbs.settingObj["sample"]["sp_name"]);
      this.op_name_list = this.extlist(Glbs.settingObj["sample"]["op_name"]);
      this.interval = Glbs.settingObj["nir"]["interval"];
      this.avg = Glbs.settingObj["nir"]["avg"];
      this.loading = false;
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
