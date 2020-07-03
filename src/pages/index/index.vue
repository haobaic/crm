<template>
	<div class="app">
		<el-container>
			<el-aside style="width: auto;">
				<!--导航-->
				<el-menu default-active="1-4-1" text-color="#fff"  class="el-menu-vertical-demo" :collapse="isCollapse" v-if="$store.state.menu.menu&&$store.state.user.info" router>
					<el-menu-item index="/">
						<i class="el-icon-s-home"></i>
						<span slot="title">首页</span>
					  </el-menu-item>
					<el-submenu v-for="(item,index) in $store.state.menu.menu" :key="index" :index="item.path">
						<template slot="title">
							<i :class="icontype[item.id]"></i>
							<span slot="title">{{item.name}}</span>
						</template>
						<el-menu-item :index="ite.path" :disabled="$store.state.user.info.permissions.indexOf(ite.path)==-1" v-for="(ite,idx) in item.children" :key="idx">
							<i :class="icontype[ite.id]"></i>
							<span slot="title">{{ite.name}}</span>
						  </el-menu-item>
					</el-submenu>
				</el-menu>
				<!--导航结束-->
			</el-aside>
			<el-main v-if="$store.state.user.info&&$store.state.user.menuList">
				<div class="nav_top">
					<el-row type="flex" class="row-bg">
					  <el-col :span="12">
						  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;padding-top:5px;padding-left:10px">
						  	<el-radio-button :label="false">展开</el-radio-button>
						  	<el-radio-button :label="true">收起</el-radio-button>
						  </el-radio-group>
					  </el-col>
					  <el-col :span="12">
						  <div style="text-align: right;padding-right: 40px;">
						  	当前账号：
						  	<router-link to="/info" style="color: deepskyblue;">
						  		{{$store.state.user.info.profile.name}}	
						  	</router-link>
						  </div>
					  </el-col>
					</el-row>
				</div>
				<div style="padding: 20px;background:rgba(0,0,0,0.3);min-height:600px;position: relative;">
						<router-view></router-view>
				</div>
			</el-main>
			
		</el-container>
		<!-- <router-view/> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				icontype: {
					1: 'el-icon-setting',
					2: 'el-icon-tickets',
					4: 'el-icon-user',
					12: 'el-icon-s-custom',
					21: 'el-icon-s-check',
					17: 'el-icon-menu',
					22: 'el-icon-collection',
					41: 'el-icon-s-order',
					46: 'el-icon-document-add',
					42: 'el-icon-document',
					45: 'el-icon-folder-opened'
				}
			};
		},
		mounted() {
			this.getMenuList();
			this.getMenu();
			this.getInfo();
		},
		methods: {
			//获取功能操作信息
			async getMenuList(){
				let res=await this.$ajax.menuList()
				let json={};
				let data=res.data;
				for(let i in data){
					let child=data[i].children;
					for(let item in child){
						this.$set(json,child[item].url,child[item].children)
					}
				}
				this.$store.commit('setMenuList',json)
			},
			//获取导航
			async getMenu(){
				var res=await this.$ajax.listForRouter();
				// 修改导航状态
				this.$store.commit('setmenu',res.data)
			},
			//获取账号信息
			async getInfo(){
				var res=await this.$ajax.info();
				// 修改当前账号信息
				this.$store.commit('setinfo',res.data)
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	html,body{
		width: 100%;
		height: 100%;
	}
	body{
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../assets/bj.jpg) no-repeat;
		background-size: cover;
	}
	.app .el-menu-vertical-demo:not(.app .el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	
	.app .el-menu-vertical-demo {
		min-height: 100vh;
	}
	.app .el-menu{
		height: 100%;
		border-right:none;
		background: rgba(0, 0, 0, 0.5);
		/* background:none; */
		/* background-color:rgba(0,0,0,0); */
	}
	.app .el-menu-item {
		color: #fff !important;
	}
	.el-menu-item{
		color: #000 !important;
	}
	.el-menu-item.is-active{
		color: #409EFF !important;
	}
	.app .el-main{
	  padding: 0;	
	}
	.app .nav_top{
		height: 50px;
		line-height: 50px;
		background:#ccc;
	}
	.app .el-menu-item:hover,.app .el-submenu__title:hover{
		background:rgba(0, 0, 0, 0.2);
	}
</style>
