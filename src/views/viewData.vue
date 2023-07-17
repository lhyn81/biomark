<template>
  <div class="viewData">
    <div><CmpChart ref="pubchart" :the-option="opt"></CmpChart></div>
  </div>
</template>

<script>
import CmpChart from "@/components/cmpChart.vue";
import Glbs from "@/components/glb.js";

export default {
  components: {
    CmpChart,
  },

  data(){
    return {
      opt:null
    };
  },

  mounted() {
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

    this.opt=JSON.parse(JSON.stringify(Glbs.baseOption));
    this.opt.xAxis.data = Glbs.wvls;
    this.opt.series = [a,b];
    this.opt.legend.data = this.opt.series.map(obj=>obj.name);

    this.loading = false;
  },

}
</script>
