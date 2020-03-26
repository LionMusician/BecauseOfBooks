<template>
	<div class="container">
		<div class="tab">
			<div class="tabItem" :class="active === '1' ? 'tabItemActive' : ''" @click="tabClick('1')">
				<span>书籍</span>
				<span @click="editList('1')">编辑</span>
			</div>
			<div class="content"></div>
			<div class="tabItem" :class="active === '2' ? 'tabItemActive' : ''" @click="tabClick('1')">
				<span>活动</span>
				<span @click="editList('1')">编辑</span>
			</div>
		</div>
		<!-- 列表 -->
		<scroll-view :scroll-y="readList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="readListDiv">
				<div class="readListView" v-for="(item, index) in readList" :key="index">
					<div class="left">
						<div class="imgDiv">
							<img :src="item.img" alt>
						</div>
					</div>
					<div class="right">
						<p class="title">{{item.title}}</p>
						<div class="content">{{item.content}}</div>
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
		let that = this;
		return {
			active: "1",
			scrollHeight: that.getWindowHeight(66),
			readList: []
		};
	},
	onLoad() {
		// 查询阅读指导列表
		this.getMyCollection();
	},
	methods: {
		// 阅读指导数据
		getMyCollection() {
			let parmas = {
				type: this.active
			};
			this.$http.getMyCollection(parmas).then(res => {
				this.readList = res.myCollectionVOS;
			});
		},
		/**
		 * 切换图书，活动
		 **/
		tabClick(index) {
			this.active = index;
			this.getMyCollection();
		},
		/**
		 * 编辑收藏
		 **/

		editList() {}
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background: $--color-bg;
	padding: 20rpx;
	.tab {
		@include fj();
		padding: 10rpx 20rpx;
		.tabItem {
			flex: 1;
			@include fj();
			border-radius: 12rpx;
			padding: 20rpx;
			font-size: $--text-xl;
			background: $--color-white;
			span:last-child {
				font-size: $--text-l;
				color: $--color-text;
			}
		}
		.tabItemActive {
			background: $--color-primary;
		}
		.content {
			width: 40rpx;
		}
	}
	.readListDiv {
		padding: 30rpx 0;
	}
	.readListView {
		@include fj();
		height: 240rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		background: $--color-white;
		border-radius: 12rpx;
		.left {
			width: 300rpx;
			.imgDiv {
				@include fc(center);
				width: 300rpx;
				height: 240rpx;
				overflow: hidden;
				img {
					width: 200rpx;
					height: 160rpx;
				}
			}
		}
		.right {
			flex: 1;
			height: 240rpx;
			.title {
				text-align: left;
				padding: 16rpx 0 10rpx 0;
			}
			.content {
				@include ellipsisn(5);
				color: $--color-text;
				font-size: $--text-nm;
			}
		}
	}
}
</style>