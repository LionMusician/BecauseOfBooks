<template>
    <div class="container">
        <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" :dirty="true" />
        <img :src="shareImg" class="img" alt />
        <div class="btn" @click="save">分享卡签</div>
        <!-- 分享弹窗 -->
        <van-popup :show="shareShow" position="bottom" @close="shareHide">
            <div class="share">
                <p class="title">分享至</p>
                <div class="imgs">
                    <img
                        class="icon"
                        @click="shareFriend"
                        src="/static/images/userInfo/wechat.png"
                        alt
                    />
                    <img class="icon" @click="shareQuan" src="/static/images/userInfo/quan.png" alt />
                    <button class="share-btn" open-type="share"></button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import wx from "@/utils/wx-api";
import Card from "@/utils/card";
export default {
    data() {
        return {
            growthData: {}, //  成长数据
            painter: false,
            shareImg: "",
            customStyle: "",
            template: {},
            path: "",
            shareShow: false,
        };
    },
    onShareAppMessage(res) {
        if (res.from === "button") {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: "因为书悦读馆",
            path: "/pages/index/main",
        };
    },
    onLoad() {
        this.getMyGrowthRecord();
        wx.setNavigationBarTitle("成长记录");
    },
    methods: {
        // 获取我的成长记录
        getMyGrowthRecord() {
            this.$http.getMyGrowthRecord().then((res) => {
                console.log(res);
                this.growthData = res;
                this.paint(res);
            });
        },
        // 画图
        paint(res) {
            const card = new Card();
            this.template = card.do(res);
        },
        save() {
            this.shareShow = true;
        },
        onImgOk(e) {
            this.shareImg = e.mp.detail.path;
            // 两种路径是一样的
            // console.log(e.mp.detail.path);
            // console.log(e.target.path);
            this.path = e.target.path;
        },
        // 隐藏分享
        shareHide() {
            this.shareShow = false;
        },
        // 分享给朋友
        shareFriend() {},
        // 分享到朋友圈
        shareQuan() {
            wx.saveImageToPhotosAlbum(this.path, (res) => {
                // console.log("保存成功", res);
                this.shareHide();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.img {
    @include wh(658rpx, 980rpx);
    box-shadow: 0px 4px 8px 0px #309a4d;
    border-radius: 48rpx;
    border: 2rpx solid #309a4d;
    margin: 50rpx auto;
}
.btn {
    @include wh(340rpx, 74rpx);
    background-color: #309a4d;
    @include sc(42rpx, #edf1ee);
    font-weight: 700;
    @include fj(center);
    margin: 44rpx auto;
    box-shadow: 0px 4px 8px 0px #309a4d;
    border-radius: 16px;
}
.share {
    @include wh(750rpx, 298rpx);
    padding: 30rpx 86rpx;
    position: relative;
    .title {
        @include sc(28rpx, #5b5b5b);
        line-height: 40rpx;
        font-weight: 700;
    }
    .imgs {
        @include fj(flex-start);
        margin-top: 20rpx;
        .icon {
            @include wh(110rpx, 110rpx);
            margin-right: 40rpx;
        }
    }
    .share-btn {
        @include wh(110rpx, 110rpx);
        background: transparent;
        position: absolute;
        top: 92rpx;
        left: 86rpx;
        &::after {
            border: 0;
            border-radius: 0;
            padding: 0;
            margin: 0;
            background: transparent;
        }
    }
}
</style>