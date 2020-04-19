<template>
    <div class="container">
        <!-- 头部 -->
        <van-sticky>
            <header-view title="图书详情"></header-view>
        </van-sticky>
        <div class="cover">
            <div class="logo">
                <img :src="book.frontCover" alt />
            </div>
            <p class="name">{{book.name}}</p>
            <ul class="tag-list">
                <li class="tag" v-for="item in book.labelVOS" :key="item">{{item.name}}</li>
            </ul>
        </div>
        <van-sticky>
            <div class="func-list">
                <ul>
                    <li
                        class="btn"
                        v-for="(item,index) in funcList"
                        :key="index"
                        @click="tagsClick(item)"
                        v-if="item.show"
                    >
                        <img
                            :src="'../../../../../../../static/images/book/' + item.pic"
                            :style="'width:' + item.width + 'rpx;height:' + item.height + 'rpx;'"
                        />
                        <p class="func-name">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </van-sticky>
        <div class="book-detial">
            <ul>
                <li id="detail" class="detail">
                    <p class="title">绘本详情</p>
                    <img :src="book.introduction" alt />
                </li>
                <li id="radio" v-if="book.audio" class="radio">
                    <p class="title">绘本音频</p>
                    <radio-play></radio-play>
                </li>
                <li id="video" v-if="book.video" class="video">
                    <p class="title">绘本视频</p>
                    <video-play></video-play>
                </li>
                <li id="evalute" class="evalute">
                    <p class="title">绘本评价</p>
                    <ul v-if="book.commentVOS">
                        <li v-for="(item, index) in book.commentVOS" :key="index">
                            <evaluate-item :evaluate="item"></evaluate-item>
                        </li>
                    </ul>
                    <p v-else>暂无评价</p>
                    <p class="to-comment" @click="toComment">去评价 ></p>
                </li>
            </ul>
        </div>
        <cart-btn @btnClick="cartBtnClick" type="bag" :num="bagList.length"></cart-btn>
        <van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
            <cart-cover
                @cartListBtnClick="cartListBtnClick"
                @deleteBag="deleteBag"
                :cartList="bagList"
            ></cart-cover>
        </van-popup>
    </div>
</template>

