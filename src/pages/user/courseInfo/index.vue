<template>
    <div class="container">
        <van-row>
            <van-col span="6">
                <p class="table-title active">
                    <span>日期</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-title">
                    <span>时间</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-title">
                    <span>内容</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-title">
                    <span>状态</span>
                </p>
            </van-col>
        </van-row>
        <van-row v-for="(item, index) in courseList" :key="index">
            <van-col span="6">
                <p class="table-content">
                    <span>{{item.startDate}}</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-content">
                    <span>{{item.endDate}}</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-content">
                    <span>{{item.name}}</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-content">
                    <span>{{item.statusDesc}}</span>
                </p>
            </van-col>
        </van-row>
        <div class="btn" @click="btnComfirm">确认</div>
    </div>
</template>
<script>
import utils from "@/utils/utils.js";
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            courseList: []
        };
    },
    onLoad() {
        wx.setNavigationBarTitle("课程预约");
        this.getCourseOrder();
    },
    methods: {
        // 查询课程预约
        getCourseOrder() {
            let params = {};
            this.$http.getCourseOrder(params).then(res => {
                this.courseList = res.courseScheduleVOS.map(item => {
                    item.startDate = item.startTime
                        .slice(0, 10)
                        .replace(/\-/g, ".");
                    item.endDate = item.startTime
                        .slice(0, 10)
                        .replace(/\-/g, ".");
                    return item;
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    .table-title {
        @include fj(center);
        height: 80rpx;
        font-size: $--text-xs;
        span {
            @include hh(30rpx);
            display: inline-block;
            border: 1rpx solid $--color-primary;
            border-radius: 15rpx;
            padding: 0 10rpx;
        }
        &.active {
            span {
                background: $--color-primary;
            }
        }
    }
    .table-content {
        @include fj(center);
        height: 60rpx;
        font-size: $--text-xs;
        span {
            @include hh(30rpx);
            display: inline-block;
        }
    }
    .btn {
        width: 750rpx;
        @include hh(80rpx);
        @include sc($--text-lg, $--color-white);
        background: $--color-primary;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
}
</style>