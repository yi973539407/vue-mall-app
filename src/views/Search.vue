<template >
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router. goback()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showList">
          <div @touchend="onSearch(value)">
            搜索
          </div>
        </template>
        <template #action v-else>
          <van-icon name='cart-o' id="shop-Car" class='shop-car'
          @click="$router.push('/Home/Shopping')"
          :badge="badge" />
        </template>
      </van-search>
    </div>
    <div class='like-search' v-if='likeList.length&&showList'>
        <van-list>
            <van-cell
            v-for='item in likeList'
            :key='item'
            @click='onSearch(item)'
            >

                <template>
                    <span class='custom-title' v-html='formatHTML(item)'></span>
                </template>
            </van-cell>
        </van-list>
    </div>
    <div class="goods-list" v-if='!showList'>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check='false'
        >
        <GoodsCard v-for="item in goodsList" :key="item.id"
        v-bind="item"
        :num = "counterMap[item.id]"/>
        </van-list>
    </div>
    <div class="history" v-if="likeList.length<=0 && showList">
      <MyHisroty :searchList='searchList' @search="onSearch" />
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/GoodsCard.vue';
import MyHisroty from '@/components/MyHistory.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      paeg: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
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
  components: {
    GoodsCard,
    MyHisroty,
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  methods: {

    onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length > 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));

      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      // this.showList = true;
    },
    async onLoad() {
      this.showList = false;
      const value = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    // 防抖
    async input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  margin-top:55px;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position:fixed;
    top:0px;
    left:15px;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car{
        font-size: 15px;
      }
    }
  }
  .like-search{
      position: relative;
      top:50px;
      width: 100%;
      box-sizing: border-box;
      padding-left:30px;
  }
  .goods-list{
    position: relative;
    width: 345px;
    margin:48px auto 0px;
    z-index: 10;
    background: #fff;
  }
  .history {
    width:350px;
    position: absolute;
    top:10px;
    left:10px;
    z-index: 1;
  }
}
</style>
