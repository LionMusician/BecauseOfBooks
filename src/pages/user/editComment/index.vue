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
        <div class="submit">
            <van-button type="primary" block @click="submitComment">发布评论</van-button>
        </div>
    </div>
</template>
<script>
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
                picture: ""
            },
            fileList: []
        };
    },
    onLoad() {
        this.getCommentInfo();
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
            @include hh(80rpx);
        }
    }
    .submit {
        width: 690rpx;
        margin: 0 auto;
    }
}
</style>