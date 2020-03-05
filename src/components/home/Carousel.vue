<template>
  <div class="blocks">
    <el-carousel height="300px">
      <el-carousel-item v-for="item in carouselInfo" :key="item.url">
        <img
          :src="'http://123.56.11.253:8181/sbcweb/'+item.pictureUrl"
          alt
          @click="goDetail(item)"
        >
        <h3>{{item.pictureUrl}}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselInfo: []
    };
  },
  methods: {
    getCarouselInfo() {
      this.$http
        .get(`/sbcweb/article/listCarousel`)
        .then(result => {
          if (result.body.status == 200) {
            console.log("tagss", result.body.data);
            this.carouselInfo = result.body.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //判断是否是外链接
    goDetail(item) {
      console.info("tag", item);
      if (item.isOutside) {
        window.location.href = item.outsideUrl;
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
    // setStyle(){
    //   var butw = document.getElementsByClassName('el-carousel__button') ;console.log('ts ag', butw);
    //   butw.style.width ='5px';

    //  Array.prototype.forEach.call(document.getElementsByClassName('el-carousel__button'),function(item){
    //       item.style.fontWeight = 'bold';
    //   });
    // }
  },
  created() {
    this.getCarouselInfo();
  },
  mounted() {
    // this.setStyle();
  }
};
</script>

<style lang='less' >
.blocks {
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item img {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.el-carousel__indicator--horizontal {
  .el-carousel__button {
    width: 24px;
  }
}
</style>