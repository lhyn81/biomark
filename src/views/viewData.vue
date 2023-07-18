<template>
  <el-scrollbar height="600px">
    <el-card class="card">
      <div class="box-card">
        <div class="item sub sub1">
          <div class="text">样本总量</div>
          <div class="digit">12345</div>
        </div>
        <div class="item sub sub2">内容2</div>
        <div class="item sub sub3"><CmpChart ref="chart_pie" style="height: 100%; width: 100%;" :the-option="opt"></CmpChart></div>
      </div>
    </el-card>
    <el-card class="card">
      <div class="box-card">
        <div class="item sub sub1">
          <div class="text">测试总量</div>
          <div class="digit">12345</div>
        </div>
        <div class="item sub sub2">内容2</div>
        <div class="item sub sub3"><CmpChart ref="chart_line" style="height: 100%; width: 100%;"  :the-option="opt"></CmpChart></div>
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
      opt:JSON.parse(JSON.stringify(Glbs.baseOption))
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
    this.opt.xAxis.data = Glbs.wvls;
    this.opt.series = [a,b];
    this.opt.legend.data = this.opt.series.map(obj=>obj.name);
    this.loading = false;
  },
}
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
