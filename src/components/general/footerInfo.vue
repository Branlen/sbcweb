<template>
  <div class="footerCom">
    <div class="line"></div>
    <div class="footerContent">
      <p>Copyright© 2018-2019 广东海洋大学资产与实验室管理处 All Rights Reserved.</p>
      <p>地址：广东省湛江市麻章区海大路1号 &nbsp;&nbsp; 邮编：524088</p>
      <p>电话：（0759）2383099 &nbsp;&nbsp;传真：（0759）2383099&nbsp;&nbsp; Email：sbc@gdou.edu.cn</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@media screen and (max-width:769px) {
  .footerCom {
  margin-top: 2%;
  width: 100%;
  height: 80px;
  .line {
    background-color: rgb(245, 231, 231);
    width: 100%;
    height: 2%;
  }
  .footerContent {
    background-color: #204bb0;
    text-align: center;
    height: 98%;
    color: whitesmoke;
    font-size: 5px;
    padding-top: 1.5%;
  }
}
}
@media screen and (min-width:769px){
  .footerCom {
  margin-top: 2%;
  width: 100%;
  height: 80px;
  .line {
    background-color: rgb(245, 231, 231);
    width: 100%;
    height: 2%;
  }
  .footerContent {
    background-color: #204bb0;
    text-align: center;
    height: 98%;
    color: whitesmoke;
    font-size: 13px;
    padding-top: 1.5%;
  }
}
}

</style>
