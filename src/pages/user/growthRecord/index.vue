<template>
    <div class="container">
        <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" :dirty="true" />
        <img :src="shareImg" class="img" alt />
        <button style="margin-top:40rpx" @click="save">保存</button>
    </div>
</template>

<script>
import wx from "@/utils/wx-api";
// import Card from "@/utils/card";
// const card = new Card();
// console.log("card", card);
// const userInfo = {
//     avatar:
//         "https://qhyxpicoss.kujiale.com/r/2017/12/04/L3D123I45VHNYULVSAEYCV3P3X6888_3200x2400.jpg@!70q",
// };

// const template = card.do(userInfo);
// console.log("template", template);
// const customStyle = "margin-left:40rpx";
export default {
    data() {
        return {
            growthData: {}, //  成长数据
            shareImg: "",
            customStyle: "",
            template: {
                width: "658rpx",
                height: "980rpx",
                border: "2px solid #309A4D",
                borderRadius: "48rpx",
                views: [
                    {
                        type: "text",
                        text: "姓名",
                        css: {
                            fontSize: "28rpx",
                            color: "#309A4D",
                        },
                    },
                ],
            },
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
                // console.log(res);
                this.growthData = res;
            });
        },
        save() {
            console.log("on save click");
        },
        onImgOk(e) {
            this.shareImg = e.mp.detail.path;
            // 两种路径是一样的
            console.log(e.mp.detail.path);
            console.log(e.target.path);
        },
    },
};
</script>

<style lang="scss" scoped>
.img {
    @include wh(658rpx, 980rpx);
    border-radius: 48rpx;
    border: 2rpx solid #309a4d;
    margin: 50rpx auto;
}
</style>