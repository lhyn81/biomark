export default {
    settingObj:null,
    guid: function fn(prefix) {
        return prefix + (Math.floor(Date.now() / 1000)).toString();
    },
    genTs: function fn(){
        const timestamp = Math.floor(Date.now() / 1000);
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();    
    }
}
