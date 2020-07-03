export default{
	state:{
		menu:[]
	},
	actions:{
		
	},
	mutations:{
		setmenu(state,data){
			//增加登录权限
			data.forEach((item)=>{
				item.meta.requireAuth=true;
				item.children.forEach((ite)=>{
					ite.meta.requireAuth=true;
				});
			});
			state.menu=data;
		}
	}
}