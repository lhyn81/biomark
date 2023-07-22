var wvl_list=[];
var dx = (1700-900)/128
for (let i=0; i<128; i++)
{
    wvl_list.push(900+i*dx);
}
export default {
    settingObj:null,
    modelInfo:null,
    wvls:wvl_list,
    baseOption:{
        color:['#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        legend:{
            show:true
        },
        title: {
            text: "",
            subtext: "",
            left: "center",
            top: "30%",
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
            left:"5%"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left:'5%',
          top:'3%',
          data: []
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
        ],
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
    basePieOpt:{
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
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
