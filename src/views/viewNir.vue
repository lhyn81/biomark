<template>
    <div class="viewNir" 
    v-loading="loading"
    element-loading-text="加载配置中,请等待..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <div>
        <span style="width: 100px;">样品名称</span>
        <el-select v-model="sp_name" placeholder="选择样品名称">
          <el-option
            v-for="item in sp_name_list"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="width: 100px;">操作员</span>
        <el-select v-model="op_name" placeholder="选择检测员">
          <el-option
            v-for="item in op_name_list"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>默认积分时间</span><el-input-number v-model="interval" :step="100" :min="100" :max="1000" step-strictly></el-input-number>
        <span>默认采样次数</span><el-input-number v-model="avg" :step="1" :min="5" :max="10" step-strictly></el-input-number>
      </div>
      <div>
        <el-tabs :tab-position="left" style="height: 500px;">
          <el-tab-pane label="反射值">
            <CmpPlot ref="nir_raw"></CmpPlot>
          </el-tab-pane>
          <el-tab-pane label="吸收率">
            <CmpPlot ref="nir_ref"></CmpPlot>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
import CmpPlot from '@/components/cmpPlot.vue';
import Glbs from '@/components/glb.js';


export default {

    components :{
      CmpPlot
    },

    data() {
      return {
        loading:true,
        scanning:false,
        sp_name_list:[],
        sp_name:'',
        op_name_list:[],
        op_name:'',
        interval:-1,
        avg:-1,
      }
    },

    methods:{
      extlist(rawlist) {
        let rlt=[];
        for (let i = 0; i < rawlist.length; i++) {
          rlt.push({
            "label":rawlist[i],
            "value":rawlist[i],
          })
        }
        return rlt;
      }
    },

    mounted() {
      setInterval(() => {
        this.sp_name_list = this.extlist(Glbs.settingObj['sample']['sp_name']);
        this.op_name_list = this.extlist(Glbs.settingObj['sample']['op_name']);
        this.interval = Glbs.settingObj['nir']['interval'];
        this.avg = Glbs.settingObj['nir']['avg'];
        this.loading=false;
      }, 3000);
    }
  }
</script>


<style>
.viewNir {
  padding: 20px;
}
</style>