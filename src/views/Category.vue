<template>
  <div class="category">
    <van-search placeholder="搜索商品，共27719款好物" v-model="searchData" input-align="center" />
    <!-- 商品列表 -->
    <van-tree-select
      height="calc(100vh-114px)"
      :items="categoryList"
      :main-active-index.sync="activeIndex"
      @click-nav="selectItem"
    >
      <template #content>
        <div class="banner_Img">
          <van-image width="100%" fit="cover" lazy-load :src="bannerImg"></van-image>
        </div>
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(item, id) in subCategoryList"
            :key="id"
            :icon="item.wap_banner_url"
            :text="item.name"
            :to="'/categoryList/'+item.id"
          />
        </van-grid>
      </template>
    </van-tree-select>

    <tabbar-btn></tabbar-btn>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
import tabbarBtn from "../components/tabber";
export default {
  data() {
    return {
      searchData: "",
      activeIndex: 0,
      categoryList: [],
      subCategoryList: [],
      bannerImg: ""
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    selectItem(index) {
      // console.log(index);
      this.activeIndex = index;
      // this.getCategoryList();
      this.getCategorySubByCategoeyId();
    },
    // 获取商品分类
    async getCategoryList() {
      let res = await axios.get(api.CatalogList);
      console.log(res.data);
      if (res.data.data) {
        this.data = res.data.data;
        if (this.data.categoryList) {
          // items: [{ text: '分组 1' }, { text: '分组 2' }]
          this.data.categoryList.forEach(element => {
            element.text = element.name;
            this.categoryList.push(element);
          });
          // console.log(this.categoryList[0].id);
          this.getCategorySubByCategoeyId();
          console.log(this.data.currentCategory);
          this.bannerImg = this.data.currentCategory.banner_url;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    // 获取商品分类子列表
    async getCategorySubByCategoeyId() {
      // console.log(res);
      if (this.categoryList) {
        // 根据 id 获取子列表
        let id = this.categoryList[this.activeIndex].id;
        console.log(id);
        let res = await axios.get(api.CatalogCurrent, { params: { id } });
        console.log(res);
        this.subCategoryList = res.data.data.currentCategory.subCategoryList;
        this.bannerImg = this.categoryList[this.activeIndex].img_url;
        console.log(this.bannerImg);
      } else {
        this.subCategoryList = [];
      }
    }
  },
  components: {
    tabbarBtn
  }
};
</script>
<style lang='less' scoped>
.category {
  .banner_Img {
    height: 75px;
  }
}
</style>