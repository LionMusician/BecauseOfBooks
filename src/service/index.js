import fly from './http'

export default {
    // 阅读馆列表 
    queryReadingHall: (data) => {
        return fly.request('/becausebooks-app/home/queryReadingHall', data, {
            method: 'post'
        });
    },

    // --------------------------首页--------------------------------
    // 查询banner列表
    queryBanner: (data) => {
        return fly.request('/becausebooks-app/home/queryBanner', data, {
            method: 'post'
        });
    },
    // 精选热点 
    queryHotspot: (data) => {
        return fly.request('/becausebooks-app/home/queryHotspot', data, {
            method: 'post'
        });
    },
    // 绘本推荐列表 
    queryBookRecommend: (data) => {
        return fly.request('/becausebooks-app/home/queryBookRecommend', data, {
            method: 'post'
        });
    },
    // 借阅排行列表 
    queryBorrowSort: (data) => {
        return fly.request('/becausebooks-app/home/queryBorrowSort', data, {
            method: 'post'
        });
    },
    // 查询阅读指导列表 
    queryReadGuide: (data) => {
        return fly.request('/becausebooks-app/home/queryReadGuide', data, {
            method: 'post'
        });
    },
    // 查询活动列表 
    queryActivity: (data) => {
        return fly.request('/becausebooks-app/home/queryActivity', data, {
            method: 'post'
        });
    },


    // 查询图书列表
    queryBook: (data) => {
        return fly.request('/becausebooks-app/book/queryBook', data, {
            method: 'post'
        });
    },
}