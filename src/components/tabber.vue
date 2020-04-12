<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  mounted() {
      switch (this.$route.path) {
        default:
          this.active = 0;
        case "/":
          this.active = 0;
          break;
        case "/category":
          this.active = 2;
          break;
      }
  },
  watch: {
   
  }
};
</script>
<style lang='less' scoped>
</style>