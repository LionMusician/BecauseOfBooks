<template>
	<div class="container">
		<div class="main" @click="bookClick">
			<div class="left">
				<img class="logo" :src="book.img" alt>
			</div>
			<div class="right">
				<div class="name">{{book.name}}</div>
				<ul class="tag-list">
					<li class="tag" v-for="item in book.tags" :key="item">{{item}}</li>
				</ul>
				<div class="bottom">
					<p class="read-count">阅读量：{{book.readNum}}</p>
					<div class="btns">
						<div class="collect">
							<i class="iconfont iconshoucang"></i>
							<p>收藏</p>
						</div>
						<div :class="book.count ? 'add' : 'add disabled'">
							<i class="iconfont icontianjia1"></i>
							<p>添加</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		book: {
			type: Object,
			default: {}
		}
	},
	methods: {
		// 点击图书
		bookClick() {
			this.$emit("bookClick", this.book);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
	.main {
		@include wh(690rpx, 250rpx);
		@include fj;
		padding: 20rpx 0;
		border-bottom: 1rpx solid $--color-gray-c;
		.left {
			@include wh(240rpx, 240rpx);
			@include fj;
			.logo {
				@include wh(220rpx, 200rpx);
				background: $--color-primary;
			}
		}
		.right {
			@include wh(400rpx, 240rpx);
			flex: 1;
			height: 240rpx;
			padding-left: 10rpx;
			padding: 10rpx 0 20rpx 10rpx;
			.name {
				@include hh(60rpx);
				@include sc($--text-xl, $--color-gray-6);
			}
			.tag-list {
				@include hh(60rpx);
				@include fj(flex-start);
				.tag {
					box-sizing: content-box;
					padding: 4rpx 10rpx;
					@include hh(28rpx);
					border: 2rpx solid $--color-primary;
					border-left-color: transparent;
					border-radius: 10rpx;
					@include sc($--text-nm, $--color-primary);
					margin-right: 24rpx;
					position: relative;
					&::after {
						content: "";
						@include wh(26rpx, 26rpx);
						position: absolute;
						transform: rotate(45deg);
						top: 4rpx;
						left: -10rpx;
						border-radius: 6rpx;
						border-left: 2rpx solid $--color-primary;
						border-bottom: 2rpx solid $--color-primary;
					}
				}
			}
		}
		.bottom {
			@include fj;
			margin-top: 10rpx;
			.read-count {
				@include sc($--text-nm, $--color-secondary);
			}
			.btns {
				@include fj;
				@include sc($--text-xxs, $--color-text);
				.collect {
					@include fc;
					padding: 30rpx;
					.iconfont {
						@include sc($--text-xl, $--color-primary);
					}
				}
				.add {
					@include fc;
					.iconfont {
						@include sc($--text-xl, $--color-primary);
					}
					&.disabled {
						.iconfont {
							color: $--color-gray-c;
						}
					}
				}
			}
		}
	}
}
</style>