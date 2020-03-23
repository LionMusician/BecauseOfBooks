<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="确认订单"></header-view>
		<scroll-view :scroll-y="carList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="carView">
				<div class="carItem" v-for="(item, index) in carList" :key="index">
					<div class="check">
						<van-checkbox
							checked-color="#009145"
							:value="item.checked"
							@change="item.checked = !item.checked"
						></van-checkbox>
					</div>
					<div class="infoDiv">
						<p class="title">【{{item.title}}】</p>
						<p class="other">出发人数：{{item.num}}人</p>
						<p class="other">时间：{{item.time}}</p>
						<p class="other">地址：{{item.address}}</p>
						<div class="price">&yen;{{item.amt}}</div>
					</div>
				</div>
			</div>
		</scroll-view>
		<div class="submitBar">
			<van-submit-bar
				:price="300"
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
export default {
	name: "",
	data() {
		return {
			scrollHeight: 0,
			carList: [
				{
					title:
						"慢鱼妈妈带你慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展逛童书展",
					num: 5,
					id: "1",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					checked: false,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展",
					num: 5,
					id: "2",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					checked: false,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "3",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					checked: false,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "4",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					checked: false,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "5",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					checked: false,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "6",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					checked: false,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				}
			]
		};
	},
	onLoad() {
		this.getWindow();
	},
	methods: {
		// 获取窗口大小
		getWindow() {
			let windowWidth = wx.getSystemInfoSync().windowWidth;
			let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight / (windowWidth / 750) - 100 - 60;
		},
		/**
		 * 去结算
		 **/
		onClickButton() {}
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