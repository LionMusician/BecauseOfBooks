<template>
    <div class="main">
        <ul class="list" :style="'min-height:' + minheight + 'rpx;max-height:' + maxheight + 'rpx'">
            <li v-for="(item, index) in cartList" :key="index">
                <p class="name">{{item.bookName}}</p>
                <div class="deleteBtn" @click="deleteBag(item)">
                    <van-icon name="delete" size="36rpx" color="#999999" />
                </div>
            </li>
        </ul>
        <div v-if="btnShow" class="btn" @click="btnComfirm">确认</div>
    </div>
</template>
<script>
export default {
    props: {
        cartList: {
            type: Array,
            default: []
        },
        btnShow: {
            type: Boolean,
            default: true
        },
        minheight: {
            type: Number,
            default: 100
        },
        maxheight: {
            type: Number,
            default: 340
        }
    },
    data() {
        return {};
    },
    methods: {
        // 确认
        btnComfirm() {
            this.$emit("cartListBtnClick");
        },
        // 删除书包
        deleteBag(item) {
            this.$emit("deleteBag", item);
        }
    }
};
</script>
<style lang="scss" scoped>
.main {
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // z-index: 100;
    // @include fc(flex-end);
    .list {
        @include wh(750rpx, auto);
        overflow-y: scroll;
        background: $--color-gray-de;
        padding: 20rpx 50rpx 0;
        @include fc(flex-start);
        li {
            width: 650rpx;
            @include hh(80rpx);
            @include fj;
            border-bottom: 2rpx solid $--color-gray-c;
            .deleteBtn {
                padding: 0 30rpx;
            }
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