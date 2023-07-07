<template>
    <div class="viewNir">
      <el-select v-model="sp_name" placeholder="选择样品名称">
          <el-option
            v-for="item in sp_name_list"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      <el-select v-model="op_name" placeholder="选择检测员">
          <el-option
            v-for="item in op_name_list"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
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
        scanning:false,
        sp_name_list:[],
        sp_name:'',
        op_name_list:[],
        op_name:'',
        interval:-1,
        avg:-1
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
      this.sp_name_list = this.extlist(Glbs.settingObj['sample']['sp_name']);
      this.op_name_list = this.extlist(Glbs.settingObj['sample']['op_name']);
    }
  }
</script>


<style>
.viewNir {
  padding: 20px;
}
</style>