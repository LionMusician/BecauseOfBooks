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
		<div class="content">
			<scroll-view
				:scroll-y="courseList"
				:style="'height:' + scrollHeight + 'rpx;width: 140rpx;border-right: 1px solid #DEDEDE'"
			>
				<div
					class="ageList"
					:class="ageActive === age.id ? 'ageActive' : ''"
					v-for="(age, index) in ageList"
					:key="index"
					@click="ageClick(age)"
				>{{age.name}}</div>
			</scroll-view>
			<!-- 课程列表 -->
			<scroll-view :scroll-y="courseList" :style="'height:' + scrollHeight + 'rpx;'">
				<div class="courseItem" v-for="(item, index) in courseList" :key="index">
					<!-- <div class="right"> -->
					<div class="week">{{item.week}}</div>
					<div class="weekRight">
						<div class="imgDiv">
							<img :src="item.img" alt>
						</div>
						<div class="infoDiv">
							<div class="info">
								<p class="title">{{item.title}}</p>
								<!-- <p class="danger">剩余{{item.num}}名</p>
								<div class="progress">
									<van-progress :show-pivot="false" color="#98C145" percentage="50"/>
								</div>-->
							</div>
							<div class="other">
								<div class="timeItem" v-for="(t, i) in item.times" :key="i">
									<div class="imgDiv" @click="orderOrCancelCourse(t)">
										<img v-if="t.check" src="../../../static/images/course/unCheck.png" alt>
										<img v-else src="../../../static/images/course/check.png" alt>
									</div>
									<p class="time" :class="t.check ? '' : 'check'">{{t.check ? '取消预约': '预约'}}</p>
									<p class="time">{{t.time}}</p>
									<div class="progress">
										<van-progress
											:show-pivot="false"
											color="#98C145"
											:percentage="(t.remainNum/t.totalNum)*100"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<van-toast id="van-toast"/>
					<!-- </div> -->
				</div>
				<div class="noData" v-if="!courseList || !courseList.length">
					<van-icon class="icon" name="smile-comment"/>
					<p>暂无数据</p>
				</div>
			</scroll-view>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Toast from "../../../static/vant/toast/toast.js";
export default {
	components: {},
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(74),
			tabActive: 1,
			tabList: [
				{ label: "本周", value: 1 },
				{ label: "下周", value: 2 },
				{ label: "下下周", value: 3 }
			],
			ageList: [],
			ageActive: "",
			courseList: []
		};
	},
	computed: {
		...mapGetters(["shopId"])
	},
	onLoad() {
		// 分类
		this.queryCategory();
	},
	methods: {
		/**
		 * 预约、取消课程
		 */
		orderOrCancelCourse(item) {
			let parmas = {
				courseScheduleId: item.id,
				status: item.check ? 1 : 2
			};
			this.$http.orderOrCancelCourse(parmas).then(res => {
				Toast.success(item.check ? "预约成功" : "取消预约成功");
				this.queryCourse();
			});
		},
		/**
		 * 查询分类列表
		 */
		queryCategory() {
			let parmas = {
				type: 3
			};
			this.$http.queryCategory(parmas).then(res => {
				this.ageList = res.categoryVOS[0].children;
				this.ageActive = this.ageList[0].id;
				this.queryCourse();
			});
		},
		/**
		 * 点击tab
		 */
		tabClick(item) {
			this.tabActive = item.value;
			this.queryCourse();
		},
		/**
		 * 切换 年龄标签
		 */
		ageClick(item) {
			this.ageActive = item.id;
			this.queryCourse();
		},
		/**
		 * 课程列表
		 */
		queryCourse() {
			let parmas = {
				readingHallId: this.shopId,
				queryType: this.tabActive,
				categoryIds: [this.ageActive]
			};
			this.$http.queryCourse(parmas).then(res => {
				this.courseList = this.getData(res.courseVOS);
				console.log(this.courseList);
			});
		},
		/**
		 * 整理数据
		 */
		getData(data) {
			let arr = [];
			let weekObj = {
				1: "日",
				2: "一",
				3: "二",
				4: "三",
				5: "四",
				6: "五",
				7: "六"
			};
			if (data && data.length) {
				data.forEach(item => {
					let obj = {
						img: item.frontCover,
						title: item.name,
						week: "周" + weekObj[item.weekday],
						times: []
					};
					if (
						item.courseScheduleVOS &&
						item.courseScheduleVOS.length
					) {
						item.courseScheduleVOS.forEach(time => {
							let t = {
								id: time.id,
								startTime: time.startTime,
								remainNum: time.remainNum,
								totalNum: time.totalNum,
								usedNum: time.usedNum,
								check: false
							};
							obj.times.push(t);
						});
					}
					arr.push(obj);
				});
			}
			return arr;
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	background: $--color-white;
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
	.content {
		@include fj();
		.ageList {
			@include fj(center);
			width: 140rpx;
			height: 180rpx;
			border-bottom: 1px solid $--color-gray-de;
		}
		.ageActive {
			background: $--color-primary;
		}
		.courseItem {
			@include fj();
			flex: 1;
			height: 180rpx;
			border-bottom: 1px solid $--color-gray-de;
			.week {
				width: 60rpx;
				text-align: center;
			}
			.weekRight {
				@include fj(flex-start);
				flex: 1;
				padding-left: 20rpx;
				.imgDiv {
					@include fj();
					width: 100rpx;
					height: 120rpx;
					overflow: hidden;
					img {
						width: 100rpx;
						height: 120rpx;
					}
				}
				.infoDiv {
					@include fj();
					flex: 1;
					text-align: left;
					height: 100%;
					.info {
						flex: 1.5;
						padding-left: 20rpx;
						font-size: $--text-nm;
						height: 120rpx;
						line-height: 120rpx;
						.title {
							@include ellipsis2;
							font-size: $--text-l;
						}
						.danger {
							color: $--color-danger;
							font-size: $--text-nm;
							padding-bottom: 10rpx;
						}
					}
					.other {
						@include fj();
						flex: 1;
						padding: 0 6rpx;
						.timeItem {
							flex: 1;
							.imgDiv {
								@include fj();
								width: 88rpx;
								height: 88rpx;
								overflow: hidden;
								margin: 0 auto;
								img {
									width: 88rpx;
									height: 88rpx;
								}
							}
							.time {
								text-align: center;
								color: $--color-text;
								font-size: $--text-xs;
							}
							.check {
								color: $--color-secondary;
							}
						}
						.progress {
							padding: 4rpx;
						}
					}
				}
			}
		}
		.noData {
			text-align: center;
			margin-top: 20%;
			.icon {
				color: $--color-gray-c;
				font-size: 80rpx;
				margin-bottom: 20rpx;
			}
			p {
				color: $--color-gray-c;
			}
		}
	}
}
</style>

