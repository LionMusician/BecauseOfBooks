<template>
    <div class="container">
        <div class="top">
            <search placeholder="图书搜索" @search="searchBook"></search>
        </div>
        <div class="main">
            <scroll-view
                :scroll-y="listScroll"
                :style="'height:' + scrollHeight + 'rpx;'"
                class="book-list"
                @scrolltolower="scrollBottom"
            >
                <ul>
                    <li v-for="(item, index) in bookList" :key="index">
                        <book-item
                            :book="item"
                            @bookClick="bookClick"
                            @collectBook="collectBook"
                            @addBookToBag="addBookToBag"
                        ></book-item>
                    </li>
                    <div class="loading-view">
                        <van-loading v-if="total > bookList.length" size="14px">加载中…</van-loading>
                        <no-more v-else></no-more>
                    </div>
                </ul>
            </scroll-view>
            <cart-btn @btnClick="cartBtnClick" type="bag" :num="bagList.length"></cart-btn>
            <van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
                <cart-cover
                    @cartListBtnClick="cartListBtnClick"
                    @deleteBag="deleteBag"
                    :cartList="bagList"
                ></cart-cover>
            </van-popup>
        </div>
    </div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import noMore from "@components/noMore.vue";
import noData from "@components/noData.vue";
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
import { mapGetters } from "vuex";
export default {
    components: { search, bookItem, cartBtn, cartCover, noMore, noData },
    data() {
        let that = this;
        return {
            listScroll: true, // 允许列表滚动
            scrollHeight: that.getWindowHeight(100),
            cartCoverShow: false, // 默认不显示购物车
            bookList: [],
            bagList: [],
            searchValue: "",
            page: 1,
            size: 10,
            total: 0,
        };
    },
    computed: {
        ...mapGetters(["shopId"]),
    },
    onLoad() {
        this.queryBorrowSort();
        this.queryBag();
    },
    methods: {
        // 搜索
        searchBook(e) {
            this.searchInput = e;
            this.refreshList();
        },
        // 获取图书列表
        queryBorrowSort() {
            let data = {
                name: this.searchValue,
                readingHallId: this.shopId,
                page: this.page,
                size: this.size,
            };
            this.$http.queryBorrowSort(data).then((res) => {
                this.total = res.total;
                if (this.page === 1) {
                    this.bookList = res.bookVOS;
                } else {
                    this.bookList = [...this.bookList, ...res.bookVOS];
                }
            });
        },
        // 刷新列表
        refreshList() {
            this.page = 1;
            this.queryBorrowSort();
        },
        // 上拉加载
        scrollBottom() {
            if (this.total === this.bookList.length) {
                return;
            }
            this.page = this.page + 1;
            this.queryBorrowSort();
        },
        // 点击图书
        bookClick(book) {
            wx.navigateTo(`/pages/book/bookDetail/main?id=${book.id}`);
        },
        // 添加收藏
        collectBook(book) {
            if (book.isCollect) {
                return Tips.toast("图书已收藏！");
            }
            let data = {
                bizId: book.id,
                type: 1, // 类型：1-图书，2-活动
            };
            if (book.isCollect) {
                this.$http.deleteCollection(data).then((res) => {
                    Tips.success("取消收藏成功！");
                    this.refreshList();
                });
            } else {
                this.$http.addCollection(data).then((res) => {
                    Tips.success("收藏成功！");
                    this.refreshList();
                });
            }
        },
        // 查询书包
        queryBag() {
            this.$http.queryBag().then((res) => {
                if (!res.bookBorrowVOS) {
                    this.cartCoverShow = false;
                }
                this.bagList = res.bookBorrowVOS || [];
            });
        },
        // 加入书包
        addBookToBag(book) {
            let data = {
                bookId: book.id,
            };
            this.$http.addBag(data).then((res) => {
                Tips.success("加入书包成功！");
                this.queryBag();
            });
        },
        // 从书包删除
        deleteBag(book) {
            let data = {
                ids: [book.id],
            };
            this.$http.deleteBag(data).then((res) => {
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
            wx.navigateTo(`/pages/book/confirmAppoint/main`);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
