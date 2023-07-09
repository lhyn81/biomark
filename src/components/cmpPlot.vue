<template>
  <div ref="mychart" style="width: 600px; height: 400px; background: #fff"></div>
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
    drawLine(id) {
      this.charts = echarts.init(this.$refs.mychart);
      this.charts.setOption(this.option);
    },

    setdata(thedata) {
      this.option.series[0].data = thedata[0];
      this.option.series[1].data = thedata[1];
      this.drawLine();
    },
  },

  mounted() {
    this.$nextTick(function () {
      this.drawLine();
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
