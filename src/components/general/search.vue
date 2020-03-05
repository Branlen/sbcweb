<template>
  <div class="search">
    <input placeholder="请输入你想要搜索的内容" v-model="searchText" id="searchCase" @keyup.enter="submit">
    <span class="searchBut" @click="submit">搜索</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    submit() {
      console.log("tag", this.searchText);
      if (this.searchText == "") {
        this.$message("搜索内容不能为空");
      } else {
        this.$router.push("/search/" + this.searchText);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;

  #searchCase {
    width: 79%;
    -webkit-appearance: none;
    background-color: rgb(252, 252, 252);
    background-image: none;
    border-radius: 0px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 8px;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 10px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .searchs {
    width: 22%;
    span {
      width: 100%;
      background-color: #4360b5;
      padding: 6px 7px;
      box-sizing: border-box;
      color: white;
      border: 0px;
    }
  }
}
.searchBut {
  margin-left: 3%;
  width: 18%;
  height: 35px;
  border-radius: 5px;
  color: #ebeff3;
  border: 1px solid rgb(38, 148, 221);
  font-size: 8px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  padding: 0% 1%;
  background-color: rgba(8, 56, 153, 0.911);
  // margin-top: 5px;
}
</style>
