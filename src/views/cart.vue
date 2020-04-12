<template>
  <div class="cart">
    <div class="goodsInfo">
      <span>30天无忧退换</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 商品列表 -->
    <div class="cartList">
      <div class="cartItem" v-for="(item,index) in cartList" :key="index">
        <van-checkbox @change="isChecked($event,item)" v-model="item.checked"></van-checkbox>
        <van-image fit="cover" width="80" height="80" lazy-load :src="item.list_pic_url" />
        <div class="cartinfo">
          <div class="title">
            <span class="name">{{item.goods_name}}</span>
            <span class="num">x {{item.number}}</span>
          </div>
          <p class="brief">{{item.goods_specifition_name_value}}</p>
          <p class="price">￥ {{item.retail_price}}</p>
        </div>
      </div>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "../assets/config/api";
import axios from "axios";
const state = mapState(["cartTotal", "cartList"]);
export default {
  data() {
    return {};
  },
  computed: {
    ...state,
    checkedAll: {
      set() {},
      get() {
        if (this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  mounted() {
    this.getList();
    console.log(this.cartList);
  },
  methods: {
    ...mapActions({
      getList: "getCartList"
    }),
    onSubmit() {
      this.$router.push('/address')
    },
    async isChecked(event, item) {
      console.log(event, item);
      let res = await axios.post(api.CartChecked, {
        isChecked: Number(event),
        productIds: item.product_id
      });
      console.log(res)
      this.getList();
    }
  }
};
</script>
<style lang='less' scoped>
.goodsInfo {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #999;
  height: 24px;
  line-height: 24px;
  background-color: #efefef;
  span {
    position: relative;
  }
  span::before {
    content: "";
    display: block;
    position: absolute;
    left: -10px;
    top: 8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid red;
  }
}
.cartItem {
  display: flex;
  align-items: center;
  padding: 10px;
  .van-image {
    background-color: #efefef;
  }
  .van-checkbox {
    margin: 0 5px;
  }
  .cartinfo {
    padding: 0 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 14px;
    height: 70px;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .brief {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>