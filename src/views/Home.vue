<template>
  <div id="home">
    <van-search placeholder="搜索商品，共27719款好物" v-model="searchData" input-align="center" />
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" :width="375" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="banner" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <van-grid :column-num="5" :border="false" :icon-size="55">
      <van-grid-item
        v-for="(item, id) in channel"
        :key="id"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>
    <!-- 品牌供应商 -->
    <div class="brandList">
      <van-panel class="panel_title" title="品牌制造商直供">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, id) in brandList" :key="id">
            <van-image lazy-load :src="item.new_pic_url" />
            <h4 class="title">{{item.name}}</h4>
            <p class="price">{{item.floor_price}}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 新品首发 -->
    <div class="newGoodsList">
      <van-panel class="panel_title" title="品牌制造商直供">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, id) in newGoodsList" :key="id">
            <van-image lazy-load :src="item.list_pic_url" />
            <h4 class="title van-ellipsis">{{item.name}}</h4>
            <p class="price">{{item.retail_price}}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 人气 -->
    <div class="hotGoodsList">
      <van-panel class="panel_title" title="人气推荐">
        <van-card
          v-for="(item, index) in hotGoodsList"
          :key="index"
          :price="item.retail_price"
          :desc="item.goods_brief"
          :title="item.name"
          :thumb="item.list_pic_url"
        ></van-card>
      </van-panel>
    </div>
    <div style="height:55px"></div>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">专题</van-tabbar-item>
      <van-tabbar-item icon="friends-o">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  data() {
    return {
      searchData: "",
      brandList: [],
      newGoodsList: [],
      hotGoodsList: [],
      active:0,
      data: {}
    };
  },
  computed: {
    images: function() {
      return this.data.banner ? this.data.banner : [];
    },
    channel: function() {
      return this.data.channel ? this.data.channel : [];
    }
  },
  async mounted() {
    let result = await axios.get(api.IndexUrl);
    console.log(result.data);
    if (result.data.data) {
      this.data = result.data.data;
      this.brandList = this.data.brandList;
      this.newGoodsList = this.data.newGoodsList;
      this.hotGoodsList = this.data.hotGoodsList;
    }
  }
};
</script>
<style lang='less' scoped>
#home {
  .banner {
    width: 100%;
    height: 100%;
  }
  .panel_title {
    .van-cell__title {
      font-size: 16px;
    }
  }
  .brandList {
    /deep/.van-grid-item__content {
      padding: 0;
    }
    .van-image {
      border: 1px solid #fff;
    }
    .title {
      position: absolute;
      top: 20px;
      left: 10px;
    }
    .price {
      position: absolute;
      top: 40px;
      left: 10px;
      font-size: 14px;
      color: #999;
    }
  }
  .newGoodsList {
    .title {
      width: 170px;
    }
    // /deep/.van-grid-item {
    //   box-sizing: border-box;
    // }
  }
  .hotGoodsList {
    .van-card__content {
      justify-content: center;
      padding-left: 10px;
      text-align: left;
      .van-card__title {
        font-weight: 800;
        font-size: 14px;
        padding: 6px 0;
      }
      .van-card__price {
        color: red;
      }
    }
  }
}
</style>