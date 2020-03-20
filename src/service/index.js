import fly from './http'

export default {
	// 查询图书列表
	queryBook: (data) => {
		return fly.request('/becausebooks-app/book/queryBook', data, { method: 'post'});
	},
}
