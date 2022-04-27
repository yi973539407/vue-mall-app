<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goodsnum')) || {};
    this.$store.commit('setcounterMap', counterMap);
  },
};
</script>

<style lang="less">
*{
  margin:0;
  padding:0;
}
#app{
  width:375px;
  height: 100px;
}
</style>
