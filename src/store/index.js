import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from "axios";
import api from "../assets/config/api";
export default new Vuex.Store({
  state: {
    cartTotal: {
      goodsCount: 0,
      goodsAmount: 0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    },
    cartList:[]
  },
  mutations: {
    setCartList(state,cartList){
      state.cartList=cartList
    },
    setCartTotal(state,cartTotal){
      state.cartTotal=cartTotal
    }
  },
  actions: {
    // 获取购物车列表
    async getCartList(content){
      let res = await axios.get(api.CartList);
      content.commit('setCartList',res.data.data.cartList)
      content.commit('setCartTotal',res.data.data.cartTotal)
      console.log(res.data)
    }
  },
  modules: {}
})