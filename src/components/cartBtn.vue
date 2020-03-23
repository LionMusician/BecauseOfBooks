<template>
    <div class="main">
        <div class="cartBtn" 
            :style="'top:' + btnTop + ';left:' + btnLeft + ';width:' + btnWidth + 'px;height:' + btnWidth +'px;'" 
            @click.stop="btnClick"
            @touchstart="btnMoveStart"
            @touchmove="btnMove"
            @touchend="btnMoveEnd">
            <i class="iconfont iconshubao-"></i>
            <div class="sup">{{num}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        num: {
            type: String,
            default: 0
        }
    },
    data() {
        return {
            btnWidth: 60,
            btnTop: 0,
            btnLeft: 0,
            windowWidth: 0,
            windowHeight: 0,
        }
    },
    onLoad() {
        this.getWindow();
    },
    methods:{
        // 获取窗口大小
        getWindow() {
            let windowWidth = wx.getSystemInfoSync().windowWidth;
            let windowHeight = wx.getSystemInfoSync().windowHeight;
            this.btnTop = windowHeight - 140 - this.btnWidth + 'px';
            this.btnLeft = windowWidth - 20 - this.btnWidth + 'px';
        },
        // 按钮点击
        btnClick() {
            this.$emit('cartBtnClick');
        },
        // 滑动开始
        btnMoveStart(e) {
            console.log('滑动开始', e.clientX, e.clientY);
        },
        // 滑动
        btnMove(e) {
            this.btnTop = e.clientY - this.btnWidth / 2 + 'px';
            this.btnLeft = e.clientX - this.btnWidth / 2 + 'px';
        },
        // 滑动结束
        btnMoveEnd(e) {
            console.log('滑动结束', e);
            
        },
    }
}
</script>
<style lang="scss" scoped>
.main {
    .cartBtn {
        border-radius: 50%;
        background: $--color-primary;
        position: fixed;
        z-index: 1000;
        @include fj(center);
        .iconfont {
            @include sc(90rpx, $--color-gray-6);
        }
        .sup {
            position: absolute;
            top: 70rpx;
            right: 20rpx;
            @include sc($--text-nm, $--color-white);
            @include hh(30rpx);
            border-radius: 15rpx;
            padding: 0 10rpx;
            background: $--color-secondary;
        }
    }
}
</style>