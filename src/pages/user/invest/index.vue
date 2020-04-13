<template>
    <div class="container">
        <div class="page-top">
            <van-image round width="80" height="80"></van-image>
            <h2 class="page-title">问卷调查</h2>
            <p class="year">· {{year}} ·</p>
        </div>
        <div class="main">
            <p class="title">阅读测试</p>
            <ul class="tips">
                <li v-for="(item, index) in questionList" :key="index">
                    <p class="content">
                        <span class="index">{{item.index}}、</span>
                        <span>{{item.text}}</span>
                    </p>

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import utils from "@/utils/utils.js";
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            year: 2020,
            questionList: []
        };
    },
    onLoad() {
        wx.setNavigationBarTitle('问卷调查');
    },
    methods: {}
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
    .main {
        @include wh(690rpx, auto);
        border: 2rpx solid $--color-primary;
        border-radius: 20rpx;

    }
}
</style>