<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="确认订单"></header-view>
		<scroll-view :scroll-y="carList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="carView">
				<div class="carItem" v-for="(item, index) in carList" :key="index">
					<!-- <div class="check">
						<van-checkbox
							checked-color="#009145"
							:value="item.checked"
							@change="item.checked = !item.checked"
						></van-checkbox>
					</div>-->
					<div class="infoDiv">
						<p class="title">【{{item.name}}】</p>
						<p class="other">出发人数：{{item.adultNum + item.childNum}}人</p>
						<p class="other">时间：{{item.startDate}} - {{item.endDate}}</p>
						<p class="other">地址：{{item.address}}</p>
						<div class="price">&yen;{{item.price}}</div>
					</div>
				</div>
			</div>
		</scroll-view>
		<div class="submitBar">
			<van-submit-bar
				:price="totalPrice"
				button-text="立即下单"
				:submit="onClickButton"
				price-class="priceClass"
				button-class="buttonClass"
			></van-submit-bar>
		</div>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
import headerView from "@components/headerView.vue";
import utils from "@/utils/utils";
export default {
	name: "",
	data() {
		let that = this;
		return {
			totalPrice: 0,
			scrollHeight: that.getWindowHeight(160),
			carList: []
		};
	},
	onLoad() {
		// 查询待支付订单
		this.getUnPaidOrder();
	},
	methods: {
		/**
		 * 去结算
		 **/
		getUnPaidOrder() {
			this.$http.getUnPaidOrder().then(res => {
				let data = res.orderItemVOS;
				data.forEach(item => {
					item.startDate = utils.mklog(item.startDate);
					item.endDate = utils.mklog(item.endDate);
				});
				this.carList = data || [];
				this.totalPrice = res.totalPrice * 100;
			});
		}
	},
	components: {
		headerView
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
				width: 80rpx;
				@include fj(center);
			}
			.infoDiv {
				flex: 1;
				color: $--color-gray-6;
				overflow: hidden;
				padding: 0 20rpx;
				.title {
					@include ellipsis;
					padding: 10rpx 0;
					font-size: $--text-lg;
				}
				.other {
					color: $--color-gray-6;
					font-size: $--text-nm;
					padding-left: 20rpx;
				}
				.price {
					width: 100%;
					height: 60rpx;
					text-align: right;
					font-weight: 500;
					font-size: $--text-xl;
					color: $--color-danger;
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
	.submitBar {
		height: 100rpx;
		.bottomCheckbox {
			position: absolute;
			left: 30rpx;
		}
	}
}
</style>