<template>
    <div class="container">
        <!-- 头部 -->
        <header-view title="图书详情"></header-view>
        <ul>
            <li>
                <div class="title">已选图书</div>
                <cart-cover :btnShow="false" :cartList="bagList" @deleteBag="deleteBag" :maxheight="1000000"></cart-cover>
            </li>
            <li>
                <div class="title">取书详情</div>
                <div class="take-form">
                    <ul>
                        <li>
                            <p class="form-label">取书日期 {{dateNow}}</p>
                            <p class="prompt">自预约之日起，图书仅保留3天，请及时领取图书。</p>
                            <van-radio-group
                                class="radio-group"
                                :value="dateSelect"
                                @change="dateChange"
                            >
                                <van-radio
                                    v-for="(item, index) in dateList"
                                    :key="index"
                                    checked-color="#628718"
                                    :name="item.id"
                                >{{item.label}}</van-radio>
                            </van-radio-group>
                        </li>
                        <li>
                            <p class="form-label">取书时间</p>
                            <van-radio-group
                                class="radio-group time"
                                :value="timeSelect"
                                @change="timeChange"
                            >
                                <van-radio
                                    v-for="(item, index) in timeList"
                                    :key="index"
                                    checked-color="#628718"
                                    :name="item.code"
                                >{{item.desc}}</van-radio>
                            </van-radio-group>
                        </li>
                        <li>
                            <p class="form-label">取书方式</p>
                            <van-radio-group
                                class="radio-group type"
                                :value="typeSelect"
                                @change="typeChange"
                            >
                                <van-radio
                                    v-for="(item, index) in typeList"
                                    :key="index"
                                    checked-color="#628718"
                                    :name="item.id"
                                >{{item.label}}</van-radio>
                            </van-radio-group>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="bottom">
            <van-button
                type="primary"
                size="normal"
                color="#98C145"
                block
                @click="returnRemind"
            >确认预约</van-button>
        </div>
    </div>
</template>
<script>
import cartCover from "@components/cartCover.vue";
import headerView from "@components/headerView.vue";
import utils from "@/utils/utils.js";
import wx from "@/utils/wx-api";
export default {
    components: {
        headerView,
        cartCover
    },
    data() {
        return {
            timeNow: "",
            dateNow: "",
            dateList: [],
            dateSelect: 0,
            timeSelect: 0,
            typeSelect: 1,
            timeList: [],
            typeList: [
                {
                    id: 1,
                    label: "快递"
                },
                {
                    id: 2,
                    label: "自取"
                }
            ],
            bagList: [], // 书包列表
        };
    },
    onLoad() {
        this.getDateNow();
        this.queryBag();
        this.takeBookDetail();
    },
    methods: {
        // 查询书包
        queryBag() {
            this.$http.queryBag().then(res => {
                this.bagList = res.bookBorrowVOS;
            });
        },
		// 从书包删除
		deleteBag(book) {
			let data = {
				ids: [book.id]
			}
            this.$http.deleteBag(data).then(res => {
				this.$http.queryBag().then(res => {
					this.bagList = res.bookBorrowVOS;
					Tips.success("删除成功！");
				});
            });
		},
        // 获取当前日期
        getDateNow() {
            let time = utils.mklog();
            if (~~time.slice(11, 13) > 16) {
                time = utils.getNextDate(time, 1);
            }
            this.timeNow = time;
            this.dateNow = `${time.slice(0, 4)}年${time.slice(5, 7)}月`;
            let day1 = time.slice(0, 10),
                day2 = utils.getNextDate(time, 1),
                day3 = utils.getNextDate(time, 2);
            if (day1.slice(5, 7) != day2.slice(5, 7)) {
                day2 = `${day2.slice(5, 7)}月${day2.slice(8, 10)}日`;
            } else {
                day2 = `${day2.slice(8, 10)}日`;
            }
            if (day1.slice(5, 7) != day3.slice(5, 7)) {
                day3 = `${day3.slice(5, 7)}月${day3.slice(8, 10)}日`;
            } else {
                day3 = `${day3.slice(8, 10)}日`;
            }
            day1 = `${time.slice(8, 10)}日`;
            this.dateList = [
                {
                    id: 0,
                    label: day1
                },
                {
                    id: 1,
                    label: day2
                },
                {
                    id: 2,
                    label: day3
                }
            ];
        },
        // 查询取书时间
        takeBookDetail() {
            this.$http.takeBookDetail().then(res => {
                this.timeList = res.takeTimes;
                this.timeSelect = res.takeTimes[0].code;
            });
        },
        // 选择取书日期
        dateChange(e) {
            this.dateSelect = e.mp.detail;
        },
        // 选择取书时间
        timeChange(e) {
            this.timeSelect = e.mp.detail;
        },
        // 选择取书方式
        typeChange(e) {
            this.typeSelect = e.mp.detail;
        },
        // 选择地址
        selectAddress() {
            wx.navigateTo(`../addressList/main`);
        },
        // 查询图书到期归还
        returnRemind() {
            this.$http.returnRemind().then(res => {
                if(res.isRemind) {
                    Tips.toast("请先归还，再借书。");
                }else {
                    this.borrowBook();
                }
            });
        },
        // 预约
        borrowBook() {
            let data = {
                receiveAddressId: '',
                takeDate: `${this.dateNow}${this.dateList[this.dateSelect].label}`,
                takeTime: this.timeSelect,
                takeWay: this.typeSelect
            }
            console.log(data);
            
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    .title {
        @include wh(750rpx, 60rpx);
        padding: 0 40rpx;
        line-height: 60rpx;
        background: $--color-primary;
        @include sc($--text-lg, $--color-dark);
        font-weight: 700;
    }
    .take-form {
        @include sc($--text-lg, $--color-dark);
        padding: 10rpx 50rpx;
        .form-label {
            @include hh(60rpx);
        }
        .prompt {
            @include sc($--text-sm, $--color-danger);
            @include hh(40rpx);
        }
        .radio-group {
            padding: 10rpx 0;
            @include fj;
            &.time {
                width: 540rpx;
            }
            &.type {
                width: 430rpx;
            }
        }
    }
    .bottom {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>