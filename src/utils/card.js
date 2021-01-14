// 名片分享样式
export default class LastMayday {
    cardInfo = {}

    do(cardInfo) {
        this.cardInfo = cardInfo
        return this._template()
    }

    TEXT_SMALL = {
        fontSize: '24rpx'
    }

    _template() {
        return {
            background: `${this.cardInfo.background}`,
            width: "658rpx",
            height: "980rpx",
            borderRadius: "48rpx",
            views: [
                {
                    type: "image",
                    url: this.cardInfo.headImage,
                    css: {
                        top: "22rpx",
                        right: "272rpx",
                        width: "148rpx",
                        height: "148rpx",
                        borderRadius: "74rpx",
                        align: "right",
                    },
                },
                // {
                //     type: "image",
                //     url: this.cardInfo.background,
                //     css: {
                //         top: "690rpx",
                //         right: "0rpx",
                //         width: "658rpx",
                //         height: "290rpx",
                //         align: "right",
                //     },
                // },
                {
                    type: "image",
                    url: this.cardInfo.shareLink,
                    css: {
                        left: "50rpx",
                        bottom: "50rpx",
                        width: "150rpx",
                        height: "150rpx",
                    },
                },
                {
                    type: "text",
                    text: `姓名：${this.cardInfo.name || "小朋友"} 年龄：${this.cardInfo.age
                        }岁`,
                    css: {
                        left: "188rpx",
                        top: "184rpx",
                        fontSize: "28rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.year}年从因为书悦读馆`,
                    css: {
                        left: "126rpx",
                        top: "234rpx",
                        fontSize: "42rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `共借阅图书`,
                    css: {
                        left: "176rpx",
                        top: "288rpx",
                        fontSize: "42rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.totalBorrowBooks}`,
                    css: {
                        left: "390rpx",
                        top: "288rpx",
                        fontSize: "42rpx",
                        align: "left",
                        color: "#FB8D60",
                    },
                },
                {
                    type: "text",
                    text: `本`,
                    css: {
                        left: `${String(this.cardInfo.totalBorrowBooks).length * 24 + 400
                            }rpx`,
                        top: "288rpx",
                        fontSize: "42rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `儿童文学类`,
                    css: {
                        left: "200rpx",
                        top: "368rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.clBorrowBooks}`,
                    css: {
                        left: `386rpx`,
                        top: "370rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#FB8D60",
                    },
                },
                {
                    type: "text",
                    text: `本`,
                    css: {
                        left: `${String(this.cardInfo.clBorrowBooks).length * 24 + 390
                            }rpx`,
                        top: "368rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `习惯养成类`,
                    css: {
                        left: "200rpx",
                        top: "418rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.hfBorrowBooks}`,
                    css: {
                        left: `386rpx`,
                        top: "420rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#FB8D60",
                    },
                },
                {
                    type: "text",
                    text: `本`,
                    css: {
                        left: `${String(this.cardInfo.hfBorrowBooks).length * 24 + 390
                            }rpx`,
                        top: "418rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `情绪管理类`,
                    css: {
                        left: "200rpx",
                        top: "468rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.emBorrowBooks}`,
                    css: {
                        left: `386rpx`,
                        top: "470rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#FB8D60",
                    },
                },
                {
                    type: "text",
                    text: `本`,
                    css: {
                        left: `${String(this.cardInfo.emBorrowBooks).length * 24 + 390
                            }rpx`,
                        top: "468rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `其他绘本类`,
                    css: {
                        left: "200rpx",
                        top: "518rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `${this.cardInfo.otherBorrowBooks}`,
                    css: {
                        left: `386rpx`,
                        top: "520rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#FB8D60",
                    },
                },
                {
                    type: "text",
                    text: `本`,
                    css: {
                        left: `${String(this.cardInfo.otherBorrowBooks).length * 24 + 390
                            }rpx`,
                        top: "518rpx",
                        fontSize: "36rpx",
                        align: "left",
                        color: "#309A4D",
                    },
                },
                {
                    type: "text",
                    text: `2020，再见`,
                    css: {
                        left: `74rpx`,
                        top: "718rpx",
                        fontSize: "32rpx",
                        align: "left",
                        color: "#FFFFFF",
                    },
                },
                {
                    type: "text",
                    text: `2021，你好`,
                    css: {
                        left: `244rpx`,
                        top: "828rpx",
                        fontSize: "32rpx",
                        align: "left",
                        color: "#FFFFFF",
                    },
                },
            ],
        };
    }
}
