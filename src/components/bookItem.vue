<template>
	<div class="container">
		<div class="main">
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
						<div class="collect" @click="clickFunc('collect')">
							<i class="iconfont iconshoucang"></i>
							<p>收藏</p>
						</div>
						<div class="add" @click="clickFunc('add')">
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
		},
		index: {
			type: Number,
			default: () => {
				return 0;
			}
		}
	},
	methods: {
		clickFunc(type) {
			this.$emit(type, this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
	.main {
		@include fj;
		border-bottom: 1rpx solid $--color-gray-c;
		.left {
			@include wh(240rpx, 240rpx);
			@include fj;
			.logo {
				@include wh(220rpx, 180rpx);
				background: $--color-primary;
			}
		}
		.right {
			padding: 20rpx 0 20rpx 20rpx;
			flex: 1;
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
			margin-top: 30rpx;
			.read-count {
				@include sc($--text-nm, $--color-secondary);
			}
			.btns {
				@include fj;
				.collect {
					@include fc;
					padding: 0 30rpx;
					.iconfont {
						font-size: $--text-xl;
						color: $--color-primary;
					}
					p {
						font-size: $--text-xxs;
						color: $--color-text;
					}
				}
				.add {
					@include fc;
					.iconfont {
						font-size: $--text-xl;
						color: $--color-primary;
					}
					p {
						font-size: $--text-xxs;
						color: $--color-text;
					}
				}
			}
		}
	}
}
</style>