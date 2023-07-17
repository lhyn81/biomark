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
    }
}
