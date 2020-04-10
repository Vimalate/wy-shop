<template>
  <div class="categoryList">
    <van-tabs v-model="tabActive">
      <van-tab v-for="(item,index) in currentCategoryList" :key="index" :title="item.name">
        <div class="title">
          <h4>{{ item.name }}</h4>
          <p>{{item.front_desc}}</p>
        </div>
        <van-grid :border="false" :column-num="2">
          <div v-if="item.plist">
            <van-grid-item v-for="(ite,index) in item.plist.data" :key="index">
              <van-image lazy-load :src="ite.list_pic_url" />
              {{ite.name}}
            </van-grid-item>
          </div>
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
  //   watch: {
  //     tabActive: function(index) {
  //       console.log(index);
  //       let id = this.currentCategoryList[index].id;
  //       let page = 1
  //       let size = 20;
  //       this.getGoodsList(id, page,size);
  //     }
  //   },
  mounted() {
    this.getGoodsCategory();
    console.log(this.id);
  },
  methods: {
    async getGoodsCategory() {
      let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
      console.log(res.data);
      this.currentCategoryList = res.data.data.brotherCategory;
      let id = this.currentCategoryList[0].id;
      let page = 1;
      let size = 20;
      this.currentCategoryList.forEach(async (item, index) => {
        item.plist = await this.getGoodsList(item.id, page, size);
        console.log(item.plist);
      });
    },
    async getGoodsList(id, page, size) {
      let res = await axios.get(api.GoodsList, {
        params: { categoryId: id, page, size }
      });
      return res.data.data;
      console.log(res);
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