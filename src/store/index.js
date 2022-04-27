import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    size: 6,
    goodsList: [],
    type: null,
    counterMap: {},
  },
  mutations: {
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[value] === 1) {
          Vue.delete(state.counterMap[id]);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goodsnum', JSON.stringify(state.counterMap));
    },
    setcounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setGoodsList(state, list) {
      state.goodsList = [...list, ...state.goodsList];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsListType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      const value = await api.getSideList(type);
      commit('setSideList', value);
      // console.log(value);
    },
    async getGoodsList({ state, commit }, opations) {
      const { page, sortType } = opations;
      const type = opations.type || state.type;
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      commit('setGoodsList', list);
      commit('setGoodsListType', type);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;

      // console.log(list);
      // console.log(type);
    },
  },
  modules: {
  },
});
