<template>
  <div class="product">
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="goodsBanner" v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="goodsInfo">
      <span>30天无忧退换</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 商品信息 -->
    <div class="info">
      <h3>{{info.name}}</h3>
      <p class="brief">{{info.goods_brief}}</p>
      <p class="price">￥{{info.retail_price}}</p>
    </div>
    <van-cell title="请选择商品规格数量" is-link />
    <!-- 商品参数 -->
    <div class="product_attribute">
      <h4>商品参数</h4>
      <div class="item_attribute" v-for="(item, id) in attribute" :key="id">
        <span class="title">{{item.name}}</span>
        <span class="value">{{item.value}}</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="goodsDetail" v-html="info.goods_desc"></div>
    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon :info="$store.state.cartTotal.goodsCount==0?'':$store.state.cartTotal.goodsCount" icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" />
      <van-goods-action-button type="warning" @click="addCard" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- sku -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: "颜色", // skuKeyName：规格类目名称
      v: [
        {
          id: "30349", // skuValueId：规格值 id
          name: "红色" // skuValueName：规格值名称
        },
        {
          id: "1215",
          name: "蓝色"
        }
      ],
      k_s: "s-1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "1", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "2", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 110 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "2", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "3", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 110 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "2", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "4", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 130 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "1", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "4", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 130 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "3", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "1", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 100 // 当前 sku 组合对应的库存
    }
  ],
  price: "100.00", // 默认价格（单位元）
  stock_num: 227 // 商品总库存
  // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
  // none_sku: false, // 是否无规格商品
  // hide_stock: false // 是否隐藏剩余库存
};
import axios from "axios";
import api from "../assets/config/api";
export default {
  props: ["id"],
  data() {
    return {
      goodsData: {},
      images: [],
      info: "",
      attribute: [],
      show: false, //是否显示sku
      sku,
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      }
    };
  },
  created() {
    this.$store.dispatch('getCartList')
  },
  mounted() {
    
    this.getGoodsDetail();
  },
  methods: {
    async getGoodsDetail() {
      let res = await axios.get(api.GoodsDetail, { params: { id: this.id } });
      this.data = res.data.data;
      this.images = this.data.gallery ? this.data.gallery : [];
      this.info = this.data.info;
      this.attribute = this.data.attribute;
      this.goods.picture = this.info.primary_pic_url;
      this.goods.title = this.info.name;
      this.sku.price = this.info.retail_price;
      this.sku.stock_num = this.info.goods_number;
      let tree = []; //商品sku

      if (this.data.specificationList) {
        this.data.specificationList.forEach(item => {
          let arr = [];
          item.valueList.forEach(ite => {
            arr.push({
              id: ite.id, // skuValueId：规格值 id
              name: ite.value // skuValueName：规格值名称
            });
            return arr;
          });
          tree.push({
            k: item.name, // skuKeyName：规格类目名称
            v: arr,
            k_s: "s-" + item.specification_id // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          });
        });
        this.sku.tree = tree;
      }

      console.log(res);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onBuyClicked() {},
    async onAddCartClicked(skuData) {
      // 添加到购物车，发送数据给后端
      let chooseContent =
        skuData.selectedSkuComb["s-1"] + "_" + skuData.selectedSkuComb["s-2"];
      let result = this.data.productList.filter(
        item => item.goods_specification_ids === chooseContent
      );
      console.log(skuData);
      console.log(result);
      // 所选商品数据发送给后端
      let res = await axios.post(api.CartAdd, {
        goodsId: result[0].goods_id,
        number: skuData.selectedNum,
        productId: result[0].id
      });
      console.log(res);
      this.$store.commit("setCartList", res.data.data.cartList);
      this.$store.commit("setCartTotal", res.data.data.cartTotal);
      this.show = false;
    },

    // 显示购物车弹框
    addCard() {
      this.show = true;
    }
  }
};
</script>
<style lang='less' scoped>
.product {
  .goodsBanner {
    width: 100%;
  }
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
  .info {
    h3 {
      font-weight: 500;
      padding: 8px 0 5px 0;
    }
    .brief {
      font-size: 14px;
      color: #999;
      padding: 3px;
    }
    .price {
      padding: 5px;
      font-size: 16px;
      color: red;
    }
  }
  .van-cell__title {
    text-align: left;
    padding-left: 10px;
  }
  .product_attribute {
    h4 {
      margin-bottom: 10px;
    }
    .item_attribute {
      border-radius: 4px;
      padding: 5px 10px;
      width: 90vw;
      margin: 0 auto;
      display: flex;
      height: 24px;
      font-size: 12px;
      color: #999;
      background-color: #efefef;
      line-height: 24px;
      justify-content: space-between;
    }
  }
  .goodsDetail {
    margin-top: 10px;
    font-size: 0;
    width: 100%;
    /deep/img {
      width: 375px;
    }
  }
}
</style>