<template>
    <div>
        <div v-if="carList && carList.length" class="container">
            <!-- 编辑购物车按钮 -->
            <div class="top" @click="editClick">{{isEdit ? '完成' : '编辑'}}</div>
            <scroll-view
                :scroll-y="carList"
                :style="'height:' + scrollHeight + 'rpx;'"
                class="book-list"
            >
                <div class="carView">
                    <!-- 购物车商品列表 -->
                    <van-swipe-cell
                        :right-width="isEdit ? 0 : 65"
                        v-for="(item, index) in carList"
                        :key="index"
                        :disabled="isEdit"
                    >
                        <div class="carItem">
                            <div class="check">
                                <van-checkbox
                                    checked-color="#009145"
                                    :value="item.checked"
                                    @change="item.checked = !item.checked"
                                ></van-checkbox>
                            </div>
                            <div class="imgDiv">
                                <img :src="item.activityVO.frontCover" alt />
                            </div>
                            <div class="infoDiv">
                                <p class="title">{{item.activityVO.name}}</p>
                                <p class="other totalNum">限制{{item.activityVO.totalNum}}人</p>
                                <p
                                    class="other"
                                >时间：{{item.activityVO.startDate}} - {{item.activityVO.endDate}}</p>
                                <p class="other">地址：{{item.activityVO.address}}</p>
                                <div class="priceDiv">
                                    <div>
                                        <div class="row">
                                            <!-- <div>成人：</div> -->
                                            <div>价格：</div>
                                            <div>
                                                <van-stepper
                                                    integer
                                                    min="0"
                                                    :disable-plus="stepperDis"
                                                    :value="item.adultNum"
                                                    @change="stepperChange($event,item, 'adultNum')"
                                                    input-class="inputClass"
                                                    plus-class="plus-minus"
                                                    minus-class="plus-minus"
                                                />
                                            </div>
                                            <div class="price">&yen;{{item.activityVO.priceAll}}</div>
                                        </div>
                                        <!-- <div class="row">
                                            <div>儿童：</div>
                                            <div>
                                                <van-stepper
                                                    integer
                                                    min="0"
                                                    :disable-plus="stepperDis"
                                                    :value="item.childNum"
                                                    @change="stepperChange($event,item, 'childNum')"
                                                    input-class="inputClass"
                                                    plus-class="plus-minus"
                                                    minus-class="plus-minus"
                                                />
                                            </div>
                                            <div
                                                class="price"
                                            >&yen;{{item.activityVO.childPriceAll}}</div>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <view slot="right" class="swipe-cell-right" @click="delCar(item)">删除</view>
                    </van-swipe-cell>
                    <!-- 选择优惠券行 -->
                    <van-cell
                        title="优惠券"
                        v-if="couponList && couponList.length"
                        @click="selectCoupon"
                    >
                        <div slot="right-icon" class="coupon">
                            <span v-if="useCoupon && useCoupon.length">
                                <span class="use">已用{{useCoupon.length}}张</span>
                                <span class="num">-&yen;{{useCouponAmt}}</span>
                            </span>
                            <span v-else>选择优惠券</span>
                            <van-icon name="arrow" />
                        </div>
                    </van-cell>
                </div>
            </scroll-view>
            <div class="submitBar">
                <!-- 购物车结算、删除行 -->
                <van-submit-bar
                    :price="isEdit ? null : payPrice"
                    :button-text="isEdit ? '删除' : '结算'"
                    @submit="onClickButton"
                    price-class="priceClass"
                    button-class="buttonClass"
                >
                    <van-tag type="primary" class="bottomCheckbox">
                        <van-checkbox
                            checked-color="#009145"
                            :value="allChecked"
                            @change="onChange"
                        >全选</van-checkbox>
                    </van-tag>
                    <div slot="price">123</div>
                </van-submit-bar>
                <!-- 删除商品弹框 -->
                <van-dialog id="van-dialog" />
                <!-- message 提示 -->
                <van-notify id="van-notify" />
                <!-- 选择优惠券 -->
                <van-action-sheet
                    :close-on-click-overlay="false"
                    :show="dialogShow"
                    cancel-text="确认"
                    :round="false"
                    title="选择可用优惠券"
                    @close="dialogShow = false"
                    @cancel="couponChange"
                >
                    <div class="couponDiv">
                        <div class="couponItem" v-for="(coupon, index) in couponList" :key="index">
                            <div class="left">
                                <p
                                    class="price"
                                >&yen;{{coupon.type === 1 ? coupon.reducePrice : coupon.price}}</p>
                                <p class="tips" v-if="coupon.type === 1">满{{coupon.reachPrice}}元使用</p>
                            </div>
                            <div class="center">
                                <p class="name">{{coupon.name}}</p>
                                <p class="tips">{{coupon.typeDesc}}</p>
                                <p class="time">{{coupon.startTime}} - {{coupon.endTime}}</p>
                            </div>
                            <div class="right">
                                <van-checkbox
                                    checked-color="#009145"
                                    :value="coupon.check"
                                    :disabled="coupon.disabled"
                                    @change="coupon.check = !coupon.check"
                                ></van-checkbox>
                            </div>
                        </div>
                    </div>
                </van-action-sheet>
            </div>
        </div>
        <div v-else>暂无数据</div>
    </div>
