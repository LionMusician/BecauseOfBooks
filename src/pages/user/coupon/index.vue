<template>
	<div class="container">
		<div v-if="cardList && cardList.length">
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
							<div class="bannerItem">
								<div
									class="coupon"
									@click="cardClick(index)"
									:style="{backgroundImage:'url('+item.frontCover+')', backgroundSize: '100%'}"
								>
									<div class="bottom">
										<div class="left">
											<p>姓名：{{item.userName}}</p>
											<p>编码：{{item.code}}</p>
											<p>时间：{{item.startDate}} - {{item.endDate}}</p>
										</div>
										<div class="right">
											<div class="imgBox">
												<img :src="item.qrCode" alt>
											</div>
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
					<!-- <p
						v-if="activeCard.type === 1"
					>可借阅书册{{activeCard.borrowBookNum}}册，每次借阅{{activeCard.borrowDays}}天</p>-->
					<p
						v-if="activeCard.type === 3"
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
		<no-data v-else></no-data>
	</div>
</template>

<script>
import utils from "@/utils/utils";
import noData from "@components/noData.vue";
export default {
	name: "",
	components: { noData },
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
						item.startDate = item.startDate.slice(0, 10);
						item.endDate = item.endDate.slice(0, 10);
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
					// @include fc();
					// background: $--color-primary;
					position: relative;
					width: 100%;
					height: 100%;
					border-radius: 40rpx;
					padding: 20rpx 40rpx;
					font-size: $--text-nm;
					color: $--color-white;
					.bottom {
						position: absolute;
						left: 0;
						bottom: 0;
						@include fj(flex-end);
						width: 100%;
						height: 100%;
						align-items: flex-end;
						justify-content: flex-end;
						.left {
							flex: 1;
							height: 100%;
							@include fc();
							align-items: flex-start;
							justify-content: flex-end;
							padding-left: 40rpx;
							padding-bottom: 40rpx;
							font-size: $--text-sm;
						}
						.right {
							@include fc(center);
							width: 140rpx;
							padding-right: 40rpx;
							padding-bottom: 40rpx;
							.imgBox {
								width: 100rpx;
								height: 100rpx;
								img {
									width: 100rpx;
									height: 100rpx;
								}
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
