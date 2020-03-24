<template>
    <div class="container">
		<!-- 头部 -->
		<header-view title="图书详情"></header-view>
        <ul>
            <li>
                <div class="title">已选图书</div>
			    <cart-cover :btnShow="false" :maxheight="1000000"></cart-cover>
                
            </li>
            <li>
                <div class="title">取书详情</div>
                <div class="take-form">
                    <ul>
                        <li>
                            <p class="form-label">取书日期 {{dateNow}}</p>
                            <p class="prompt">自预约之日起，图书仅保留3天，请及时领取图书。</p>
                            <van-radio-group>
                                <van-radio v-for="(item, index) in dateList" :key="index">{{item}}</van-radio>
                            </van-radio-group>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import cartCover from "@components/cartCover.vue";
import headerView from "@components/headerView.vue";
import utils from "@/utils/utils.js"
export default {
	components: {
		headerView,
        cartCover
	},
    data() {
        return {
            timeNow: '',
            dateNow: '',
            dateList: []
        }
    },
    onLoad() {
        this.getDateNow();
    },
    methods: {
        // 获取当前日期
        getDateNow() {
            let time = utils.mklog();
            if(~~time.slice(11, 13) > 16) {
                time = utils.getNextDate(time, 1) 
            }
            this.timeNow = time;
            this.dateNow = `${time.slice(0, 4)}年${time.slice(5, 7)}月`;
            let day1 = time.slice(0, 10),
                day2 = utils.getNextDate(time, 1),
                day3 = utils.getNextDate(time, 2);
            if(day1.slice(5, 7) != day2.slice(5, 7)) {
                day2 = `${day2.slice(5, 7)}月${day2.slice(8, 10)}日`
            }else {
                day2 = `${day2.slice(8, 10)}日`
            }
            if(day1.slice(5, 7) != day3.slice(5, 7)) {
                day3 = `${day3.slice(5, 7)}月${day3.slice(8, 10)}日`
            }else {
                day3 = `${day3.slice(8, 10)}日`
            }
            day1 = `${time.slice(8, 10)}日`;
            this.dateList = [
                day1,
                day2,
                day3
            ]
            console.log(this.dateList);
            
        }
    },
}
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
}
</style>