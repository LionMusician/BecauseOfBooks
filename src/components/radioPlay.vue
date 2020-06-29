<template>
    <div class="main">
        <div :class="color" @click="audioPlay">
            <div class="sound">
                <div class="circle first"></div>
                <div :class="animation ? 'circle second animations' : 'circle second'"></div>
                <div :class="animation ? 'circle third animations' : 'circle third'"></div>
            </div>
            <div class="time">{{duration}}s</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // 配色方案
        color: {
            type: String,
            default: "btn green"
        },
        audio: {
            type: Object
        }
    },
    data() {
        return {
            animation: false,
            duration: 10,
            innerAudioContext: null
        };
    },
    onReady() {
        this.initAudio();
    },
    methods: {
        // 初始化音频
        initAudio() {
            let innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.src = this.audio;
            this.innerAudioContext = innerAudioContext;
            this.innerAudioContext.onError(res => {
                // 播放音频失败的回调
                console.log("播放音频失败", res);
            });

            this.innerAudioContext.onStop(res => {
                console.log("播放结束!");
            });
        },
        // 播放
        audioPlay() {
            if (this.animation) {
                this.innerAudioContext.pause();
            } else {
                this.innerAudioContext.play();
                // this.duration = this.innerAudioContext.duration;
                console.log(this.innerAudioContext);
            }
            this.animation = !this.animation;
            if (this.duration > 1) {
                this.countDown();
            }
        },
        // 倒计时
        countDown() {
            if (this.duration) {
                setTimeout(() => {
                    this.duration = this.duration - 1;
                    this.countDown();
                }, 1000);
            } else {
                this.audioPlay();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.main {
    .btn {
        @include wh(auto, 60rpx);
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
                border: 4rpx solid $--color-white;
                border-radius: 50%;
                position: absolute;
                &.first {
                    @include wh(14rpx, 14rpx);
                    left: 38rpx;
                    top: 38rpx;
                }
                &.second {
                    @include wh(40rpx, 40rpx);
                    left: 26rpx;
                    top: 26rpx;
                    &.animations {
                        animation: fadeInOut 1s infinite 0.2s;
                    }
                }
                &.third {
                    @include wh(60rpx, 60rpx);
                    left: 14rpx;
                    top: 14rpx;
                    &.animations {
                        animation: fadeInOut 1s infinite 0.4s;
                    }
                }
            }
        }
        .time {
            @include sc($--text-lg, $--color-white);
        }
        &.gray {
            background: $--color-gray-de;
            .sound{
                .circle {
                    border-color: $--color-gray-6;
                }
            }
            .time {
                color: $--color-gray-6;
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