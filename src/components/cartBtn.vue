<template>
	<div class="main">
		<div
			class="cartBtn"
			:style="'top:' + btnTop + ';left:' + btnLeft + ';width:' + btnWidth + 'px;height:' + btnWidth +'px;'"
			@click.stop="btnClick"
			@touchstart="btnMoveStart"
			@touchmove="btnMove"
			@touchend="btnMoveEnd"
		>
			<div class="imgDiv">
				<i v-if="type === 'car'" class="iconfont icongouwuche rotateY"></i>
				<!-- <i v-else-if="type === 'bag'" class="iconfont iconshubao- rotate"></i> -->
				<i v-else class="iconfont icongongwen rotate"></i>
			</div>
			<div class="sup" v-if="num">{{num > 99 ? '99+' : num}}</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		/**
		 * 购物车 car
		 * 背包： bag
		 * 公文包 offi
		 */
		type: {
			type: String,
			default: () => {
				return "car";
			}
		},
		num: {
			type: String,
			default: 0
		}
	},
	data() {
		return {
			btnWidth: 50,
			btnTop: 0,
			btnLeft: 0,
			windowWidth: 0,
			windowHeight: 0
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
			this.btnTop = windowHeight - 120 - this.btnWidth + "px";
			this.btnLeft = windowWidth - 20 - this.btnWidth + "px";
		},
		// 按钮点击
		btnClick() {
			this.$emit("btnClick");
		},
		// 滑动开始
		btnMoveStart(e) {
			// console.log("滑动开始", e.clientX, e.clientY);
		},
		// 滑动
		btnMove(e) {
			this.btnTop = e.clientY - this.btnWidth / 2 + "px";
			this.btnLeft = e.clientX - this.btnWidth / 2 + "px";
		},
		// 滑动结束
		btnMoveEnd(e) {
			// console.log("滑动结束", e);
		}
	}
};
</script>
<style lang="scss" scoped>
.main {
	.cartBtn {
		border-radius: 50%;
		background: $--color-primary;
		position: fixed;
		z-index: 1000;
		.imgDiv {
			position: absolute;
			left: 15%;
			top: 15%;
			.iconfont {
				font-size: 66rpx;
			}
			.rotate {
				transform: translate(1px, -2px);
			}
			.rotateY {
				transform: rotateY(180deg);
			}
		}
		.sup {
			position: absolute;
			bottom: 10rpx;
			right: 8rpx;
			height: 44rpx;
			width: 44rpx;
			line-height: 44rpx;
			border-radius: 50%;
			text-align: center;
			@include sc($--text-nm, $--color-white);
			background: $--color-secondary;
		}
	}
}
</style>