<template>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/" >首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/Home/Classify">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/Home/Shopping"
      :badge="badge"
      id="shop-Car"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/Home/My">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>
</style>
