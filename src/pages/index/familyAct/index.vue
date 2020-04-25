<template>
    <div class="container">
        <!-- 头部 -->
        <header-view title="亲子活动"></header-view>
        <!-- 搜索 -->
        <div class="searchDiv">
            <search placeholder="活动搜索" @search="search"></search>
        </div>
        <!-- 筛选 -->
        <div class="menus">
            <van-dropdown-menu active-color="#8CC223">
                <van-dropdown-item
                    v-for="(item, index) in menuList"
                    :key="index"
                    :title="item.title"
                    :value="item.value"
                    :options="item.options"
                    @change="(e) => { return selectMenu(e, index) }"
                ></van-dropdown-item>
            </van-dropdown-menu>
        </div>
        <cart-btn :num="carNum" @btnClick="carClick"></cart-btn>
        <!-- 列表 -->
        <scroll-view
			v-if="activityList.length"
            :scroll-y="activityList"
            :style="'height:' + scrollHeight + 'rpx;'"
            class="book-list"
			@scrolltolower="scrollBottom"
        >
            <div class="activityView">
                <div
                    class="activityItem"
                    v-for="(item, index) in activityList"
                    :key="index"
                    @click="activityDetail(item)"
                >
                    <div class="imgDiv">
                        <img :src="item.frontCover" alt />
                    </div>
                    <div class="infoDiv">
                        <div class="titleDiv">
                            <div class="left">
                                <p class="title">【{{item.name}}】</p>
                                <p class="num">限制人数: {{item.totalNum}}</p>
                            </div>
                            <div class="right" @click.stop="addCar(item)">
                                <i class="iconfont icongouwuche rotateY"></i>
                                <span>购买</span>
                            </div>
                        </div>
                        <div class="timeDiv">
                            <div class="left">
                                <p>时间：{{item.startDate}} - {{item.startDate}}</p>
                                <p>地址：{{item.address}}</p>
                            </div>
                            <div class="right">
                                <p v-if="item.adultPrice">
                                    成人：
                                    <span class="amt">&yen;{{item.adultPrice}}</span>
                                </p>
                                <p v-if="item.childPrice">
                                    儿童：
                                    <span class="amt">&yen;{{item.childPrice}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loading-view">
                    <van-loading v-if="total > activityList.length" size="14px">加载中…</van-loading>
                    <no-more v-else></no-more>
                </div>
            </div>
        </scroll-view>
		<no-data v-else></no-data>
    </div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
import cartBtn from "@components/cartBtn.vue";
import noData from "@components/noData.vue";
import noMore from "@components/noMore.vue";
import wx from "@/utils/wx-api";
import { mapGetters } from "vuex";

export default {
    name: "",
    data() {
        let that = this;
        return {
            active: null,
            isMore: false,
            menuList: [],
            scrollHeight: that.getWindowHeight(80),
            carList: [],
            tabList: [],
            moreList: [],
            activityList: [],
            searchInput: "",
            page: 1,
            size: 10,
			total: 0
        };
    },
    computed: {
        ...mapGetters(["shopId"]),
        carNum() {
            return this.carList && this.carList.length;
        }
    },
    onLoad() {
        // 查询购物车
        this.queryShoppingCart();
        // 查询分类列表
        this.queryCategory();
    },
    methods: {
        search(val) {
            this.searchInput = val;
            this.refreshList();
        },
        //  查询分类列表
        queryCategory() {
            let parmas = {
                type: 2
            };
            this.$http.queryCategory(parmas).then(res => {
                let category = [];
                res.categoryVOS.forEach((item, index) => {
                    let options = [];
                    if (item.children) {
                        item.children.forEach(tip => {
                            options.push({
                                text: tip.name,
                                value: tip.id
                            });
                        });
                        category.push({
                            value: item.children[0].id,
                            title: item.name,
                            options
                        });
                    }
                });

                this.menuList = category;
                this.queryActivity();
            });
        },
        // 计算分类id列表
        calccategoryIds() {
            let ids = this.menuList.map(item => {
                return item.value;
            });
            return ids;
        },
        // 选择分类
        selectMenu(e, index) {
            this.menuList[index].value = e.mp.detail;
            this.refreshList();
        },
        // 查询活动列表
        queryActivity() {
            let parmas = {
                readingHallId: this.shopId,
                name: this.searchInput,
                categoryIds: this.calccategoryIds(),
                page: this.page,
                size: this.size
            };
            this.$http.queryActivity(parmas).then(res => {
                if (this.page === 1) {
                    this.activityList = res.activityVOS;
                } else {
                    this.activityList = [...this.bookList, ...res.activityVOS];
                }
				this.total = res.total;
				console.log(this.total);
				console.log(this.activityList.length);
				
            });
        },
        // 刷新列表
        refreshList() {
            this.page = 1;
            this.queryActivity();
        },
        // 上拉加载
        scrollBottom() {
			if(this.total === this.activityList.length) {
				return;
			}
            this.page = this.page + 1;
            this.queryActivity();
        },
        /**
         * 查看活动详情
         **/
        activityDetail(item) {
            wx.navigateTo(`/pages/index/familyAct/detail/main?id=${item.id}`);
        },
        /**
         * 查询购物车
         **/
        queryShoppingCart() {
            this.$http.queryShoppingCart().then(res => {
                this.carList = res.shoppingCartVOS;
            });
        },
        /**
         * 加入购物车
         */
        addCar(item) {
            let parmas = {
                activityId: item.id
            };
            this.$http.addShoppingCart(parmas).then(res => {
                this.queryShoppingCart();
            });
        },
        /**
         * 去购物车
         **/
        carClick() {
            wx.navigateTo("/pages/index/shopCar/main");
        }
    },
    components: {
        headerView,
        search,
        cartBtn,
		noData,
		noMore
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    .searchDiv {
        padding: 20rpx 0 10rpx 0;
    }
    .menus {
        width: 750rpx;
        overflow-x: scroll;
        overflow-y: hidden;
        /deep/ .van-dropdown-menu {
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            float: left; // 使其脱离文档流 宽度为所有字元素的和
            min-width: 100%;
            .van-dropdown-menu__item {
                float: left;
                max-width: 300rpx;
                margin-right: 10rpx;
            }
        }
    }
    .activityView {
        padding: 30rpx;
        .activityItem {
            box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
            margin-bottom: 30rpx;
            .imgDiv {
                width: 100%;
                height: 300rpx;
                img {
                    width: 100%;
                    height: 300rpx;
                }
            }
            .infoDiv {
                padding: 20rpx 10rpx;
                .titleDiv {
                    @include fj;
                    .left {
                        flex: 1;
                        .title {
                        }
                        .num {
                            padding-left: 20rpx;
                            font-size: $--text-nm;
                        }
                    }
                    .right {
                        @include fc;
                        width: 80rpx;
                        text-align: center;
                        span {
                            color: $--color-text;
                            font-size: $--text-sm;
                        }
                        .rotateY {
                            font-size: 60rpx;
                            color: $--color-primary;
                            transform: rotateY(180deg);
                        }
                    }
                }
                .timeDiv {
                    @include fj;
                    .left {
                        flex: 1;
                        padding-left: 20rpx;
                        font-size: $--text-nm;
                    }
                    .right {
                        @include fc();
                        text-align: right;
                        width: 200rpx;
                        padding-top: 20rpx;
                        p {
                            font-size: $--text-nm;
                            color: $--color-text;
                        }
                        .amt {
                            color: $--color-danger;
                            font-size: $--text-nm;
                        }
                    }
                }
            }
        }
    }
}
</style>