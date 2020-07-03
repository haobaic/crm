<template>
	<div class="login">
		<el-form ref="ruleForm" :rules="rules" :model="login" label-width="80px">
			<el-form-item label="用户名" prop="user">
				<el-input v-model="login.user" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input v-model="login.pass" show-password clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="isLoading" class="form_button" @click="submitForm('ruleForm')">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isLoading: false,
				login: {
					user: '',
					pass: ''
				},
				rules: {
					user: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.isLoading = true;
						let params = {
							username: this.login.user,
							password: this.login.pass
						}
						var res = await this.$ajax.login(params);
						if (res.msg == '用户名或密码错误') {
							setTimeout(() => {
								this.isLoading = false;
								this.$message.error('用户名或密码错误');
							}, 1000)
						} else if (res.msg == '成功') {
							setTimeout(() => {
								this.isLoading = false;
								localStorage.token = res.data.token
								location.href = './'
							}, 1000)
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}

	html,
	body {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	body {
		background:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(../../assets/bj.jpg) no-repeat;
		background-size: cover;
	}

	.login {
		width: 500px;
		margin: 200px auto;

	}

	.login /deep/ .el-form-item__label {
		color: #fff;
		font-size: 16px;
	}

	.form_button {
		width: 100%;
	}
</style>
