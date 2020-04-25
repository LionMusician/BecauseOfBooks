<template>
    <div class="container">
        <!-- 头部 -->
        <header-view title="绘本推荐"></header-view>
        <!-- 搜索 -->
        <div class="searchDiv">
            <search placeholder="图书搜索" @search="search"></search>
        </div>
        <!-- 图书列表 -->
        <scroll-view
            v-if="bookList && bookList.length"
            :scroll-y="bookList"
            :style="'height:' + scrollHeight + 'rpx;'"
            class="book-list"
            @scrolltolower="scrollBottom"
        >
            <div class="bookList">
                <div v-for="(item, index) in bookList" :key="index" class="bookItem">
                    <div class="imgDiv">
                        <img :src="item.frontCover" @click="bookClick(item)" alt />
                    </div>
                    <p class="title">{{item.name}}</p>
                    <div class="labelDiv">
                        <span
                            class="tag"
                            v-for="(label, l) in item.labelVOS"
                            :key="l"
                        >{{label.name}}</span>
                    </div>
                    <div class="content">
                        <span class="colorLabel">推荐理由：</span>
                        <span class="text">{{item.recommendReason}}</span>
                    </div>
                </div>
                <div class="loading-view">
                    <van-loading v-if="total > bookList.length" size="14px">加载中…</van-loading>
                    <no-more v-else></no-more>
                </div>
            </div>
        </scroll-view>
        <no-data v-else></no-data>
        <!-- 登录弹窗 -->
        <van-popup :show="loginInShow" @close="loginInHide">
            <wx-login :code="wxCode" @loginInHide="loginInHide"></wx-login>
        </van-popup>
    </div>
</template>

<script>
import wx from "@/utils/wx-api";
import headerView from "@components/headerView.vue";
import noData from "@components/noData.vue";
import noMore from "@components/noMore.vue";
import search from "@components/search.vue";
import wxLogin from "@components/wxLogin.vue";
export default {
    name: "",
    data() {
        let that = this;
        return {
            loginInShow: false,
            wxCode: "",
            scrollHeight: that.getWindowHeight(60),
            bookList: [],
            searchValue: "",
            page: 1,
            size: 10,
            total: 0
        };
    },
    onLoad() {
        // 绘本推荐接口
        this.queryBookRecommend();
    },
    methods: {
        // 显示登录按钮
        getLogin() {
            wx.login(r => {
                this.wxCode = r.code;
                this.loginInShow = true;
            });
        },
        // 隐藏登录按钮
        loginInHide() {
            this.loginInShow = false;
        },
        // 点击图书
        bookClick(book) {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo(`/pages/book/bookDetail/main?id=${book.id}`);
        },
        /**
         * 搜索
         */
        search(val) {
            this.searchValue = val;
            this.refreshList();
        },
        // 获取绘本推荐列表
        queryBookRecommend() {
            let parmas = {
                name: this.searchValue,
                page: this.page,
                size: this.size
            };
            this.$http.queryBookRecommend(parmas).then(res => {
				this.total = res.total;
                if (this.page === 1) {
                    this.bookList = res.bookVOS;
                } else {
                    this.bookList = [...this.bookList, ...res.bookVOS];
                }
            });
        },
        // 刷新列表
        refreshList() {
            this.page = 1;
            this.queryBookRecommend();
        },
        // 上拉加载
        scrollBottom() {
			if(this.total === this.bookList.length) {
				return;
			}
            this.page = this.page + 1;
            this.queryBookRecommend();
        },
    },
    components: {
        headerView,
        search,
        noData,
        wxLogin,
        noMore
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding-bottom: 40rpx;
    .searchDiv {
        padding: 20rpx 0;
    }
    .bookList {
        width: 100%;
        padding: 0 40rpx;
        text-align: center;
        .bookItem {
            padding: 24rpx 0;
            border-bottom: 1rpx solid $--color-primary;
        }
        .imgDiv {
            @include fj(center);
            width: 300rpx;
            height: 200rpx;
            overflow: hidden;
            margin: 0 auto;
            img {
                height: 100%;
            }
        }
        .title {
            text-align: center;
            padding-top: 10rpx;
        }
        .labelDiv {
            @include hh(60rpx);
            @include fj(center);
            padding-bottom: 10rpx;
            .tag {
                box-sizing: content-box;
                padding: 4rpx 16rpx;
                @include hh(28rpx);
                border: 2rpx solid $--color-primary;
                border-left-color: transparent;
                border-radius: 10rpx;
                @include sc($--text-nm, $--color-primary);
                margin-right: 24rpx;
                position: relative;
                &::after {
                    content: "";
                    @include wh(26rpx, 26rpx);
                    position: absolute;
                    transform: rotate(45deg);
                    top: 4rpx;
                    left: -10rpx;
                    border-radius: 6rpx;
                    border-left: 2rpx solid $--color-primary;
                    border-bottom: 2rpx solid $--color-primary;
                }
            }
        }
        .content {
            .colorLabel {
                color: $--color-primary;
            }
            .text {
                color: $--color-text;
                font-size: $--text-lg;
            }
        }
    }
}
</style>