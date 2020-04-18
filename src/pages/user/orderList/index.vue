<template>
	<div class="container">
		<van-sticky>
			<van-tabs :active="tabActive" @change="change">
				<van-tab title="全部"></van-tab>
				<van-tab title="待支付"></van-tab>
				<van-tab title="已完成"></van-tab>
			</van-tabs>
		</van-sticky>
		<ul class="order-list">
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
								<span>成人：&yen;</span>
								<span class="price">{{tip.adultPrice}}</span>
							</p>
							<p class="count">x{{tip.adultNum}}</p>
						</div>
						<div class="adult">
							<p class="name">
								<span>儿童：&yen;</span>
								<span class="price">{{tip.childPrice}}</span>
							</p>
							<p class="count">x{{tip.childNum}}</p>
						</div>
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
						>付款</van-button>
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
			orderList: []
		};
	},
	onLoad() {
		let state = this.$root.$mp.query.state;
		this.tabActive = ~~state || 0;
		this.getMyOrder();
	},
	methods: {
		// 查询我的订单
		getMyOrder() {
			let params = {
				statusList: [this.tabActive]
			};
			this.$http.getMyOrder(this.tabActive ? params : {}).then(res => {
				if (res.orderVOS && res.orderVOS.length) {
					res.orderVOS.forEach(item => {
						item.statusText = this.getStatus(item.status);
					});
				}
				this.orderList = res.orderVOS;
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
		}
	}
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
}
</style>