<template>
	<div class="container">
		<div class="couponDiv">
			<div class="swiperDiv" id="couponView">
				<swiper
					previous-margin="20px"
					next-margin="50px"
					:display-multiple-items="1"
					:current="current"
					v-if="cardList && cardList.length"
				>
					<swiper-item v-for="(item, index) in cardList" :key="index">
						<div class="bannerItem" :style="'backgroound: url(' + item.frontCover + ')'">
							<div class="coupon" @click="cardClick(index)">
								<div class="top">
									<span>{{item.typeDesc}}</span>
									<span>编码：{{item.code}}</span>
								</div>
								<div class="bottom">
									<div class="imgDiv">
										<img :src="item.qrCode" alt>
									</div>
									<div>
										<p>升级该等级</p>
									</div>
								</div>
							</div>
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
		<div>
			<div class="title">{{activeCard.typeDesc}}权益说明</div>
			<div class="Des">
				<p>有效期：{{activeCard.startDate}} - {{activeCard.endDate}}</p>
				<p
					v-if="activeCard.type === 1"
				>可借阅书册{{activeCard.borrowBookNum}}册，每次借阅{{activeCard.borrowDays}}天</p>
				<p
					v-else-if="activeCard.type === 3"
				>可参与活动{{activeCard.activityNum}}次，剩余参与{{activeCard.remainActivityNum}}次</p>
			</div>
			<div class="title">优惠券</div>
			<div class="couponItem">
				<div class="couponCss" v-for="(item, index) in couponList" :key="index">
					<div class="couponContent">
						<div class="text">{{item.typeDesc}}</div>
						<div class="line"></div>
						<div class="text" v-if="item.type === 1">满{{item.reachPrice}}元减{{item.reducePrice}}元</div>
						<div class="text" v-else>{{item.price}}元代金券</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import utils from "@/utils/utils";
export default {
	name: "",
	data() {
		let that = this;
		return {
			current: 0,
			cardList: [],
			activeCard: {},
			couponList: []
		};
	},
	onLoad() {
		// 查询卡券
		this.getMyCardAndVoucher();
	},
	methods: {
		/**
		 * 查询我的卡券
		 **/
		getMyCardAndVoucher() {
			this.$http.getMyCardAndVoucher().then(res => {
				if (res.userCardVOS && res.userCardVOS.length) {
					res.userCardVOS.forEach(item => {
						item.startDate = utils.mklog(item.startDate);
						item.endDate = utils.mklog(item.endDate);
					});
				}
				this.cardList = res.userCardVOS;
				this.activeCard = this.cardList[0];
				this.couponList = res.userVoucherVOS;
			});
		},
		/**
		 * 点击优惠券
		 */
		cardClick(index) {
			this.current = index;
			this.activeCard = this.cardList[index];
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
						.imgDiv {
							width: 80rpx;
							height: 80rpx;
							overflow: hidden;
							img {
								width: 80rpx;
								height: 80rpx;
							}
						}
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
		font-size: $--text-l;
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
