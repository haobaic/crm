export default{
	state:{
		info:"",
		menuList:""	
	},
	actions:{
		
	},
	mutations:{
		// 修改当前账号信息
		setinfo(state,data){
			state.info=data;
		},
		//设置功能信息
		setMenuList(state,data){
			state.menuList=data;
		}
	}
}