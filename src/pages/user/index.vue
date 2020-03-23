<template>
	<div class="container">
		<div class="infoDiv">
			<div class="topDiv">
				<div class="imgDiv">
					<img
						src="https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
						alt
					>
				</div>
				<div class="info">
					<div class="top">
						<span class="name">琪琪</span>
						<span class="star">
							<van-icon class="icon" name="star"/>
							<span>阅读达人</span>
						</span>
					</div>
					<div class="admin">
						<span>账号管理</span>
						<van-icon name="arrow"/>
					</div>
				</div>
				<div class="user">
					<div class="iconDiv">
						<van-icon class="icon" name="service"/>
						<span>客服</span>
					</div>
				</div>
			</div>
			<div class="starDiv" id="steps">
				<van-steps :steps="steps" inactive-color="#fff" active-icon="star" :active="active"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			active: 1,
			steps: [
				{
					desc: "v1"
				},
				{
					desc: "v2"
				},
				{
					desc: "v3"
				},
				{
					desc: "v4"
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.container {
	.infoDiv {
		padding: 0 30rpx;
		background: $--color-primary;
		.topDiv {
			@include fj(flex-start);
			padding-top: 30rpx;
			.imgDiv {
				@include fj(flex-end);
				width: 140rpx;
				height: 140rpx;
				border-radius: 140rpx;
				overflow: hidden;
				img {
					width: 140rpx;
					height: 140rpx;
				}
			}
			.info {
				flex: 1;
				@include fc(flex-start);
				align-items: flex-start;
				padding-left: 30rpx;
				line-height: 60rpx;
				.top {
					@include fj(flex-start);
					padding: 20rpx 0;
					.name {
						font-size: $--text-xxl;
						color: $--color-black;
					}
					.star {
						@include fj(flex-start);
						height: 36rpx;
						line-height: 36rpx;
						border-radius: 18rpx;
						padding: 0 12rpx;
						margin-left: 12rpx;
						background: $--color-secondary;
						font-size: $--text-nm;
						.icon {
							font-size: $--text-nm;
							margin-right: 10rpx;
							color: $--color-white !important;
						}
					}
				}
				.admin {
					@include fj(flex-start);
					height: 50rpx;
					line-height: 50rpx;
					padding: 0 10rpx;
					padding-left: 16rpx;
					border-radius: 25rpx;
					font-size: $--text-nm;
					color: $--color-white;
					background: $--color-secondary;
				}
			}
			.user {
				@include fj(center);
				width: 100rpx;
				.iconDiv {
					@include fc(center);
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
					background: $--color-white;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
					overflow: hidden;
					.icon {
						font-size: 60rpx;
						color: $--color-primary;
					}
					span {
						font-size: $--text-xs;
					}
				}
			}
		}
		.starDiv {
			padding: 10rpx 20rpx;
			.col {
				text-align: center;
			}
		}
	}
}
</style>
<style lang="scss">
#steps {
	.van-steps--horizontal {
		background: none !important;
	}
	.van-step__circle-container {
		background: none !important;
	}
	.van-step__circle {
		opacity: 0 !important;
	}
	.van-icon-star {
		color: $--color-secondary !important;
		opacity: 1 !important;
	}
	.van-step__line {
		height: 20rpx !important;
	}
}
</style>


