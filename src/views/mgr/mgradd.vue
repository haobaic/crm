<template>
	<div class="mgradd">
		<el-dialog title="添加用户" :visible.sync="thistype" @close="fun(tname)">
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="thistype = false">取 消</el-button>
		    <el-button type="primary" @click="thistype = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		props:{
			type:{
				type:Boolean,
				required: true
			},
			fun:Function,
			tname:{
				type:String,
				required: true
			}
		},
		data(){
			return{
				thistype:this.type,//模态框状态
			}
		},
		watch:{
			type(){
				this.thistype=this.type
			}
		}
	}
</script>

<style>
</style>
