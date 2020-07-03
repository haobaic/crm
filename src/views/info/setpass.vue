<!-- 修改密码组件 -->
<template>
	<div class="setpass">
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="btn">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="旧密码" prop="oldPas">
					<el-input type="password" v-model="ruleForm.oldPas" show-password autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" show-password autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" :loading="isLoading"  @click="submitForm('ruleForm')">确 定</el-button>

			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: Boolean,
				required: true
			},
			btn: {
				type: Function,
				required: true
			}
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isLoading: false,
				dialogFormVisible: this.type,
				ruleForm: {
					oldPas: '',
					pass: '',
					checkPass: '',
				},
				rules: {
					oldPas: [{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],

				}
			};

		},
		watch: {
			type(newVal, oldVal) {
				this.dialogFormVisible = this.type
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.isLoading = true;
						let params = {
							oldPassword: this.ruleForm.oldPas,
							password: this.ruleForm.pass,
							rePassword: this.ruleForm.checkPass
						}
						let res=await this.$ajax.updatePwd(params);
						if(res.msg == '成功') {
							this.isLoading = false;
							setTimeout(() => {
								this.$message({
									message: '恭喜你，修改成功了',
									type: 'success'
								});
								this.resetForm('ruleForm')
							}, 1000)
							
						} else {
							this.isLoading = false;
							this.$message.error(res.msg);
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.dialogFormVisible = false;
				this.$refs[formName].resetFields();
			}
		}
	};
</script>

<style>
</style>
