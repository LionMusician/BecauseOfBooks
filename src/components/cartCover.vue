<template>
    <div class="main">
        <ul class="list">
            <li v-for="(item, index) in cartList" :key="index">
                <p class="name">{{item.name}}</p>
                <i class="iconfont iconxia"></i>
            </li>
        </ul>
        <div class="btn" @click="btnComfirm">确认</div>
    </div>
</template>
<script>
export default {
    props: {
        cartList: {
            type: Array,
            default: [
                {
                    name: '小猫头鹰'
                },
                {
                    name: '小猫头鹰'
                },
                {
                    name: '小猫头鹰'
                },
                {
                    name: '小猫头鹰'
                },
                {
                    name: '小猫头鹰'
                },
                {
                    name: '小猫头鹰'
                },
            ]
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        // 确认
        btnComfirm() {
            this.$emit('cartListBtnClick');
        }
    },
}
</script>
<style lang="scss" scoped>
.main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    @include fc(flex-end);
    .list {
        @include wh(750rpx, auto);
        min-height: 200rpx;
        max-height: 340rpx;
        overflow-y: scroll;
        background: $--color-gray-de;
        padding: 20rpx 50rpx 0;
        @include fc(flex-start);
        li {
            width: 650rpx;
            @include hh(80rpx);
            @include fj;
            border-bottom: 2rpx solid $--color-gray-c;
        }
    }
    .btn {
        width: 750rpx;
        @include hh(80rpx);
        @include sc($--text-lg, $--color-white);
        background: $--color-primary;
        text-align: center;
    }
}
</style>