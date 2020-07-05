<template>
	<div>
		<template v-for="(item,index) in $store.state.user.menuList[this.$route.path]">
			<el-button :key="item.id" type="primary" v-if="item.statusName=='启用'" @click="btn(item.code)">
				{{item.name}}
			</el-button>
		</template>
			<el-row style="padding-top: 20px;">
				<el-col :span="20">
					<el-input v-model="names"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">
					<el-button type="primary" @click="getUserList()">搜索</el-button>
				</el-col>
				<el-col :span="2" style="text-align: center;">
					<el-button type="primary" @click="clears()">重置</el-button>
				</el-col>
			</el-row>
		<div v-if="tableData" style="margin-top: 30px;">
			<el-table :data="tableData" height="505" style="width: 100%;" @cell-click="celltable">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="昵称">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="账号">
								<span>{{ props.row.account }}</span>
							</el-form-item>
							<el-form-item label="状态">
								<span>{{ props.row.statusName }}</span>
							</el-form-item>
							<el-form-item label="部门">
								<span>{{ props.row.deptName }}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span>{{ props.row.createTime }}</span>
							</el-form-item>
							<el-form-item label="性别">
								<span>{{ props.row.sexName }}</span>
							</el-form-item>
							<el-form-item label="手机号">
								<span>{{ props.row.phone }}</span>
							</el-form-item>
							<el-form-item label="邮箱">
								<span>{{ props.row.email }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="昵称" prop="name">
				</el-table-column>
				<el-table-column label="账号" prop="account">
				</el-table-column>
				<el-table-column label="状态" prop="statusName">
				</el-table-column>
			</el-table>
			<mgradd :type="buttontype.mgrAdd" :fun="showbtn" tname="mgrAdd"></mgradd>
			<div class="page" v-if="total">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :page-size="10"
				  :total="total"
				  :hide-on-single-page="tableData.length<=10"
				  @current-change="changePage"
				  >
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import mgradd from './mgradd.vue'
	export default {
		data() {
			return {
				tableData: [],
				total:"",//总数
				names:"",//搜索名字
				buttontype:{
					mgrAdd:false,
					mgrEdit:false,
					mgrDelete:false,
					mgrReset:false,
					mgrFreeze:false,
					mgrUnfreeze:false,
					mgrSetRole:false
				},
				tablerow:"",//当前被选中状态
			}
		},
		components:{
		  mgradd	
		},
		mounted() {
			this.getUserList()
		},
		methods: {
			//点击选中用户
			celltable(row){
				this.tablerow=row;
			},
			//关闭弹框
			showbtn(type){
				this.buttontype[type]=false;
			},
			//统一管理按钮点击事件
			btn(i){
				
				if(i=="mgrAdd"){
					this.buttontype[i]=true;
				}else{
					if(this.tablerow==""){
						this.$message.error("请选择要操作的用户");
					}else{
						if(i=="mgrFreeze"){
							if(this.tablerow.statusName=="冻结"){
								this.$message.error("当前用户是冻结状态");
							}else{
								this.buttontype[i]=true;
							}
						}else if(i=="mgrUnfreeze"){
							if(this.tablerow.statusName=="启用"){
								this.$message.error("当前用户是启用状态");
							}else{
								this.buttontype[i]=true;
							}
						}else{
							this.buttontype[i]=true;
						}
					}
				}
			},
			//重置
			clears(){
				this.names="";
				this.getUserList();
			},
			//获取用户列表
			async getUserList(page=1) {
				let params = {
					page,
					limit: 10,
					name:this.names
				}
				let res = await this.$ajax.userList(params);
				this.tableData = res.data.records;
				this.total=res.data.total
			},
			//页数改变
			changePage(page){
				this.getUserList(page)
			}
		}
	}
</script>

<style scoped>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
	.page{
		margin-top: 30px;
	}
	.page .el-pagination{
		text-align: center;
	}

</style>
