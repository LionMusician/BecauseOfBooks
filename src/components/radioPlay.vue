<template>
    <div class="main">
        <div class="btn">
            <div class="sound">
                <div class="circle first"></div>
                <div class="circle second animations"></div>
                <div class="circle third animations"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.main {
    .btn {
        @include wh(690rpx, 60rpx);
        border-radius: 30rpx;
        background: $--color-primary;
        box-shadow: 0 0 3rpx $--color-gray-6;
        @include fj(flex-start);
        padding-left: 50rpx;
        .sound {
            @include wh(46rpx, 46rpx);
            overflow: hidden;
            transform: rotate(135deg);
            .circle {
                border: 8rpx solid $--color-white;
                border-radius: 50%;
                position: absolute;
                &.first {
                    @include wh(8rpx, 8rpx);
                    left: 36rpx;
                    top: 36rpx;
                }
                &.second {
                    @include wh(50rpx, 50rpx);
                    left: 22rpx;
                    top: 22rpx;
                    &.animations {
                        animation: fadeInOut 1s infinite 0.2s;
                    }
                }
                &.third {
                    @include wh(80rpx, 80rpx);
                    left: 8rpx;
                    top: 8rpx;
                    &.animations {
                        animation: fadeInOut 1s infinite 0.4s;
                    }
                }
            }
        }
    }
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>