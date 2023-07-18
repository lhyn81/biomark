export default {
    settingObj:null,
    modelInfo:null,
    iconColorA:"#2c3e50",
    iconColorB:"#ecf0f1",
    guid: function fn(prefix) {
        return prefix + (Math.floor(Date.now() / 1000)).toString();
    },
    genTs: function fn(){
        const timestamp = Math.floor(Date.now() / 1000);
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();    
    },
    baseOption : {
        // 全局文字
        textStyle:{

        },
        // 数据系列颜色值, 顺序取值
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        // 居中半透明标题
        title: {
            text: "折线主标题",
            subtext: "折线副标题",
            left: "center",
            top: "center",
            textStyle: {
                fontSize: 30,
                color: 'rgba(128, 128, 128, 0.5)'
            },
            subtextStyle: {
                fontSize: 20,
                color: 'rgba(128, 128, 128, 0.5)'
            }
        },
        // 图例符号
        legend: {
            top: '5%',
            left: 'center'
        },
        // X轴
        xAxis: [{
            type: "category",
            data: []
        }],
        // Y轴
        yAxis: [{
            type: "value",
            smooth: true
        }],
        // 数据
        series:[
            {

            }
        ],
        // 图工具
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
              saveAsImage: {}
            }
        },
    }

}
