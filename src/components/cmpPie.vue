<template>
    <div ref="chartbone" style="width: 800px; height: 400px; background: #b6b2b2"></div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    name: "",
  
    data() {
      return {
        pid: "",
        charts: "",
        theData: [150, 230, 224, 218, 135, 147, 260],
        option: {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: [],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [],
              type: "line",
            },
            {
              data: [],
              type: "line",
            },
          ],
        },
      };
    },
  
    methods: {
    },
  
    mounted() {
      this.$nextTick(function () {
        this.charts = echarts.init(this.$refs.mychart);
        this.charts.setOption(this.option);
      });
    },
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  </style>
  