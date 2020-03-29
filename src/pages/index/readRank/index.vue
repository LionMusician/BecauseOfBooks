<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读排行"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 图书列表 -->
		<scroll-view :scroll-y="bookList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="bookList">
				<div v-for="(item, index) in bookList" :key="index">
					<book-item :book="item"></book-item>
				</div>
			</div>
		</scroll-view>
		<cart-btn></cart-btn>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";

export default {
	name: "",

	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(186),
			bookList: []
		};
	},
	onLoad() {
		// 阅读排行数据
		this.queryBorrowSort();
	},
	methods: {
		// 阅读排行数据
		queryBorrowSort() {
			this.$http.queryBorrowSort().then(res => {
				this.bookList = res.bookVOS;
			});
		}
	},
	components: {
		headerView,
		search,
		bookItem,
		cartBtn
	}
};
</script>

<style lang="scss" scoped>
.container {
	.searchDiv {
		padding: 30rpx 0 20rpx 0;
	}
}
</style>