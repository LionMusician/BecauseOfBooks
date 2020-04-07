<template>
    <div class="container">
        <ul class="month-list">
            <li
                v-for="(item, index) in monthArr"
                :key="index"
                :class="monthSelect === index ? 'active' : ''"
                @click="selectMonth(index)"
            >
                <p>{{item.month}}月</p>
            </li>
        </ul>
        <van-calendar
            :show-title="false"
            :poppable="false"
            class="calendar"
            color="#98C145"
            confirm-text="查看详情"
            :default-date="minDate"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="toCourseInfo"
        ></van-calendar>
    </div>
</template>
<script>
import utils from "@/utils/utils.js";
import wx from "@/utils/wx-api";
export default {
    data() {
        let that = this;
        return {
            monthArr: [], // 月份数组
            monthArrLength: 3, // 月份数组长度
            monthSelect: 0, // 选择的月份索引
            minDate: 0,
            maxDate: 0,
            y: 0,
            m: 0,
            d: 0,
            courseList: [],
            // 自定义日期文案
            formatter(day) {
                const month = day.date.getMonth() + 1;
                const date = day.date.getDate();
                // console.log(month, date);
                day = {
                    ...day,
                    ...that.setCalenderInfo(month, date)
                }
                return day;
            }
        };
    },
    onLoad() {
        wx.setNavigationBarTitle("课程预约");
        this.getToday();
        this.getCourseOrder();
    },
    methods: {
        // 初始化
        getToday() {
            let today = utils.mklog();
            let y = ~~today.slice(0, 4),
                m = ~~today.slice(5, 7),
                d = ~~today.slice(8, 10);
            this.y = y;
            this.m = m;
            this.d = d;
            let monthArr = this.calcMonthArr(y, m, this.monthArrLength);
            this.monthArr = monthArr;
            this.calcCalenderDate(y, m, d, 0, monthArr);
        },
        // 计算月份数组
        calcMonthArr(year, month, len) {
            let arr = [];
            for (let i = 0; i < len; i++) {
                let y = year,
                    m = month;
                m = m + i;
                if (m > 12) {
                    m = m - 12;
                    y++;
                }
                arr.push({
                    year: y,
                    month: m
                });
            }
            return arr;
        },
        // 计算日历日期范围
        calcCalenderDate(y, m, d, index, monthArr) {
            console.log(`${y}年${m}月${d}日`);

            this.minDate = new Date(y, m - 1, d).getTime();
            this.maxDate = new Date(
                monthArr[index].year,
                monthArr[index].month,
                0
            ).getTime();
        },
        // 选择月份
        selectMonth(index) {
            let arr = this.calcMonthArr(
                this.y,
                this.m,
                this.monthArrLength + 1
            );
            let y = arr[index].year,
                m = arr[index].month,
                d = 1;
            if (m === this.m && y === this.y) {
                d = this.d;
            }
            this.calcCalenderDate(y, m, d, index, arr);
            this.monthSelect = index;
        },
        // 查询课程预约
        getCourseOrder() {
            let params = {};
            this.$http.getCourseOrder(params).then(res => {
                res.courseScheduleVOS.forEach(item => {
                    item.month = ~~item.startTime.slice(5, 7);
                    item.date = ~~item.startTime.slice(8, 10);
                })
                this.courseList = res.courseScheduleVOS;
                this.selectMonth(this.monthSelect);
            });
        },
        // 设置日历详情
        setCalenderInfo(month, date) {
            let day = {};
            this.courseList.forEach(item => {
                if(month === item.month && date === item.date) {
                    let name = item.name;
                    if(name.length > 5) {
                        name = name.slice(0, 4) + '...';
                    }
                    day.bottomInfo = name;
                }
            })
            return day;
        },
        // 查看当月课程列表
        toCourseInfo() {
            wx.navigateTo(`/pages/user/courseInfo/main?`)
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    padding-top: 30rpx;
    .month-list {
        @include fj(flex-start);
        li {
            @include wh(120rpx, 80rpx);
            text-align: center;
            p {
                line-height: 60rpx;
                display: inline-block;
                padding: 0 10rpx;
            }
            &.active {
                p {
                    border-bottom: 2rpx solid $--color-primary;
                }
            }
        }
    }
    .calendar {
        --calendar-height: 1040rpx;
    }
}
</style>