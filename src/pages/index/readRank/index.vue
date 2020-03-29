<template>
	<div class="container">
		<div class="top">
			<search placeholder="图书搜索" @search="queryBorrowSort"></search>
		</div>
		<div class="main">
			<scroll-view :scroll-y="listScroll" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
				<ul>
					<li v-for="(item, index) in bookList" :key="index">
						<book-item
							:book="item"
							@bookClick="bookClick"
							@collectBook="collectBook"
							@addBookToBag="addBookToBag"
						></book-item>
					</li>
				</ul>
			</scroll-view>
			<cart-btn @btnClick="cartBtnClick" type="bag" :num="bagList.length"></cart-btn>
			<van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
				<cart-cover @cartListBtnClick="cartListBtnClick" @deleteBag="deleteBag" :cartList="bagList"></cart-cover>
			</van-popup>
		</div>
	</div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
import { mapGetters } from "vuex";
export default {
	components: { search, bookItem, cartBtn, cartCover },
	data() {
		let that = this;
		return {
			listScroll: true, // 允许列表滚动
			scrollHeight: that.getWindowHeight(40),
			cartCoverShow: false, // 默认不显示购物车
			bookList: [],
			bagList: []
		};
	},
	computed: {
		...mapGetters(["shopId"])
	},
	onLoad() {
		this.queryBorrowSort();
		this.queryBag();
	},
	methods: {
		// 获取图书列表
		queryBorrowSort(name = "") {
			let data = {
				name: name,
				readingHallId: this.shopId
			};
			this.$http.queryBorrowSort(data).then(res => {
				this.bookList = res.bookVOS;
			});
		},
		// 点击图书
		bookClick(book) {
			wx.navigateTo(`bookDetail/main?id=${book.id}`);
		},
		// 添加收藏
		collectBook(book) {
			if (book.isCollect) {
				return Tips.toast("图书已收藏！");
			}
			let data = {
				bizId: book.id,
				type: 1 // 类型：1-图书，2-活动
			};
			this.$http.addCollection(data).then(res => {
				Tips.success("收藏成功！");
				this.queryBorrowSort();
			});
		},
		// 查询书包
		queryBag() {
			this.$http.queryBag().then(res => {
				if (!res.bookBorrowVOS) {
					this.cartCoverShow = false;
				}
				this.bagList = res.bookBorrowVOS || [];
			});
		},
		// 加入书包
		addBookToBag(book) {
			let data = {
				bookId: book.id
			};
			this.$http.addBag(data).then(res => {
				Tips.success("加入书包成功！");
				this.queryBag();
			});
		},
		// 从书包删除
		deleteBag(book) {
			let data = {
				ids: [book.id]
			};
			this.$http.deleteBag(data).then(res => {
				Tips.success("删除成功！");
				this.queryBag();
			});
		},
		// 点击书包
		cartBtnClick() {
			if (!this.bagList.length) {
				return Tips.toast("书包空空如也，快去添加图书吧！");
			}
			this.cartCoverShow = !this.cartCoverShow;
		},
		// 购物车确认
		cartListBtnClick() {
			wx.navigateTo(`confirmAppoint/main`);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
