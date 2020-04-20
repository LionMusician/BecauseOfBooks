<template>
    <div class="main">
        <div class="left">
            <img :src="evaluate.headImage" alt />
        </div>
        <div class="right">
            <p class="text" v-if="evaluate.text">{{evaluate.text}}</p>
            <radio-play v-if="evaluate.audio"></radio-play>
        </div>
    </div>
</template>
<script>
import radioPlay from "@components/radioPlay.vue";
export default {
    props: {
        evaluate: {
            type: Object,
            default: () => {
                return {
                    logo: "",
                    type: "text",
                    value: "这是一条评价"
                };
            }
        }
    },
    components: {
        radioPlay
    }
};
</script>
<style lang="scss" scoped>
.main {
    @include fj;
    .left {
        @include wh(140rpx, 140rpx);
        padding: 20rpx;
        img {
            @include wh(100rpx, 100rpx);
            border-radius: 50%;
            box-shadow: 0 0 4rpx 4rpx $--color-gray-c;
        }
    }
    .right {
        width: 500rpx;
        .text {
            line-height: 40rpx;
            @include sc($--text-sm, $--color-gray-6);
            background: $--color-gray-de;
            border-radius: 30rpx;
            letter-spacing: 4rpx;
            padding: 10rpx 20rpx 40rpx 20rpx;
            margin-bottom: 20rpx;
        }
    }
}
</style>