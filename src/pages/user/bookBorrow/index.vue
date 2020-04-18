<template>
    <div class="container">
        <van-row v-if="courseList.length">
            <van-col span="6">
                <p class="table-title active">
                    <span>借阅日期</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-title active">
                    <span>应还日期</span>
                </p>
            </van-col>
            <van-col span="6">
                <p class="table-title">
                    <span>书籍</span>
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
                    <span>{{item.bookName}}</span>
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
        wx.setNavigationBarTitle("书籍借阅");
        this.getBookBorrow();
    },
    methods: {
        // 查询书籍借阅
        getBookBorrow() {
            let params = {};
            let state = this.$root.$mp.query.state;
            if (state) {
                params.status = state;
            }
            this.$http.getBookBorrow(params).then(res => {
                if (res.bookBorrowVOS) {
                    this.courseList = res.bookBorrowVOS.map(item => {
                        item.startDate = item.takeDate
                            ? item.takeDate.slice(0, 10).replace(/\-/g, ".")
                            : "";
                        item.endDate = item.returnDate
                            ? item.returnDate.slice(0, 10).replace(/\-/g, ".")
                            : "";
                        return item;
                    });
                }
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