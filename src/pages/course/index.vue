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
			<scroll-view class="book-list" :scroll-y="courseList" :style="'height:' + scrollHeight + 'rpx;'"></scroll-view>
			<!-- 课程列表 -->
			<scroll-view class="book-list" :scroll-y="courseList" :style="'height:' + scrollHeight + 'rpx;'">
				<div class="courseDiv">
					<div class="courseItem" v-for="(item, index) in courseList" :key="index">
						<div class="left">{{item.tag}}</div>
						<div class="right">
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
						</div>
					</div>
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
			scrollHeight: that.getWindowHeight(186),
			tabActive: 0,
			tabList: [
				{ label: "本周", value: 0 },
				{ label: "下周", value: 1 },
				{ label: "下下周", value: 2 }
			],
			tabsList: [],
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
		 * /becausebooks-app/common/queryCategory
		 * 查询分类列表
		 */
		queryCategory() {
			let parmas = {
				type: 3
			};
			this.$http.queryCategory(parmas).then(res => {
				console.log(res);
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
		 * 课程列表
		 */
		queryCourse() {
			let parmas = {
				readingHallId: this.shopId,
				queryType: this.tabActive
			};
			console.log(this.shopId);
			this.$http.queryCourse(parmas).then(res => {
				console.log(res);
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
		.left {
			width: 200rpx;
		}
		.right {
			flex: 1;
			.courseDiv {
				.courseItem {
					@include fj();
					border-bottom: 1px solid $--color-gray-de;
					.left {
						width: 120rpx;
						font-size: $--text-lg;
						text-align: center;
					}
					.right {
						@include fj();
						border-left: 1px solid $--color-gray-de;
						padding: 20rpx;
						flex: 1;
						.week {
							width: 40rpx;
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
		}
	}
}
</style>

