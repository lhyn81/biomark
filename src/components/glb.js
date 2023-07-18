var wvl_list=[];
var dx = (1700-900)/128
for (let i=0; i<128; i++)
{
    wvl_list.push(900+i*dx);
}
export default {
    settingObj:null,
    modelInfo:null,
    iconColorA:"#2c3e50",
    iconColorB:"#ecf0f1",
    wvls:wvl_list,
    baseOption:{
        color:['#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        legend:{
            show:true
        },
        title: {
            text: "主标题",
            subtext: "副标题",
            left: "center",
            top: "center",
            textStyle: {
                fontSize: 30,
                color:'rgba(128, 128, 128, 0.5)',
            },
            subtextStyle: {
                fontSize: 20,
                color:'rgba(128, 128, 128, 0.5)',
            }
        },
        grid:{
            bottom:"10%",
            left:"10%"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left:'20%',
          data: []
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [],
        toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              dataView: {
                readOnly: false
              },
              magicType: {
                type: ["line", "bar"]
              },
              restore: {},
            }
          },
    },
    guid: function fn(prefix) {
        return prefix + (Math.floor(Date.now() / 1000)).toString();
    },
    genTs: function fn(){
        const timestamp = Math.floor(Date.now() / 1000);
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();    
    }
}
