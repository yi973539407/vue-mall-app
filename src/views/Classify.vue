<template>
  <div class="classify-wrapper">
    <router-link class="search" to="/Search" tag="div">
      <van-icon name="search" />
      <div >新鲜荔枝9.9/一斤</div>
    </router-link>
    <OneTab />
    <SideBar />
    <GoodsList />
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
  width: 375px;
  .search {
    width: 375px;
    height: 33px;
    background: #eee;
    margin: 11px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #a1a1a1;
  }
}
</style>
