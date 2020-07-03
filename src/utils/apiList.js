let apiList = {
    login: ["post", "/account/login"], // 用户登录
	listForRouter: ["get", "/menu/listForRouter"],//获取菜单信息
	info: ["get", "/account/info"],//获取用户信息
	updatePwd: ["post", "/account/updatePwd"],//修改密码
	articlebychannel: ["get", "/article/articlebychannel"],//获取分类下文章数
	channelList: ["get", "/channel/list"],//获取文章分类信息（文章分类信息）
	menuList: ["get", "/menu/list"],//获取功能项操作信息
	userList: ["get", "/user/list"],//搜索&重置&获取用户列表
}
export default apiList;