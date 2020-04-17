<template>
    <div class="container">
        <van-sticky>
            <van-tabs :active="tabActive" :change="tabChange">
                <van-tab title="全部"></van-tab>
                <van-tab title="待支付"></van-tab>
                <van-tab title="已完成"></van-tab>
            </van-tabs>
        </van-sticky>
        <ul class="order-list">
            <li class="order-item" v-for="(item, index) in orderList" :key="index">
                <div class="order-top">
                    <p class="shop-name">门店名称</p>
                    <p class="order-state">
                        <span v-if="!item.state" class="danger">待支付</span>
                        <span v-else class="success">已完成</span>
                    </p>
                </div>
                <van-card
                    v-for="(tip, i) in item.goods"
                    :key="i"
                    title="活动名称"
                    desc="描述信息"
                    :thumb="tip.imageURL"
                    >
                    <div class="order-price" slot="price">
                        <div class="adult">
                            <p class="name">
                                <span>成人：&yen; </span>
                                <span class="price">10.89</span>
                            </p>
                            <p class="count">x2</p>
                        </div>
                        <div class="adult">
                            <p class="name">
                                <span>儿童：&yen; </span>
                                <span class="price">10.89</span>
                            </p>
                            <p class="count">x2</p>
                        </div>
                    </div>
                    <div class="goods-footer" slot="footer">
                        <van-button v-if="item.state" color="#1070ff" plain hairline type="primary" round size="small">评价</van-button>
                    </div>
                </van-card>
                <div class="order-footer" slot="footer">
                    <p class="total-price">
                        <span>总价：&yen; </span>
                        <span class="price">21.78</span>
                    </p>
                    <div class="btns">
                        <van-button v-if="!item.state" color="#FD4346" plain hairline type="primary" round size="small">付款</van-button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabActive: 0,
            orderList: [{
                state: 0,
                goods: [
                    {
                        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    },
                    {
                        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    },
                ]
            },{
                imageURL: '',
                state: 1,
                goods: [
                    {
                        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    },
                    {
                        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    },
                    {
                        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    },
                ]
            },]
        }
    },
    onLoad() {
        let state = this.$root.$mp.query.state;
        this.tabActive = state === 'unPay' ? 1 : 0;
    },
    methods: {
        // 切换tab
        tabChange(e) {

        }
    },
}
</script>
<style lang="scss" scoped>
.container {
    background: $--color-light;
    min-height: 100vh;
    .tab-active {
        color: $--color-primary !important;
    }
    .order-list {
        padding: 20rpx;
        .order-item{
            overflow: hidden;
            border-radius: 16rpx;
            margin-bottom: 20rpx;
            .order-top {
                background: $--color-white;
                padding: 20rpx;
                font-size: $--text-nm;
                border-bottom: 1rpx solid $--color-light;
                @include fj;
                .shop-name {
                    font-size: $--text-lg;
                }
                .order-state {
                    .success {
                        color: $--color-primary;
                    }
                    .danger {
                        color: $--color-danger;
                    }
                }
            }
            .order-price {
                .adult {
                    @include fj;
                }
                .price {
                    font-size: $--text-lg;
                }
            }
            .goods-footer {
                padding: 20rpx 0 0;
            }
            .order-footer {
                background: $--color-white;
                padding: 10rpx 30rpx 20rpx;
                text-align: right;
                .total-price {
                    font-size: $--text-nm;
                    .price {
                        font-size: $--text-lg;
                    }
                }
                .btns {
                    padding: 10rpx 0 0;
                }
            }
        }
    }
}
</style>