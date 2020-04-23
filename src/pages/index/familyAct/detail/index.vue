<template>
    <div class="container">
        <!-- 头部 -->
        <van-sticky>
            <header-view title="活动详情"></header-view>
        </van-sticky>
        <div class="cover">
            <div class="logo">
                <img :src="book.frontCover" alt />
            </div>
            <div class="name">{{book.name}}</div>
            <div class="price">
                <span class="color">成人：</span>
                {{book.adultPrice}}
            </div>
            <div class="price">
                <span class="color">儿童：</span>
                {{book.childPrice}}
            </div>
            <div class="progress">
                <div class="color">已报名{{book.joinNum}}人</div>
                <div class="progressItem">
                    <van-progress
                        :percentage="(book.joinNum / book.totalNum) *100"
                        :show-pivot="false"
                    />
                </div>
            </div>
            <ul class="tag-list">
                <li class="tag" v-for="item in book.tags" :key="item">{{item}}</li>
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
                    >
                        <img
                            :src="'../../../../../../../../../static/images/book/' + item.pic"
                            :style="'width:' + item.width + 'rpx;height:' + item.height + 'rpx;'"
                        />
                        <p class="func-name">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </van-sticky>
        <cart-btn :num="carNum" @btnClick="carClick"></cart-btn>
        <div class="book-detial">
            <ul>
                <li id="detail" class="detail">
                    <p class="title">活动详情</p>
                    <div>
                        <image :src="book.introduction" class='bg' mode='widthFix'></image>
                    </div>
                </li>
                <li id="evalute" class="evalute">
                    <p class="title">活动评价</p>
                    <ul v-if="book.commentVOS && book.commentVOS.length">
                        <li v-for="(item, index) in book.commentVOS" :key="index">
                            <evaluate-item :evaluate="item"></evaluate-item>
                        </li>
                    </ul>
                    <p class="noCommentVOS" v-else>暂无评价</p>
                    <p class="to-comment" v-if="book.isJoin" @click="toComment">去评价 ></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import radioPlay from "@components/radioPlay.vue";
import videoPlay from "@components/videoPlay.vue";
import headerView from "@components/headerView.vue";
import evaluateItem from "@components/evaluateItem.vue";
import cartBtn from "@components/cartBtn.vue";
import Tips from "@/utils/Tips";
import { mapGetters } from "vuex";
export default {
    components: {
        headerView,
        radioPlay,
        videoPlay,
        evaluateItem,
        cartBtn
    },
    data() {
        return {
            book: {},
            carList: []
        };
    },
    computed: {
        ...mapGetters(["shopId"]),
        carNum() {
            return this.carList && this.carList.length
                ? this.carList.length
                : 0;
        },
        funcList() {
            return [
                {
                    id: 0,
                    pic: "detail.png",
                    name: "详情",
                    width: 80,
                    height: 100
                },
                {
                    id: 1,
                    pic: this.book.isCollect ? "collect.png" : "unCollect.png",
                    name: "收藏",
                    width: 75,
                    height: 100
                },
                {
                    id: 2,
                    pic: "car.jpg",
                    name: "购买",
                    width: 75,
                    height: 110
                },
                {
                    id: 3,
                    pic: "search.png",
                    name: "评论",
                    width: 80,
                    height: 70
                },
                {
                    id: 4,
                    pic: "search.png",
                    name: "分享",
                    width: 80,
                    height: 70
                }
            ];
        }
    },
    onShow() {
        // 查询活动详情
        this.getActivityDetail();
    },
    onLoad() {
        // 查询购物车
        this.queryShoppingCart();
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
                    // 收藏
                    if (!this.book.isCollect) {
                        this.collectBook();
                    } else {
                        this.unCollectBook();
                    }
                    break;
                case 2: // 购买
                    this.addCar();
                    break;
                case 3:
                    this.goToPoint("evalute");
                    break;
                case 4:
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
        /**
         * 查询活动详情
         */
        getActivityDetail() {
            let parmas = {
                id: this.$root.$mp.query.id
            };
            this.$http.getActivityDetail(parmas).then(res => {
                this.book = res.activityVO;
            });
        },
        // 添加收藏
        collectBook() {
            // if (book.isCollect) {
            // 	return Tips.toast("图书已收藏！");
            // }
            let data = {
                bizId: this.book.id,
                type: 2 // 类型：1-图书，2-活动
            };
            this.$http.addCollection(data).then(res => {
                Tips.success("收藏成功！");
                this.getActivityDetail();
            });
        },
        /**
         * 删除收藏
         */
        unCollectBook() {
            let data = {
                bizId: this.book.id,
                type: 2 // 类型：1-图书，2-活动
            };
            this.$http.deleteCollection(data).then(res => {
                Tips.success("取消收藏！");
                this.getActivityDetail();
            });
        },
        /**
         * 加入购物车
         */
        addCar() {
            let parmas = {
                activityId: this.book.id
            };
            this.$http.addShoppingCart(parmas).then(res => {
                this.queryShoppingCart();
            });
        },
        /**
         * 查询购物车
         **/
        queryShoppingCart() {
            this.$http.queryShoppingCart().then(res => {
                this.carList = res.shoppingCartVOS;
            });
        },
        /**
         * 去购物车
         **/
        carClick() {
            wx.navigateTo({ url: "/pages/index/shopCar/main" });
        },
        // 去评论
        toComment() {
            wx.navigateTo({
                url: `/pages/user/editComment/main?type=2&id=${this.book.id}`
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    .cover {
        position: relative;
        border-bottom: 1rpx solid $--color-gray-c;
        @include fc(center);
        margin-top: 30rpx;
        .logo {
            padding-bottom: 20rpx;
            img {
                @include wh(450rpx, 300rpx);
                // background: $--color-primary;
            }
        }
        .name {
            @include hh(60rpx);
            @include sc($--text-xl, $--color-text);
        }
        .price {
            @include sc($--text-lg, $--color-text);
            .color {
                color: $--color-danger;
            }
        }
        .progress {
            @include fj(center);
            width: 60%;
            padding: 20rpx;
            .color {
                flex: 1;
                @include sc($--text-nm, $--color-text);
            }
            .progressItem {
                flex: 2;
            }
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
            &.detail {
                text-align: center;
				.bg {
                    width: 100%;
				    margin: 0 auto
				}
			}
        }
    }
}
.noCommentVOS{
    text-align: center;
    padding: 40rpx 0;
}
</style>
