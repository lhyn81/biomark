<template>
  <el-scrollbar height="600px" v-loading="loading" element-loading-text="数据加载中..."
  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card class="card">
      <div class="box-card">
        <div class="item sub sub1">
          <div class="text">样本总量</div>
          <div class="digit">12345</div>
        </div>
        <div class="item sub sub2"><CmpChart ref="chart_pie_smp" style="height: 100%; width: 100%;" :the-option="opt_pie_smp"></CmpChart></div>
        <div class="item sub sub3"><CmpChart ref="chart_line_smp" style="height: 100%; width: 100%;" :the-option="opt_line_smp"></CmpChart></div>
      </div>
    </el-card>
  </el-scrollbar>
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
      loading: false,
      opt_line_smp:JSON.parse(JSON.stringify(Glbs.baseOption)),
      opt_pie_smp:JSON.parse(JSON.stringify(Glbs.basePieOpt))
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
    this.opt_line_smp.xAxis.data = Glbs.wvls;
    this.opt_line_smp.series = [a,b];
    this.opt_line_smp.legend.data = this.opt_line_smp.series.map(obj=>obj.name);

    
  },
}
</script>

<style scoped>
  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .text {
    font-size: 20px;
    margin: 3px;
  }
  .digit{
    font-size: 40px;
    margin: 3px;
    color: #8e4506;
  }
  .card{
    margin: 10px;
  }
  .box-card {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  .item {
    flex: auto; /* 均分宽度 */
    text-align: center; /* 水平居中 */
    height: 300px;
  }
  .sub {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  .sub1{
    width: 20%;
  }
  .sub2{
    width: 30%;
  }
  .sub3{
    width: 50%;
  }
</style>
