<template>
    <div ref="mychart" style="width: 800px; height: 400px;"></div>
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
  