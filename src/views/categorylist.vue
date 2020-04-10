<template>
  <div class="categoryList">
    <van-tabs v-model="tabActive">
      <van-tab v-for="(item,index) in currentCategoryList" :key="index" :title="item.name">
        <div class="title">
          <h4>{{ item.name }}</h4>
          <p>{{item.front_desc}}</p>
        </div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  props: ["id"],
  data() {
    return {
      tabActive: 0,
      currentCategoryList: []
    };
  },
  watch: {
    tabActive: async function(index) {
      console.log(index);
      let id = this.currentCategoryList[index].id;
      let page = 1,
        size = 20;
        this.getGoodsList()
     
      console.log(res)
    }
  },
  mounted() {
    this.getGoodsCategory();
    console.log(this.id);
  },
  methods: {
    async getGoodsCategory() {
      let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
      console.log(res.data);
      this.currentCategoryList = res.data.data.brotherCategory;
    },
    getGoodsList(id,page){
         let res = await axios.get(api.GoodsList, { params: { categoryId:id, page, size } });
    }
  }
};
</script>
<style lang='less' scoped>
.categoryList {
  .title {
    h4 {
      margin: 10px 0;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>