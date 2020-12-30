<template>
    <div class="container">
        <van-sticky>
            <van-tabs :active="tabActive" @change="change">
                <van-tab title="全部"></van-tab>
                <van-tab title="待支付"></van-tab>
                <van-tab title="已完成"></van-tab>
            </van-tabs>
        </van-sticky>
        <ul v-if="orderList.length" class="order-list">
            <li class="order-item" v-for="(item, index) in orderList" :key="index">
                <div class="order-top">
                    <p class="shop-name">{{item.readingHallName}}</p>
                    <p class="order-state">
                        <span v-if="item.status === 1" class="danger">待支付</span>
                        <span v-else class="success">{{item.statusText}}</span>
                    </p>
                </div>
                <van-card
                    v-for="(tip, i) in item.orderItemVOS"
                    :key="i"
                    :title="tip.name"
                    desc="描述信息"
                    :thumb="tip.frontCover"
                >
                    <div class="order-price" slot="price">
                        <div class="adult">
                            <p class="name">
                                <!-- <span>成人：&yen;</span> -->
                                <span>&yen;</span>
                                <span class="price">{{tip.price}}</span>
                            </p>
                            <p class="count">x{{tip.num}}</p>
                        </div>
                        <!-- <div class="adult">
                            <p class="name">
                                <span>儿童：&yen;</span>
                                <span class="price">{{tip.childPrice}}</span>
                            </p>
                            <p class="count">x{{tip.childNum}}</p>
                        </div>-->
                    </div>
                    <div class="goods-footer" slot="footer">
                        <!-- <van-button
                            v-if="item.state"
                            color="#1070ff"
                            plain
                            hairline
                            type="primary"
                            round
                            size="small"
                        >评价</van-button>-->
                    </div>
                </van-card>
                <div class="order-footer" slot="footer">
                    <p class="total-price">
                        <span>总价：&yen;</span>
                        <span class="price">{{item.totalPrice}}</span>
                    </p>
                    <div class="btns">
                        <van-button
                            v-if="item.status === 1"
                            color="#FD4346"
                            plain
                            hairline
                            type="primary"
                            round
                            size="small"
                            @click="onClickButton(item)"
                        >付款</van-button>
                    </div>
                </div>
            </li>
        </ul>
        <no-data v-else></no-data>
        <van-action-sheet :show="actionShow" title="付款详情" :round="false" @close="close">
            <div class="toPayDiv">
                <div class="toPayInfo">
                    <div class="priceDiv">
                        &yen;
                        <span>{{totalPriceView}}</span>
                    </div>
                    <div>
                        <van-cell custom-class="cellClass" title="支付方式" value="微信支付" />
                    </div>
                </div>
                <div class="toPayBtn">
                    <van-button color="#98C145" block @click="toPay">确认支付</van-button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
import noData from "@components/noData.vue";
export default {
    data() {
        return {
            tabActive: 0,
            orderList: [],
            actionShow: false,
            totalPriceView: 0,
            orderId: "",
        };
    },
    onLoad() {
        let state = this.$root.$mp.query.state;
        this.tabActive = ~~state || 0;
        this.getMyOrder();
    },
    components: { noData },
    methods: {
        // 查询我的订单
        getMyOrder() {
            let params = {
                statusList: [this.tabActive],
            };
            this.$http.getMyOrder(this.tabActive ? params : {}).then((res) => {
                if (res.orderVOS && res.orderVOS.length) {
                    res.orderVOS.forEach((item) => {
                        item.statusText = this.getStatus(item.status);
                    });
                }
                this.orderList = res.orderVOS || [];
            });
        },
        /**
         * 筛选
         */
        change(e) {
            this.tabActive = e.target.index;
            this.getMyOrder();
        },
        /**
         * 状态
         */
        getStatus(status) {
            switch (status) {
                case 1:
                    return "待支付";
                case 2:
                    return "已支付";
                case 3:
                    return "支付超时";
                case 4:
                    return "支付失败";
                case 5:
                    return "已退款";
            }
        },
        /**
         * 去支付
         */
        onClickButton(item) {
            this.totalPriceView = item.payPrice;
            this.orderId = item.orderItemVOS[0].orderId;
            this.actionShow = true;
        },
        /**
         * 关闭支付弹框
         */
        close() {
            this.actionShow = false;
            this.totalPriceView = 0;
        },
        /**
         * 支付
         */
        toPay() {
            wx.login((r) => {
                let params = {
                    payChannel: 0,
                    orderId: this.orderId,
                    wxCode: r.code,
                };
                // console.log(JSON.stringify(params));

                this.$http.xcxpay(params).then((res) => {
                    this.close();
                    wx.requestPayment(res, (r) => {
                        console.log(r);
                        setTimeout(() => {
                            this.getMyOrder();
                        }, 800);
                    });
                });
            });
        },
    },
};
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
        .order-item {
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
    .toPayDiv {
        @include fc();
        width: 100%;
        height: 400rpx;
        overflow: hidden;
        .toPayInfo {
            width: 100%;
            flex: 1;
            padding: 0 40rpx;
            .priceDiv {
                padding: 40rpx 0;
                text-align: center;
                span {
                    font-size: $--text-xxxl;
                    font-weight: 550;
                }
            }
            .cellClass {
                border-bottom: 1px solid #ccc;
            }
        }
        .toPayBtn {
            width: 100%;
        }
    }
}
</style>