<template>
	<div class="container">
		<div class="couponDiv">
			<div class="swiperDiv" id="couponView">
				<swiper
					previous-margin="20px"
					next-margin="50px"
					:display-multiple-items="1"
					:current="current"
					v-if="couponList && couponList.length"
				>
					<swiper-item v-for="(item, index) in couponList" :key="index">
						<div class="bannerItem">
							<div class="coupon" @click="couponClick(index)">
								<div class="top">
									<span>借阅卡</span>
									<span>编码：89757</span>
								</div>
								<div class="bottom">
									<span>123</span>
									<span>升级该等级</span>
								</div>
							</div>
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
		<scroll-view :scroll-y="true" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="title">借阅卡权益说明</div>
			<div class="Des">可借阅书册5册，每次借阅2周</div>
			<div class="title">优惠券</div>
			<div class="couponItem">
				<div class="couponCss">
					<div class="couponContent">
						<div class="text">优惠券</div>
						<div class="line"></div>
						<div class="text">满100减10</div>
					</div>
				</div>
				<div class="couponCss">
					<div class="couponContent">
						<div class="text">优惠券</div>
						<div class="line"></div>
						<div class="text">满100减10</div>
					</div>
				</div>
				<div class="couponCss">
					<div class="couponContent">
						<div class="text">优惠券</div>
						<div class="line"></div>
						<div class="text">满100减10</div>
					</div>
				</div>
				<div class="couponCss">
					<div class="couponContent">
						<div class="text">优惠券</div>
						<div class="line"></div>
						<div class="text">满100减10</div>
					</div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
export default {
	name: "",
	data() {
		return {
			scrollHeight: 0,
			current: 0,
			couponList: [
				{
					picture:
						"https://hbimg.huabanimg.com/37ac68db9658969eecf8d4dc41b0997d0d4eb90b74e72-Bqna73_fw658"
				},
				{
					picture:
						"https://hbimg.huabanimg.com/4e1461fdf7279ac99b6efabf37b10acadc8b15b521671f-KrBRm6_fw658"
				},
				{
					picture:
						"https://hbimg.huabanimg.com/446b6154ac78d43051e9d85a8e65be7ed3fb4439a4562-SpS0mO_fw658"
				}
			]
		};
	},
	onLoad() {
		this.getWindow();
	},
	methods: {
		/**
		 * 点击优惠券
		 */
		couponClick(index) {
			this.current = index;
		},
		// 获取窗口大小
		getWindow() {
			let windowWidth = wx.getSystemInfoSync().windowWidth;
			let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight / (windowWidth / 750) - 400;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background: $--color-bg;
	.couponDiv {
		@include fj(center);
		position: relative;
		height: 400rpx;
		background: #433e34;
		overflow: hidden;
		.swiperDiv {
			width: 100%;
			height: 400rpx;
			overflow: hidden;
			border-radius: 20rpx;
			.bannerItem {
				height: 100%;
				padding: 40rpx 20rpx 40rpx 20rpx;
				.coupon {
					@include fc();
					background: $--color-primary;
					width: 100%;
					height: 100%;
					border-radius: 40rpx;
					padding: 20rpx 40rpx;
					font-size: $--text-nm;
					color: $--color-white;
					.top {
						@include fj();
						width: 100%;
					}
					.bottom {
						@include fj();
						width: 100%;
					}
				}
			}
		}
	}
	.couponDiv::before {
		content: " ";
		position: absolute;
		left: -20%;
		bottom: -70%;
		width: 140%;
		height: 120%;
		border-radius: 100%;
		background: $--color-white;
	}
	.title {
		margin-top: 50rpx;
		padding: 10rpx 0;
		text-align: center;
		background: $--color-white;
		font-size: $--text-xl;
	}
	.Des {
		text-align: center;
		margin-top: 30rpx;
		font-size: $--text-lg;
	}
	.couponItem {
		text-align: center;
		padding: 0 40rpx 40rpx 40rpx;
		.couponCss {
			position: relative;
			width: 70%;
			height: 180rpx;
			margin: 0 auto;
			padding: 20rpx 40rpx;
			margin-top: 40rpx;
			background: $--color-secondary;
			.couponContent {
				@include fc(space-between);
				width: 100%;
				height: 100%;
				border-left: 1px solid #e17a36;
				border-right: 1px solid #e17a36;
				.text {
					color: $--color-white;
					font-size: $--text-l;
				}
				.text:first-child {
					padding-bottom: 10rpx;
				}
				.text:last-child {
					padding-top: 10rpx;
				}
				.line {
					height: 10px;
					width: 80%;
					margin: 0 auto;
					background: url("../../../../static/images/star.png");
					background-size: 10px 10px;
				}
			}
		}
		.couponCss:before {
			position: absolute;
			left: -20rpx;
			top: -10rpx;
			width: 0;
			border-left: 40rpx dotted $--color-bg;
			height: 150%;
			content: " ";
		}
		.couponCss::after {
			position: absolute;
			right: -20rpx;
			top: -10rpx;
			width: 0;
			border-left: 40rpx dotted $--color-bg;
			height: 150%;
			content: " ";
		}
	}
}
</style>

<style lang="scss">
#couponView {
	swiper {
		height: 100%;
	}
}
</style>
