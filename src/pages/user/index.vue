<template>
    <div class="container">
        <div class="infoDiv">
            <div class="topDiv">
                <div class="imgDiv">
                    <img :src="userInfo.headImage" alt />
                </div>
                <div class="info">
                    <div class="top">
                        <span class="name">{{userInfo.name || '请登录'}}</span>
                        <span class="star">
                            <van-icon class="icon" name="star" />
                            <span>阅读达人</span>
                        </span>
                    </div>
                    <div class="admin" @click="toUserInfo">
                        <span>账号管理</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="user">
                    <div class="iconDiv">
                        <van-icon class="icon" name="service" />
                        <span>客服</span>
                    </div>
                </div>
            </div>
            <div class="starDiv" id="steps">
                <ul class="level">
                    <li v-for="(item, index) in steps" :key="index">{{item.desc}}</li>
                </ul>
                <div class="main-sliver">
                    <div
                        class="inner-sliver"
                        :style="'right:-' + (userInfo.stage - 1) * 230 + 'rpx'"
                    >
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                </div>
                <div class="minutes-view" :style="'left:' + (userInfo.stage - 1) * 225 + 'rpx'">
                    <p>
                        &nbsp;
                        <i class="iconfont iconshoucangchenggong"></i>
                    </p>
                </div>
            </div>
        </div>
        <div v-if="!loginInfo" class="loginDiv">
            <div class="left">登录手机号，同步全渠道订单和优惠券</div>
            <div class="right">
                <van-button type="primary" size="small" @click="getLogin">登录</van-button>
            </div>
        </div>
        <div class="orderList">
            <div class="orderDiv">
                <div class="top" @click="toOrderList">
                    <div class="left">我的订单</div>
                    <div class="right">
                        <span>查看全部订单</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottomItem" @click="toOrderList(1)">
                        <i class="iconfont iconqianbao"></i>
                        <span>待付款</span>
                    </div>
                    <div class="bottomItem" @click="toBookBorrow(3)">
                        <i class="iconfont iconlaijieyue"></i>
                        <span>借阅中</span>
                    </div>
                    <div class="bottomItem" @click="toCourseInfo(1)">
                        <i class="iconfont iconxieziban"></i>
                        <span>待学习</span>
                    </div>
                    <div class="bottomItem" @click="toBookBorrow(2)">
                        <i class="iconfont icondingdan"></i>
                        <span>待取阅</span>
                    </div>
                </div>
            </div>
            <div class="listDiv">
                <ul>
                    <li
                        class="listItem"
                        v-for="(item, index) in cellArr"
                        :key="index"
                        @click="listClick(item)"
                    >
                        <div class="left">{{item.label}}</div>
                        <div class="right">
                            <van-icon name="arrow" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 登录弹窗 -->
        <van-popup :show="loginInShow" @close="loginInHide">
            <wx-login :code="wxCode" @loginInHide="loginInHide"></wx-login>
        </van-popup>
    </div>
</template>

