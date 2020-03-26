<template>
	<div class="container">
		<div class="top">
			<div
				class="tabItem"
				:class="tabActive === item.value ? 'tabItemActive' : ''"
				v-for="(item, index) in tabList"
				:key="index"
				@click="tabClick(item)"
			>
				<span>{{item.label}}</span>
			</div>
		</div>
		<!-- 课程列表 -->
		<scroll-view :scroll-y="courseList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="courseDiv">
				<div class="courseItem" v-for="(item, index) in courseList" :key="index">
					<div class="left">{{item.tag}}</div>
					<div class="right"></div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(186),
			tabActive: 0,
			tabList: [
				{ label: "本周", value: 0 },
				{ label: "下周", value: 1 },
				{ label: "下下周", value: 2 }
			],
			courseList: [
				{
					tag: "0-2岁",
					week: "周一",
					img:
						"https://hbimg.huabanimg.com/8a0b97f7a0642f595b26c62e8c5fc9eb44254a16b38f7-k9DPBm_fw658",
					title: "名称",
					num: "剩余名额",
					times: ["10:00", "15:00"]
				}
			]
		};
	},
	methods: {
		/**
		 * 点击tab
		 */
		tabClick(item) {
			this.tabActive = item.value;
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	.top {
		@include fj(center);
		padding: 10rpx 0 10rpx 200rpx;
		border-top: 1px solid $--color-gray-de;
		border-bottom: 1px solid $--color-gray-de;
		.tabItem {
			flex: 1;
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 25rpx;
			margin-right: 60rpx;
			text-align: center;
			font-size: $--text-l;
			border: 1px solid $--color-primary;
		}
		.tabItemActive {
			background: $--color-primary;
		}
	}
	.courseDiv {
		.courseItem {
			@include fj();
			border-bottom: $--color-gray-de;
			.left {
				width: 100rpx;
				border-right: $--color-gray-de;
			}
			.right {
				flex: 1;
			}
		}
	}
}
</style>