</template>

<script>
import wx from "@/utils/wx-api";
import Dialog from "../../../../static/vant/dialog/dialog.js";
import Notify from "../../../../static/vant/notify/notify.js";
import utils from "@/utils/utils";
export default {
    name: "",
    data() {
        let that = this;
        return {
            stepperDis: false,
            isEdit: false,
            allChecked: false,
            scrollHeight: that.getWindowHeight(160),
            carList: [],
            dialogShow: false, // 优惠券弹框
            couponList: [],
            useCoupon: [], // 选择的优惠券
            useCouponAmt: 0, // 优惠券优惠金额
            totalPrice: 0, // 购物车无优惠总金额
            shoppingCartVOS: [], // 下单参数 -- 购物车集合
            userVoucherVOS: [], // 下单参数 -- 用户券
        };
    },
    onLoad() {
        // 查询购物车
        this.queryShoppingCart();
        // 查询优惠券列表
        this.queryVoucher();
    },
    computed: {
        // 实付金额
        payPrice() {
            let data = this.carList;
            let num = 0;
            this.useCouponAmt = 0;
            this.totalPrice = 0; // 购物车无优惠总金额
            this.shoppingCartVOS = []; // 下单参数 -- 购物车集合
            this.userVoucherVOS = []; // 下单参数 -- 用户券
            data.forEach((item) => {
                if (item.checked) {
                    // 计算金额
                    // let adultPrice =
                    //     Number(item.adultNum) *
                    //     Number(item.activityVO.adultPrice); // 成人价格
                    // let childPrice =
                    //     Number(item.childNum) *
                    //     Number(item.activityVO.childPrice); // 儿童价格
                    // let totalPrice = Number(adultPrice) + Number(childPrice);
                    let totalPrice = Number(item.num * item.unitPrice);
                    num += totalPrice;
                    this.totalPrice += totalPrice;
                    // 整理下单用购物车参数
                    let obj = {
                        id: item.id,
                        adultNum: item.adultNum,
                        childNum: item.childNum,
                        price: totalPrice,
                        activityVO: {
                            id: item.activityVO.id,
                        },
                    };
                    this.shoppingCartVOS.push(obj);
                }
            });
            if (this.useCoupon && this.useCoupon.length) {
                this.useCoupon.forEach((item) => {
                    // 计算金额
                    if (item.type === 1) {
                        num -= item.reducePrice;
                        this.useCouponAmt += Number(item.reducePrice);
                    } else {
                        num -= item.price;
                        this.useCouponAmt += Number(item.price);
                    }
                    // 整理下单用的优惠券数据
                    this.userVoucherVOS.push({ voucherId: item.voucherId });
                });
            }
            num = num * 100;
            if (num < 0) {
                num = 0;
            }
            return num;
        },
    },
    methods: {
        /**
         * 查询购物车
         **/
        queryShoppingCart() {
            this.$http.queryShoppingCart().then((res) => {
                let data = res.shoppingCartVOS;
                data.forEach((item) => {
                    item.activityVO = item.activityVO || {};
                    let activityVO = item.activityVO;
                    // activityVO.adultPriceAll =
                    //     Number(item.adultNum) * Number(activityVO.adultPrice); // 成人价格
                    // activityVO.childPriceAll =
                    //     Number(item.childNum) * Number(activityVO.childPrice); // 儿童价格
                    activityVO.priceAll =
                        Number(item.num) * Number(item.unitPrice);
                    item.checked = false;
                });
                this.carList = data;
            });
        },
        /**
         * 查询优惠券列表
         **/
        queryVoucher() {
            this.$http.queryVoucher().then((res) => {
                let data = res.userVoucherVOS;
                data.forEach((item) => {
                    item.startTime = utils.mklog(item.startTime);
                    item.endTime = utils.mklog(item.endTime);
                    item.check = false;
                    item.disabled = false;
                    if (item.type === 1 && this.totalPrice < item.reachPrice) {
                        item.disabled = true;
                    }
                    if (this.useCoupon && this.useCoupon.length) {
                        this.useCoupon.forEach((use) => {
                            if (item.voucherId === use.voucherId) {
                                item.check = true;
                            }
                        });
                    }
                });
                this.couponList = data;
            });
        },
        /**
         * 删除某个商品
         */
        delCar(item) {
            Dialog({
                message: `确认删除商品【${item.activityVO.name}】？`,
                asyncClose: true,
                showCancelButton: true,
            })
                .then(() => {
                    let parmas = {
                        ids: [item.id],
                    };
                    this.deleteShoppingCart(parmas);
                })
                .catch(() => {
                    Dialog.close();
                });
        },
        /**
         * 删除购物车
         **/
        deleteShoppingCart(parmas) {
            this.$http.deleteShoppingCart(parmas).then((res) => {
                Notify({
                    type: "success",
                    message: "删除成功",
                });
                this.queryShoppingCart();
                Dialog.close();
            });
        },
        /**
         * 去结算
         **/
        onClickButton() {
            if (this.isEdit) {
                this.delGoods().then((res) => {
                    Dialog({
                        message: res,
                        asyncClose: true,
                        showCancelButton: true,
                    })
                        .then(() => {
                            let ids = [];
                            this.carList.forEach((item) => {
                                if (item.checked) {
                                    ids.push(item.id);
                                }
                            });
                            let parmas = {
                                ids: ids,
                            };
                            this.deleteShoppingCart(parmas);
                        })
                        .catch(() => {
                            Dialog.close();
                        });
                });
            } else {
                let arr = 0;
                this.carList.forEach((item) => {
                    if (item.checked) {
                        arr++;
                    }
                });
                if (!arr) {
                    Notify({
                        type: "warning",
                        message: "请选择商品",
                    });
                    return false;
                }
                this.confirmOrder();
            }
        },
        /**
         * 去结算
         */
        confirmOrder() {
            let shoppingCartIds = this.shoppingCartVOS.map((item) => {
                return item.id;
            });
            let voucherIds = this.userVoucherVOS.map((item) => {
                return item.voucherId;
            });
            let parmas = {
                // shoppingCartVOS: this.shoppingCartVOS,
                // payPrice: this.payPrice / 100,
                // totalPrice: this.totalPrice,
                // userVoucherVOS: this.userVoucherVOS
                shoppingCartIds: shoppingCartIds,
                voucherIds: voucherIds,
            };
            this.$http
                .confirmOrder(parmas)
                .then((res) => {
                    wx.navigateTo(`/pages/index/confirmOrder/main?id=${res}`);
                })
                .catch((err) => {
                    if (err.code === 500) {
                        Dialog({
                            message: err.msg,
                            asyncClose: true,
                            showCancelButton: true,
                            confirmButtonText: "查看",
                        })
                            .then(() => {
                                wx.navigateTo(
                                    `/pages/user/orderList/main?state=1`
                                );
                            })
                            .catch(() => {
                                Dialog.close();
                            });
                    }
                });
        },
        /**
         * 选择优惠券
         */
        couponChange() {
            let arr = [];
            this.useCoupon = [];
            this.couponList.forEach((item) => {
                if (item.check) {
                    arr.push(item);
                }
            });
            // this.useCoupon = arr;
            this.$set(this, "useCoupon", arr);
            this.dialogShow = false;
        },
        /***
         * 点击选择优惠券
         */
        selectCoupon() {
            let arr = 0;
            this.carList.forEach((item) => {
                if (item.checked) {
                    arr++;
                }
            });
            if (!arr) {
                Notify({
                    type: "warning",
                    message: "请选择商品",
                });
                return false;
            }
            this.queryVoucher();
            this.dialogShow = true;
        },
        /**
         * 删除商品
         */
        delGoods() {
            return new Promise((resolve, reject) => {
                let text = "";
                if (this.allChecked) {
                    text = "确认删除全部宝贝？";
                    resolve(text);
                } else {
                    let num = 0;
                    this.carList.forEach((item) => {
                        if (item.checked) {
                            num++;
                        }
                    });
                    text = `确认将这${num}个宝贝删除？`;
                    if (!num) {
                        Notify({
                            type: "warning",
                            message: "请选择要删除的商品",
                        });
                        reject(false);
                    } else {
                        resolve(text);
                    }
                }
            });
        },
        /**
         * 点击编辑或者完成
         */
        editClick() {
            this.isEdit = !this.isEdit;
            this.allChecked = false;
            this.carListChange();
        },
        /**
         * 全选按钮点击
         */
        onChange() {
            this.allChecked = !this.allChecked;
            this.carListChange();
        },
        /**
         * 改变全选，对应列表改变
         */
        carListChange() {
            this.carList.map((item) => {
                item.checked = this.allChecked;
            });
        },
        /**
         * 计步器改变
         **/
        stepperChange(e, item, type) {
            this.stepperDis = false;
            item[type] = e.mp.detail;

            // 计算成人价格
            // item.activityVO.adultPriceAll =
            //     Number(item.adultNum) * Number(item.activityVO.adultPrice);

            // // 计算儿童价格
            // item.activityVO.childPriceAll =
            //     Number(item.childNum) * Number(item.activityVO.childPrice);

            // // 计算总价
            // item.price =
            //     Number(item.activityVO.adultPriceAll) +
            //     Number(item.activityVO.childPriceAll);
            item.priceAll = Number(item.num) * Number(item.activityVO.priceAll);

            // 更新购物车
            this.upDateShopCar(item);

            // 计算是否有人数限制
            if (item.activityVO.totalNum) {
                let total = Number(item.adultNum) + Number(item.childNum);
                if (total === item.activityVO.totalNum) {
                    this.stepperDis = true;
                    return false;
                }
            }
        },
        /**
         * 更新购物车
         */
        upDateShopCar(item) {
            let parmas = {
                shoppingCartVO: {
                    activityVO: item.activityVO,
                    adultNum: item.adultNum,
                    childNum: item.childNum,
                    id: item.id,
                    price: item.price,
                },
            };
            this.$http.updateShoppingCart(parmas).then((res) => {});
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    @include fj;
    width: 100%;
    height: 100vh;
    background: $--color-bg;
    .top {
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
        text-align: right;
        padding: 0 40rpx;
        background: $--color-white;
        font-size: $--text-lg;
    }
    .carView {
        flex: 1;
        width: 100%;
        padding: 20rpx 30rpx;
        .carItem {
            @include fj(flex-start);
            background: $--color-white;
            border-radius: 12rpx;
            padding: 20rpx;
            margin-bottom: 20rpx;

            .check {
                width: 40rpx;
                @include fj(center);
            }
            .imgDiv {
                @include fj;
                padding: 0 20rpx;
                width: 220rpx;
                height: 160rpx;
                img {
                    width: 100%;
                    height: 160rpx;
                }
            }
            .infoDiv {
                flex: 1;
                color: $--color-gray-6;
                overflow: hidden;
                .title {
                    @include ellipsis;
                    font-size: $--text-lg;
                }
                .other {
                    color: $--color-gray-6;
                    font-size: $--text-nm;
                }
                .totalNum {
                    color: $--color-secondary;
                    font-size: $--text-sm;
                }
                .priceDiv {
                    width: 100%;
                    font-size: $--text-nm;
                    .row {
                        @include fj;
                        line-height: 60rpx;
                    }
                    .price {
                        text-align: right;
                        padding-left: 10rpx;
                        font-size: $--text-l;
                        color: $--color-danger;
                    }
                }
            }
        }
        .swipe-cell-right {
            position: absolute;
            top: 0;
            @include fj(center);
            height: 100%;
            width: 65px;
            color: $--color-white;
            background: $--color-danger;
        }
    }
    .coupon {
        @include fj(flex-end);
        .use {
            height: 40rpx;
            line-height: 40rpx;
            padding: 0 10rpx;
            display: inline-block;
            margin-right: 16rpx;
            color: $--color-gray-c;
            font-size: $--text-nm;
            border: 1px solid $--color-gray-c;
        }
        .num {
            display: inline-block;
            line-height: 40rpx;
            color: $--color-danger;
            font-size: $--text-nm;
            margin: 0 10rpx;
        }
    }
    .couponDiv {
        padding: 20rpx 40rpx;
        height: auto;
        max-height: 600rpx;
        .couponItem {
            @include fj();
            padding: 20rpx;
            border-radius: 6px;
            border: 1px solid $--color-gray-de;
            margin-bottom: 40rpx;
            .left {
                @include fc(center);
                width: 160rpx;
                .price {
                    font-size: $--text-xl;
                    color: $--color-danger;
                }
                .tips {
                    font-size: $--text-sm;
                    color: $--color-secondary;
                }
            }
            .center {
                @include fc(flex-start);
                align-items: flex-start;
                padding-left: 20rpx;
                flex: 1;
                .name {
                    font-size: $--text-xl;
                }
                .tips,
                .time {
                    font-size: $--text-sm;
                    color: $--color-text;
                }
            }
            .right {
                width: 80rpx;
                @include fc(center);
            }
        }
    }
    .submitBar {
        height: 100rpx;
        width: 100%;
        .bottomCheckbox {
            position: absolute;
            left: 30rpx;
        }
    }
}
</style>