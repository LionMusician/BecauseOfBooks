<template>
    <div class="main">
        <i class="iconfont iconzanwushuju"></i>
        <p>{{text}}</p>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: "暂无数据"
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    @include wh(100%, 80vh);
    @include fc(center);
    .iconzanwushuju {
        @include sc(80rpx, $--color-gray-c);
    }
    p {
        @include sc($--text-xl, $--color-gray-c);
        @include hh(60rpx);
    }
}
</style>