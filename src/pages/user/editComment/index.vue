<template>
    <div class="container">
        <div class="course">
            <van-row>
                <van-col span="6">
                    <van-image width="100rpx" height="100rpx" fit="contain" :src="course.imageURL" />
                </van-col>
                <van-col span="18">
                    <p class="title">{{course.name}}</p>
                    <p class="desc"></p>
                </van-col>
            </van-row>
        </div>
        <div class="comment">
            <van-field
                type="textarea"
                :value="comment.text"
                :maxlength="500"
                show-word-limit
                custom-style="height: 220rpx;"
                placeholder="请输入评价"
                autosize
            />
        </div>
        <div class="submit">
            <van-button type="primary" block>发布</van-button>å
        </div>
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
export default {
    data() {
        return {
            course: {
                imageURL: "https://img.yzcdn.cn/vant/cat.jpeg",
                name: "因为书阅读馆"
            },
            comment: {
                text: ""
            }
        };
    },
    onLoad() {},
    methods: {}
};
</script>
<style lang="scss" scoped>
.container {
    .course {
        @include wh(750rpx, 120rpx);
        padding: 20rpx;
    }
    .comment {
        @include wh(710rpx, 240rpx);
        margin: 30rpx auto;
        border-radius: 12rpx;
        border: 2rpx solid $--color-gray-c;
    }
    .submit {
        width: 690rpx;
        margin: 0 auto;
    }
}
</style>