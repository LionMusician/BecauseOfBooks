<template>
    <div class="container">
        <div class="page-top">
            <van-image round width="80" height="80"></van-image>
            <h2 class="page-title">我的积分</h2>
            <p class="year">· {{year}} ·</p>
        </div>
        <div class="main">
            <ul>
                <li class="minutes-item" v-for="(item, index) in list" :key="index">
                    <div class="top">
                        <p class="name">{{item.name}}</p>
                        <p class="btn">详情</p>
                    </div>
                    <div class="bottom">
                        <div class="main-sliver">
                            <div class="inner-sliver" :style="'right:-' + item.count * 3 + 'rpx'">
                                <div class="left"></div>
                                <div class="right"></div>
                            </div>
                        </div>
                        <div class="start">0</div>
                        <div class="minutes-view" :style="'left:' + (item.count * 3 - 16) + 'rpx'">
                            <p class="num">{{item.count}}</p>
                            <p>
                                &nbsp;
                                <i class="iconfont iconshoucangchenggong"></i>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detail-btn" @click="btnComfirm">积分明细</div>
    </div>
</template>
<script>
import utils from "@/utils/utils.js";
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            year: 2020,
            list: [
                {
                    id: "0",
                    name: "参与的故事会场次",
                    count: 75
                },
                {
                    id: "1",
                    name: "借阅数量",
                    count: 75
                },
                {
                    id: "2",
                    name: "参与活动场次",
                    count: 45
                }
            ]
        };
    },
    onLoad() {
        wx.setNavigationBarTitle("我的积分");
        this.getMyGrowUp();
    },
    methods: {
        // 查询我的成长
        getMyGrowUp() {
            let params = {};
            this.$http.getMyGrowUp(params).then(res => {
                this.year = res.year;
                let list = [...this.list];
                list[0].count = res.courseOrderNum;
                list[1].count = res.bookBorrowNum;
                list[2].count = res.activityJoinNum;
                this.list = list;
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    .page-top {
        @include wh(100%, 400rpx);
        @include fc(center);
        .page-title {
            font-size: $--text-xxl;
            line-height: 80rpx;
        }
    }
    .minutes-item {
        @include wh(690rpx, 200rpx);
        border: 1rpx solid $--color-primary;
        border-radius: 10rpx;
        margin: 20rpx 30rpx;
        padding: 0 20rpx;
        .top {
            @include fj;
            @include hh(60rpx);
            border-bottom: 1rpx solid $--color-gray-c;
            font-size: $--text-nm;
            .btn {
                padding: 0 20rpx;
                color: $--color-gray-c;
            }
        }
        .bottom {
            padding: 80rpx 20rpx 20rpx 20rpx;
            position: relative;
            .main-sliver {
                @include wh(580rpx, 20rpx);
                border-radius: 10rpx;
                background: $--color-gray-c;
                overflow: hidden;
                position: relative;
                .inner-sliver {
                    @include wh(1160rpx, 20rpx);
                    border-radius: 10rpx;
                    position: absolute;
                    @include fj;
                    .left {
                        @include wh(580rpx, 20rpx);
                        background: $--color-glass;
                    }
                    .right {
                        @include wh(580rpx, 20rpx);
                        background: $--color-primary;
                    }
                }
            }
            .start {
                position: absolute;
                left: 30rpx;
                top: 30rpx;
            }
            .minutes-view {
                position: absolute;
                top: 40rpx;
                .num {
                    line-height: 26rpx;
                }
                .iconshoucangchenggong {
                    @include sc($--text-xl, $--color-secondary);
                }
            }
        }
    }
    .detail-btn {
        width: 690rpx;
        margin: 30rpx auto;
        @include hh(90rpx);
        @include sc($--text-xl, $--color-dark);
        background: $--color-primary;
        text-align: center;
        border-radius: 4rpx;
    }
}
</style>