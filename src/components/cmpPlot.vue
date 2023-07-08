<template>
    <div id="main" style="width:600px; height: 400px; background:#fff">
    </div>
</template>
   
  <script>
  import * as echarts from 'echarts'
  export default {
          name: '',
          props : ["title"],
          data() {
              return {
                  charts: '',
                  theData: [150, 230, 224, 218, 135, 147, 260],
                  option:{
                        xAxis: {
                            type: 'category',
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: [],
                            type: 'line'
                            },
                            {
                            data: [],
                            type: 'line'
                            },
                        ]
                        }
              }
          },

          methods: {
              drawLine(id) {
                  this.charts = echarts.init(document.getElementById(id))
                  this.charts.setOption(this.option);
              },

              setdata(thedata){
                this.option.series[0].data = thedata[0];
                this.option.series[1].data = thedata[1];
                this.drawLine('main');
              }
          },
          //调用
          mounted() {
              this.$nextTick(function() {
                  this.drawLine('main')
              })
          }
      }
  </script>
   
<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>