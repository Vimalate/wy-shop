<template>
  <div class="category">
    <van-search placeholder="搜索商品，共27719款好物" v-model="searchData" input-align="center" />
    <!-- 商品列表 -->
    <van-tree-select height="calc(100vh-114px)" :items="categoryList" :main-active-index.sync="activeIndex" @click-nav='selectItem'>
      <template #content>
        
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
      subCategoryList:[]//子列表
    };
  },
  async mounted() {
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
        // 获取子列表
        this.subCategoryList=this.categoryList[this.activeIndex].subCategoryList
      } else {
        return [];
      }
    } else {
      return [];
    }
  },
  methods: {
    selectItem(index){
      console.log(index)
      this.activeIndex=index

    },
    getCategoryList(){
      
    }
  },
  components: {
    tabbarBtn
  }
};
</script>
<style lang='less' scoped>
</style>