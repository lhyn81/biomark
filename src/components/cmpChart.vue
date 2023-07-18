<template>
    <div ref="mychart" style="width: 100%; height: 100%;"></div>
</template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    name: "",

    props:[
        "theOption"
    ],

    data() {
      return {
        charts: null,
        }
    },
  
    methods: {
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
  