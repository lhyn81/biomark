<template>
    <div>
        <p style="font-size: medium;">{{myTitle}}</p>
        <el-tag
            :key="tag"
            v-for="tag in innerTags"
            size="large"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="default"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
        </el-input>
        <el-button v-else class="button-new-tag" size="midium" @click="showInput">新建条目</el-button>
    </div>
</template>

<script>
export default {

    props:["myTitle"],

    data() {
      return {
        innerTags: ["unset"],
        inputVisible: false,
        inputValue: ''
      };
    },

    methods: {

      handleClose(tag) {
        this.innerTags.splice(this.innerTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.innerTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      setTags(tags) {
        this.innerTags = tags;
      },

      getTags() {
        return this.innerTags;
      }
    }
}
</script>

<style>
.custom-collapse-item .el-collapse-item__header {
  font-size:larger;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.el-tag + .el-tag {
    margin-left: 10px;
  }

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin: 10px;
  vertical-align: left;
}

</style>