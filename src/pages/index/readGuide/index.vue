<template>
    <div class="container">
        <!-- 头部 -->
        <header-view title="阅读指导"></header-view>
        <!-- 列表 -->
        <scroll-view
            v-if="readList && readList.length"
            :scroll-y="readList"
            :style="'height:' + scrollHeight + 'rpx;'"
            class="book-list"
            @scrolltolower="scrollBottom"
        >
            <div class="readListDiv">
                <div
                    class="readListView"
                    v-for="(item, index) in readList"
                    :key="index"
                    @click="bannerClick(item)"
                >
                    <div class="left">
                        <div class="imgDiv">
                            <img :src="item.picture" mode="heightFix" alt />
                        </div>
                    </div>
                    <div class="right">
                        <p class="title">【{{item.title}}】</p>
                        <div class="content">{{item.introduction}}</div>
                    </div>
                </div>
                <div class="loading-view">
                    <van-loading v-if="total > readList.length" size="14px">加载中…</van-loading>
                    <no-more v-else></no-more>
                </div>
            </div>
        </scroll-view>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import headerView from "@components/headerView.vue";
import noData from "@components/noData.vue";
import noMore from "@components/noMore.vue";
import wx from "@/utils/wx-api";

export default {
    name: "",
    data() {
        let that = this;
        return {
            scrollHeight: that.getWindowHeight(66),
            readList: [],
            page: 1,
            size: 10,
            total: 0
        };
    },
    onLoad() {
        // 查询阅读指导列表
        this.queryReadGuide();
    },
    methods: {
        // 阅读指导数据
        queryReadGuide() {
            this.$http.queryReadGuide().then(res => {
                this.total = res.total;
                if (this.page === 1) {
                    this.readList = res.readGuideVOS;
                } else {
                    this.readList = [...this.readList, ...res.readGuideVOS];
                }
            });
        },
        // 点击banner图
        bannerClick(item) {
            wx.navigateTo(`/pages/index/webview/main?link=${item.link}`);
        },
        // 上拉加载
        scrollBottom() {
            if (this.total === this.bookList.length) {
                return;
            }
            this.page = this.page + 1;
            this.queryReadGuide();
        }
    },
    components: {
        headerView,
        noData,
        noMore
    }
};
</script>

<style lang="scss" scoped>
.container {
    .readListDiv {
        padding: 30rpx 0;
    }
    .readListView {
        @include fj();
        height: 240rpx;
        overflow: hidden;
        margin-bottom: 30rpx;
        .left {
            width: 300rpx;
            .imgDiv {
                @include fc();
                width: 100%;
                height: 240rpx;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 240rpx;
                }
            }
        }
        .right {
            flex: 1;
            height: 240rpx;
            border-top: 1rpx solid $--color-gray-de;
            border-bottom: 1rpx solid $--color-gray-de;
            .title {
                text-align: left;
                padding: 16rpx 0 10rpx 0;
            }
            .content {
                @include ellipsisn(5);
                padding-left: 20rpx;
                color: $--color-text;
                font-size: $--text-nm;
            }
        }
    }
}
</style>