<template>
	<div>
		<template v-for="(item,index) in $store.state.user.menuList[this.$route.path]">
			<el-button :key="item.id" type="primary" v-if="item.statusName=='启用'">
				{{item.name}}
			</el-button>
		</template>
		<div v-if="tableData" style="margin-top: 30px;">
			<el-table :data="tableData" height="505" style="width: 100%;">
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
			<div class="page" v-if="total">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :page-size="10"
				  :total="total"
				  @current-change="changePage"
				  >
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				total:"",//总数
			}
		},
		mounted() {
			this.getUserList()
		},
		methods: {
			//获取用户列表
			async getUserList(page=1) {
				let params = {
					page,
					limit: 10,
					name: ""
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
