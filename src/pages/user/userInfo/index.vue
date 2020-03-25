<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="个人信息"></header-view>
		<div class="content">
			<!-- 家长信息 -->
			<div class="title">家长信息</div>
			<ul class="ul">
				<li class="liItem">
					<div class="left">头像</div>
					<div class="right">
						<div class="imgDiv">
							<img
								src="https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
								alt
							>
						</div>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">姓名</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">手机号</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">地区</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">微信号</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">收货地址</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
			</ul>

			<!-- 宝宝信息 -->
			<div class="title">宝宝信息</div>
			<ul class="ul">
				<li class="liItem">
					<div class="left">姓名</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">手机号</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">性别</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
				<li class="liItem">
					<div class="left">生日</div>
					<div class="right">
						<span class="value">请填写</span>
						<van-icon class="icon" name="arrow"/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
export default {
	name: "",
	data() {
		return {};
	},
	components: {
		headerView
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background: $--color-bg;
	.content {
		.title {
			font-size: $--text-l;
			color: $--color-text;
			padding: 20rpx 40rpx;
		}
		.ul {
			padding: 0 20rpx;
			background: $--color-white;
			.liItem {
				@include fj();
				border-bottom: 1px solid $--color-gray-de;
				padding: 26rpx 20rpx;
				.left {
					font-size: $--text-l;
				}
				.right {
					@include fj();
					.imgDiv {
						width: 80rpx;
						height: 80rpx;
						border-radius: 80rpx;
						background: $--color-green;
						overflow: hidden;
						img {
							width: 80rpx;
							height: 80rpx;
						}
					}
					.icon {
						font-size: $--text-xl;
						color: $--color-text;
					}
					.value {
						font-size: $--text-l;
						color: $--color-text;
					}
				}
			}
			.liItem:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>