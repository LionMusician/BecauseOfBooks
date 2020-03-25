<template>
	<div class="container">
		<!-- 编辑购物车按钮 -->
		<div class="top" @click="editClick">{{isEdit ? '完成' : '编辑'}}</div>
		<scroll-view :scroll-y="carList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
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
							<img :src="item.activityVO.frontCover" alt>
						</div>
						<div class="infoDiv">
							<p class="title">{{item.activityVO.name}}</p>
							<p class="other">时间：{{item.activityVO.startDate}} - {{item.activityVO.startDate}}</p>
							<p class="other">地址：{{item.activityVO.address}}</p>
							<div class="priceDiv">
								<div>
									<van-row class="row">
										<van-col>成人：</van-col>
										<van-col>
											<van-stepper
												integer
												:value="item.adultNum"
												@change="stepperChange($event,item)"
												input-class="inputClass"
												plus-class="plus-minus"
												minus-class="plus-minus"
											/>
										</van-col>
									</van-row>
									<van-row class="row">
										<van-col>儿童：</van-col>
										<van-col>
											<van-stepper
												integer
												:value="item.childNum"
												@change="stepperChange($event,item)"
												input-class="inputClass"
												plus-class="plus-minus"
												minus-class="plus-minus"
											/>
										</van-col>
									</van-row>
								</div>
								<div class="price">&yen;{{item.amt}}</div>
							</div>
						</div>
					</div>
					<view slot="right" class="swipe-cell-right">删除</view>
				</van-swipe-cell>
				<!-- 选择优惠券行 -->
				<van-cell title="优惠券">
					<div slot="right-icon" class="coupon">
						<span>
							<span class="use">已用2张</span>
							<span class="num">-&yen;50</span>
						</span>
						<van-icon name="arrow"/>
					</div>
				</van-cell>
			</div>
		</scroll-view>
		<div class="submitBar">
			<!-- 购物车结算、删除行 -->
			<van-submit-bar
				:price="isEdit ? null : 300"
				:button-text="isEdit ? '删除' : '结算'"
				@submit="onClickButton"
				price-class="priceClass"
				button-class="buttonClass"
			>
				<van-tag type="primary" class="bottomCheckbox">
					<van-checkbox checked-color="#009145" :value="allChecked" @change="onChange">全选</van-checkbox>
				</van-tag>
				<div slot="price">123</div>
			</van-submit-bar>
			<!-- 删除商品弹框 -->
			<van-dialog id="van-dialog"/>
			<!-- message 提示 -->
			<van-notify id="van-notify"/>
		</div>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
import Dialog from "../../../../static/vant/dialog/dialog.js";
import Notify from "../../../../static/vant/notify/notify.js";
export default {
	name: "",
	data() {
		return {
			isEdit: false,
			allChecked: false,
			dialogShow: false,
			scrollHeight: 0,
			carList: []
		};
	},
	onLoad() {
		this.getWindow();
		// 查询购物车
		this.queryShoppingCart();
	},
	methods: {
		// 获取窗口大小
		getWindow() {
			let windowWidth = wx.getSystemInfoSync().windowWidth;
			let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight / (windowWidth / 750) - 100 - 60;
		},
		/**
		 * 查询购物车
		 **/
		queryShoppingCart() {
			this.$http.queryShoppingCart().then(res => {
				let data = res.data.data.shoppingCartVOS;
				data.map(item => {
					item.checked = false;
				});
				this.carList = data;
			});
		},
		/**
		 * 去结算
		 **/
		onClickButton() {
			// isEdit true:删除  false:结算
			console.log("carList", this.carList);
			if (this.isEdit) {
				this.delGoods().then(res => {
					Dialog({
						message: res,
						asyncClose: true,
						showCancelButton: true
					})
						.then(() => {
							if (this.allChecked) {
								this.carList = [];
								this.$set(this, "carList", []);
							} else {
								let arr = this.carList.filter(item => {
									return !item.checked;
								});
								this.$set(this, "carList", arr);
								// this.carList = arr;
							}
							Notify({
								type: "success",
								message: "删除成功"
							});
							Dialog.close();
						})
						.catch(() => {
							Dialog.close();
						});
				});
			} else {
				wx.navigateTo("/pages/index/confirmOrder/main");
			}
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
					this.carList.forEach(item => {
						if (item.checked) {
							num++;
						}
					});
					text = `确认将这${num}个宝贝删除？`;
					if (!num) {
						Notify({
							type: "warning",
							message: "请选择要删除的商品"
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
			this.carList.map(item => {
				item.checked = this.allChecked;
			});
		},
		/**
		 * 删除弹框 点击确认
		 */
		onConfirm() {},
		/**
		 * 计步器改变
		 **/
		stepperChange(e, item) {
			item.num = e.mp.detail;
		}
	}
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
				.priceDiv {
					@include fj;
					width: 100%;
					font-size: $--text-nm;
					.row {
						line-height: 60rpx;
					}
					.price {
						@include fc(flex-end);
						height: 120rpx;
						text-align: right;
						font-weight: 500;
						font-size: $--text-xl;
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