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
								<p class="danger">剩余{{item.num}}名</p>
								<div class="progress">
									<van-progress :show-pivot="false" color="#98C145" percentage="50"/>
								</div>
							</div>
							<div class="other">
								<div class="timeItem" v-for="(t, i) in item.times" :key="i">
									<div class="imgDiv">
										<img v-if="t.check" src="../../../static/images/course/check.png" alt>
										<img v-else src="../../../static/images/course/unCheck.png" alt>
									</div>
									<p class="time" :class="t.check ? 'check' : ''">{{t.check ? '预约': '取消预约'}}</p>
									<p class="time">{{t.time}}</p>
								</div>
							</div>
						</div>
					</div>
					<!-- </div> -->
				</div>
			</scroll-view>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
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
			courseList: [
				{
					title: "123",
					week: "周一",
					num: 10,
					times: [
						{ time: "12:00", check: false },
						{ time: "12:00", check: false }
					],
					img:
						"https://hbimg.huabanimg.com/7a84471a88a6042fcc4e7e0b95f776db6fc5ddd2843e5-WlopRi_fw658"
				}
			]
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
				console.log(res);
				this.getData(res.courseVOS);
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
			data.forEach(item => {
				let obj = {
					frontCover: item.frontCover,
					name: item.name,
					week: "周" + weekObj[item.week]
				};
			});
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
						.title {
							@include ellipsis2;
							font-size: $--text-l;
						}
						.danger {
							color: $--color-danger;
							font-size: $--text-nm;
							padding-bottom: 10rpx;
						}
						.progress {
							text-align: left;
							padding-right: 40rpx;
						}
					}
					.other {
						@include fj();
						flex: 1;
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
					}
				}
			}
		}
	}
}
</style>

