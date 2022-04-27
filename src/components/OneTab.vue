<template>
  <div class="OneTab-wrapper" ref="oneTab">
    <div class="tab-items"
     v-for="( x, i ) in menulist"
    :key="x.title"
    :class="{active: index === i}"
    @touchend="scrollTo(i,$event)"
    @touchstart ="move=false"
    @touchmove="move=true"
    ref=""
    >
        <div class="img-wrapper">
            <img :src="x.imgURL">
        </div>
        <div class="title-wrapper">
            {{x.title}}
        </div>
    </div>
  </div>
</template>

<script>
import move from '@/utils/move';
// import { mapActions } from 'vuex';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menulist: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    // ...mapActions(['getSideList']),
    scrollTo(i, e) {
      // move去判断有没有在滑动
      if (this.move) {
        return;
      }
      this.index = i;
      // console.log(e);
      const { oneTab } = this.$refs;
      const oneTabwidth = oneTab.offsetWidth;
      const selfwidth = e.target.offsetWidth;
      const leftwidth = e.target.getBoundingClientRect().left;
      move.moveTo(oneTab.scrollLeft, leftwidth + selfwidth / 2 - oneTabwidth / 2,
        oneTab, 'scrollLeft');
      // 获取左侧菜单栏
      // this.getSideList(this.menulist[i].title);
      this.$store.dispatch('getSideList', this.menulist[i].title);
    },

  },
  created() {
    this.$store.dispatch('getSideList', this.menulist[0].title);
  },
};
</script>

<style lang="less" scoped>
.OneTab-wrapper {
  width: 375px;
  height: 104px;
  display: flex;
  overflow: scroll;
  .tab-items {
    width: 50px;
    height: 70px;
    padding:10px 5px;
    .img-wrapper{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-width: 2px;
        border-style:solid;
        border-color: #fff;
        border-radius: 23px;
        img{
            width: 45px;
            height:45px;
            border-radius: 50%;
            align-self:center;
        }
    }
    .title-wrapper{
        text-align: center;
        font-size: 12px;
        margin-top:5px;
    }
  }
  .active{
      .img-wrapper{
          border-color: #d13193;
      }
      .title-wrapper{
        color:#fff;
        background:#d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }

}
.OneTab-wrapper::-webkit-scrollbar{
    width: 0;
    background: none;
}
</style>
