<template>
    <div class="container">
        <div class="course">
            <van-row>
                <van-col span="6">
                    <van-image width="100rpx" height="100rpx" fit="contain" :src="course.imageURL" />
                </van-col>
                <van-col span="18">
                    <p class="title">{{course.name}}</p>
                    <p class="desc">{{course.desc}}</p>
                </van-col>
            </van-row>
        </div>
        <div class="comment">
            <van-field
                type="textarea"
                :value="comment.text"
                :maxlength="500"
                show-word-limit
                custom-style="height: 220rpx;"
                placeholder="请输入评价"
                autosize
                @change="(e)=>{return setComment(e, 'text')}"
            />
        </div>
        <div class="comment-image">
            <p class="upload-title">上传图片评论：</p>
            <van-uploader
                :file-list="fileList"
                @afterRead="afterRead"
                @delete="deleteFile"
                max-count="1"
            ></van-uploader>
        </div>
        <div class="comment-image">
            <p class="upload-title">上传语音评论：</p>
            <div class="btns">
                <van-icon v-if="recording" name="pause-circle-o" color="#98C145" :size="40" @click="pauseRecord" />
                <van-icon v-else name="play-circle-o" color="#98C145" :size="40" @click="startRecord" />
                <van-count-down
                    class="control-count-down"
                    millisecond
                    :time="30000"
                    :auto-start="false"
                    format="mm:ss"
                    @finish="finished"
                />
                <van-icon v-if="!comment.audio" name="stop-circle-o" color="#FD4346" :size="40" @click="stopRecord" />
                <van-icon v-if="!recording && comment.audio" name="replay" color="#009145" :size="40" @click="reStartRecord" />
            </div>
        </div>
        <div class="submit">
            <van-button type="primary" block @click="submitComment">发布评论</van-button>
        </div>
    </div>
</template>
<script>
const recorderManager = wx.getRecorderManager();
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
export default {
    data() {
        return {
            course: {
                imageURL: "https://img.yzcdn.cn/vant/cat.jpeg",
                name: "因为书阅读馆"
            },
            comment: {
                text: "",
                picture: "",
                audio: ""
            },
            fileList: [],
            recording: false, //正在录音
        };
    },
    onLoad() {
        this.getCommentInfo();
        recorderManager.onStart(() => {
            let countDown = this.$mp.page.selectComponent(".control-count-down");
            countDown.start();
            this.recording = true;
        });
        recorderManager.onPause(() => {
            let countDown = this.$mp.page.selectComponent(".control-count-down");
            countDown.pause();
            this.recording = false;
        });
        recorderManager.onResume(() => {
            let countDown = this.$mp.page.selectComponent(".control-count-down");
            countDown.start();
            this.recording = true;
        });
        recorderManager.onStop(res => {
            let { tempFilePath } = res;
            let countDown = this.$mp.page.selectComponent(".control-count-down");
            countDown.pause();
            this.recording = false;
            Tips.loading('正在上传录音…');
            
            wx.uploadFile(tempFilePath, res => {
                this.comment.audio = res.fileUrl;
                Tips.loaded()
                Tips.success("上传成功！");
            });
        });
    },
    methods: {
        // 获取评论对象信息
        getCommentInfo() {
            let query = this.$root.$mp.query;
            switch (query.type) {
                case "1":
                    this.getBookDetail(query.id);
                    break;
                case "2":
                    this.getActivityDetail(query.id);
                    break;
                default:
                    break;
            }
        },
        // 查询图书详情
        getBookDetail(id) {
            let params = {
                id: id
            };
            this.$http.getBookDetail(params).then(res => {
                this.course = {
                    name: res.bookVO.name,
                    imageURL: res.bookVO.frontCover,
                    desc: res.bookVO.recommendReason
                };
            });
        },
        /**
         * 查询活动详情
         */
        getActivityDetail(id) {
            let params = {
                id: id
            };
            this.$http.getActivityDetail(params).then(res => {
                this.course = {
                    name: res.activityVO.name,
                    imageURL: res.activityVO.frontCover,
                    desc: res.activityVO.introduction
                };
            });
        },
        // 选择文件
        afterRead(e) {
            let path = e.mp.detail.file.path;
            wx.uploadFile(path, res => {
                this.fileList = [
                    {
                        url: res.fileUrl
                    }
                ];
                this.comment.picture = res.fileUrl;
            });
        },
        // 删除头像
        deleteFile(e) {
            this.fileList = [];
            this.comment.picture = "";
        },
        // 编辑
        setComment(e, index) {
            this.comment[index] = e.mp.detail;
        },
        // 开始录音
        startRecord() {
            recorderManager.start({
                duration: 30000,
                format: "mp3"
            });
        },
        // 暂停录音
        pauseRecord() {
            recorderManager.pause();
        },
        // 继续录音
        pauseResume() {
            recorderManager.resume();
        },
        // 停止录音
        stopRecord() {
            recorderManager.stop();
        },
        // 重录
        reStartRecord() {
            this.comment.audio = "";
            let countDown = this.$mp.page.selectComponent(".control-count-down");
            countDown.reset();
            setTimeout(() => {
                this.startRecord()
            }, 50);
        },
        // 发布
        submitComment() {
            let query = this.$root.$mp.query;
            let params = {
                commentVO: {
                    type: query.type,
                    bizId: query.id,
                    ...this.comment
                }
            };
            this.$http.addComment(params).then(res => {
                Tips.success("评论成功！");
                setTimeout(() => {
                    wx.navigateBack();
                }, 800);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    .course {
        @include wh(750rpx, 120rpx);
        padding: 20rpx;
        .title,
        .desc {
            @include ellipsis;
        }
    }
    .comment {
        @include wh(710rpx, 240rpx);
        margin: 20rpx auto;
        border-radius: 12rpx;
        border: 2rpx solid $--color-gray-c;
    }
    .comment-image {
        @include wh(710rpx, auto);
        margin: 20rpx auto;
        .upload-title {
            @include hh(100rpx);
        }
        .btns {
            width: 400rpx;
            margin: 0 auto;
            @include fj;
        }
    }
    .submit {
        width: 690rpx;
        margin: 100rpx auto 0;
    }
}
</style>