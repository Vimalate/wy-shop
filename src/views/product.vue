<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  props: ["id"],
  data() {
    return {};
  },
  mounted() {
    this.getGoodsDetail();
  },
  methods: {
    async getGoodsDetail() {
      let res = await axios.get(api.GoodsDetail, { params: { id: this.id } });
      console.log(res);
    },
    onClickLeft(){
      
    }
  }
};
</script>
<style lang='less' scoped>
</style>