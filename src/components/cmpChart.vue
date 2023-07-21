<template>
    <div ref="mychart" :style="`width:${mysize.width}; height:${mysize.height}`"></div>
</template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    name: "",

    props:{
      "theOption" : null,
      "mysize"  : {
        type:Object,
        default:{
          width:'100%',
          height:'100%'
        }
      }  
    },

    data() {
      return {
        charts: null,
        }
    },
  
    methods: {
    setdata() {
      this.charts.setOption(this.theOption);
    },
  },
  
    mounted() {
      this.$nextTick(function () {
        this.charts = echarts.init(this.$refs.mychart);
        this.charts.setOption(this.theOption);
      });
    },

  };
  </script>
  
  <style scoped>
  </style>
  