<script>
import radioPlay from "@components/radioPlay.vue";
import videoPlay from "@components/videoPlay.vue";
import headerView from "@components/headerView.vue";
import evaluateItem from "@components/evaluateItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import Tips from "@/utils/Tips";
export default {
    components: {
        headerView,
        radioPlay,
        videoPlay,
        evaluateItem,
        cartBtn,
        cartCover
    },
    data() {
        let that = this;
        return {
            bookId: null,
            book: {},
            scrollHeight: that.getWindowHeight(140),
            cartCoverShow: false, // 默认不显示购物车
            bagList: []
        };
    },
    computed: {
        funcList() {
            return [
                {
                    id: 0,
                    pic: "detail.png",
                    name: "详情",
                    width: 80,
                    height: 100,
                    show: true
                },
                {
                    id: 1,
                    pic: "radio.png",
                    name: "音频",
                    width: 90,
                    height: 90,
                    show: this.book.audio
                },
                {
                    id: 2,
                    pic: "video.png",
                    name: "视频",
                    width: 80,
                    height: 110,
                    show: this.book.video
                },
                {
                    id: 3,
                    pic: "booking.png",
                    name: "预约",
                    width: 75,
                    height: 110,
                    show: true
                },
                {
                    id: 4,
                    pic: this.book.isCollect ? "collect.png" : "unCollect.png",
                    name: "收藏",
                    width: 75,
                    height: 100,
                    show: true
                },
                {
                    id: 5,
                    pic: "search.png",
                    name: "评论",
                    width: 80,
                    height: 70,
                    show: true
                }
            ];
        }
    },
    onShow() {
        this.getBookDetail();
    },
    onLoad() {
        this.queryBag();
    },
    methods: {
        /**
         * 点击操作按钮
         */
        tagsClick(item) {
            switch (item.id) {
                case 0:
                    this.goToPoint("detail");
                    break;
                case 1:
                    this.goToPoint("radio");
                    break;
                case 2:
                    this.goToPoint("video");
                    break;
                case 3:
                    this.addBookToBag(item);
                    break;
                case 4:
                    // 收藏
                    if (!this.book.isCollect) {
                        this.collectBook();
                    } else {
                        this.unCollectBook();
                    }
                    break;
                case 5:
                    this.goToPoint("evalute");
                    break;
                default:
                    break;
            }
        },
        // 滑动到锚点
        goToPoint(id) {
            const query = wx.createSelectorQuery();
            query.select("#" + id).boundingClientRect();
            query.selectViewport().scrollOffset();
            query.exec(function(res) {
                res[0].top; // #the-id节点的上边界坐标
                res[1].scrollTop; // 显示区域的竖直滚动位置
                let distance = res[0].top + res[1].scrollTop - 60;
                wx.pageScrollTo({
                    scrollTop: distance
                });
            });
        },
        // 添加收藏
        collectBook() {
            let data = {
                bizId: this.book.id,
                type: 1 // 类型：1-图书，2-活动
            };
            this.$http.addCollection(data).then(res => {
                Tips.success("收藏成功！");
                this.getBookDetail();
            });
        },
        /**
         * 删除收藏
         */
        unCollectBook() {
            let data = {
                bizId: this.book.id,
                type: 1 // 类型：1-图书，2-活动
            };
            this.$http.deleteCollection(data).then(res => {
                Tips.success("取消收藏！");
                this.getBookDetail();
            });
        },
        // 查询图书详情
        getBookDetail() {
            let id = this.$root.$mp.query.id;
            this.bookId = id;
            let data = {
                id: id
            };
            this.$http.getBookDetail(data).then(res => {
                this.book = res.bookVO;
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
            wx.navigateTo({ url: `confirmAppoint/main` });
        },
        // 去评论
        toComment() {
            wx.navigateTo({
                url: `/pages/user/editComment/main?type=1&id=${this.bookId}`
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    .cover {
        position: relative;
        overflow: hidden;
        @include wh(100%, 450rpx);
        border-bottom: 1rpx solid $--color-gray-c;
        @include fc(center);
        margin-top: 30rpx;
        .logo {
            padding-bottom: 20rpx;
            img {
                @include wh(450rpx, 300rpx);
            }
        }
        .name {
            @include hh(60rpx);
            @include sc($--text-xl, $--color-text);
        }
        .tag-list {
            @include wh(150rpx, 300rpx);
            position: absolute;
            top: 30rpx;
            right: 0;
            padding-top: 30rpx;
            @include fc(flex-start);
            align-items: flex-end;
            .tag {
                text-align: center;
                width: 100rpx;
                box-sizing: content-box;
                @include hh(28rpx);
                border: 2rpx solid $--color-primary;
                border-left-color: transparent;
                border-radius: 10rpx;
                @include sc($--text-sm, $--color-primary);
                position: relative;
                margin-bottom: 20rpx;
                &::after {
                    content: "";
                    @include wh(20rpx, 20rpx);
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
    .func-list > ul {
        @include wh(750rpx, 120rpx);
        @include fj;
        padding: 10rpx 40rpx;
        background: $--color-white;
        .btn {
            @include wh(100rpx, 100rpx);
            @include fc(center);
            img {
                @include wh(60rpx, 60rpx);
            }
            .func-name {
                @include sc($--text-sm, $--color-text);
            }
        }
    }
    .book-detial {
        li {
            padding: 20rpx 30rpx;
            .title {
                @include hh(60rpx);
                @include sc($--text-lg, $--color-text);
                text-align: center;
                border-top: 1rpx solid $--color-gray-c;
            }
            .to-comment {
                @include hh(60rpx);
                text-align: center;
                @include sc($--text-lg, $--color-gray-c);
            }
        }
    }
}
</style>