<script>
import wxLogin from "@components/wxLogin.vue";
import { userCellList } from "@/utils/state.js";
import { mapGetters } from "vuex";
import wx from "@/utils/wx-api";
export default {
    components: { wxLogin },
    data() {
        return {
            active: 1,
            steps: [
                {
                    desc: "v1"
                },
                {
                    desc: "v2"
                },
                {
                    desc: "v3"
                },
                {
                    desc: "v4"
                }
            ],
            cellArr: userCellList,
            loginInShow: false,
            wxCode: ""
        };
    },
    computed: {
        ...mapGetters(["loginInfo", "userInfo"])
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
        // 我的页面点击行
        listClick(item) {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            switch (item.value) {
                case 1: // 我的收藏
                    wx.navigateTo("/pages/user/favorite/main?type=1");
                    break;
                case 2: // 我的活动
                    wx.navigateTo("/pages/user/favorite/main?type=2");
                    break;
                case 3: // 课程预约
                    wx.navigateTo("/pages/user/courseBooking/main");
                    break;
                case 4: // 书籍借阅
                    wx.navigateTo(`/pages/user/bookBorrow/main?`);
                    break;
                case 5: // 个人信息
                    wx.navigateTo("/pages/user/userInfo/main");
                    break;
                case 6: // 我的卡券
                    wx.navigateTo("/pages/user/coupon/main");
                    break;
                case 7: // 我的积分
                    wx.navigateTo("/pages/user/minutes/main");
                    break;
                case 8: // 我的评论
                    wx.navigateTo("/pages/user/comments/main");
                    break;
                case 9: // 问卷调查
                    wx.navigateTo("/pages/user/invest/main");
                    break;
                case 10: // 我的地址
                    wx.navigateTo("/pages/book/addressList/main");
                    break;
            }
        },
        // 账号管理
        toUserInfo() {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo("/pages/user/userInfo/main");
        },
        // 跳转到订单列表
        toOrderList(state = "") {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo(`/pages/user/orderList/main?state=${state}`);
        },
        // 跳转到书籍借阅
        toBookBorrow(state = "") {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo(`/pages/user/bookBorrow/main?state=${state}`);
        },
        // 跳转到课程预约列表
        toCourseInfo(state = "") {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo(`/pages/user/courseInfo/main?state=${state}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 20rpx;
    background: $--color-bg;
    .infoDiv {
        padding: 0 30rpx;
        background: $--color-primary;
        .topDiv {
            @include fj(flex-start);
            padding-top: 30rpx;
            .imgDiv {
                @include fj(flex-end);
                width: 140rpx;
                height: 140rpx;
                border-radius: 140rpx;
                overflow: hidden;
                img {
                    width: 140rpx;
                    height: 140rpx;
                }
            }
            .info {
                flex: 1;
                @include fc(flex-start);
                align-items: flex-start;
                padding-left: 30rpx;
                line-height: 60rpx;
                .top {
                    @include fj(flex-start);
                    padding: 20rpx 0;
                    .name {
                        font-size: $--text-xxl;
                        color: $--color-black;
                    }
                    .star {
                        @include fj(flex-start);
                        height: 36rpx;
                        line-height: 36rpx;
                        border-radius: 18rpx;
                        padding: 0 12rpx;
                        margin-left: 12rpx;
                        background: $--color-secondary;
                        font-size: $--text-nm;
                        .icon {
                            font-size: $--text-nm;
                            margin-right: 10rpx;
                            color: $--color-white !important;
                        }
                    }
                }
                .admin {
                    @include fj(flex-start);
                    height: 50rpx;
                    line-height: 50rpx;
                    padding: 0 10rpx;
                    padding-left: 16rpx;
                    border-radius: 25rpx;
                    font-size: $--text-nm;
                    color: $--color-white;
                    background: $--color-secondary;
                }
            }
            .user {
                @include fj(center);
                width: 100rpx;
                .iconDiv {
                    @include fc(center);
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 100rpx;
                    background: $--color-white;
                    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    .icon {
                        font-size: 60rpx;
                        color: $--color-primary;
                    }
                    span {
                        font-size: $--text-xs;
                    }
                }
            }
        }
        .starDiv {
            position: relative;
            @include wh(680rpx, 130rpx);
            margin: 0 auto;
            .level {
                @include fj;
                margin: 20rpx 0;
            }
            .main-sliver {
                @include wh(680rpx, 20rpx);
                border-radius: 10rpx;
                background: $--color-gray-c;
                overflow: hidden;
                position: relative;
                .inner-sliver {
                    @include wh(1360rpx, 20rpx);
                    border-radius: 10rpx;
                    position: absolute;
                    @include fj;
                    .left {
                        @include wh(680rpx, 20rpx);
                        background: $--color-glass;
                    }
                    .right {
                        @include wh(680rpx, 20rpx);
                        background: $--color-white;
                    }
                }
            }
            .minutes-view {
                display: inline-block;
                position: absolute;
                top: 50rpx;
                transform: translateX(-30rpx);
                .iconshoucangchenggong {
                    @include sc($--text-xl, $--color-secondary);
                }
            }
        }
    }
    .loginDiv {
        @include fj();
        height: 100rpx;
        padding: 20rpx;
        background: $--color-white;
        .left {
            font-size: $--text-l;
            height: 100rpx;
            line-height: 100rpx;
        }
    }
    .orderList {
        padding: 20rpx;

        .orderDiv {
            padding: 20rpx;
            background: $--color-white;
            border-radius: 12rpx;
            .top {
                @include fj();
                padding-bottom: 20rpx;
                border-bottom: 1px solid $--color-gray-de;
                .right {
                    @include fj();
                    font-size: $--text-l;
                    color: $--color-text;
                }
            }
            .bottom {
                @include fj();
                margin-top: 10rpx;
                .bottomItem {
                    @include fc(center);
                    padding: 20rpx 40rpx;
                    .iconfont {
                        font-size: 70rpx;
                        color: $--color-primary;
                    }
                    span {
                        font-size: $--text-nm;
                    }
                }
            }
        }
        .listDiv {
            margin-top: 20rpx;
            border-radius: 12rpx;
            padding: 0 20rpx;
            background: $--color-white;
            .listItem {
                @include fj();
                padding: 20rpx;
                border-bottom: 2px solid $--color-bg;
                .left {
                    font-size: $--text-l;
                }
                .right {
                    color: $--color-text;
                }
            }
            .listItem:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
<style lang="scss">
#steps {
    .van-steps--horizontal {
        background: none !important;
    }
    .van-step__circle-container {
        background: none !important;
    }
    .van-step__circle {
        opacity: 0 !important;
    }
    .van-icon-star {
        color: $--color-secondary !important;
        opacity: 1 !important;
    }
    .van-step__line {
        height: 20rpx !important;
    }
}
</style>


