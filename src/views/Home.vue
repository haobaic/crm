<template>
	<div class="home">
		<div ref="echarts" style="width: 100%;height:400px;" v-on-echart-resize></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import onEchartResize from '@/utils/echartsResize.js'
	export default {
		name: 'Home',
		data() {
			return {
				// chartData:null
				myChart: ''
			};
		},
		mounted() {
			this.myChart = echarts.init(this.$refs.echarts);
			this.getData()

		},
		methods: {
			getData() {
				//获取文章信息
				Promise.all([
					this.$ajax.channelList(),
					this.$ajax.articlebychannel()
				]).then((res) => {
					//分类数据
					let typeListy = res[0].data;
					//文章数量
					let numx = res[1].data;
					//迭代新数组
					let typearr = typeListy.map((item) => {
						return item.name;
					})
					//数量数组
					let newnum = numx.map((item) => {
						return item.articles;
					})
					this.drawCharts(typearr, newnum);
					console.log(typearr, newnum)
				}, (err) => {
					location.href = "./login.html"
				})
			},
			drawCharts(typearr, newnum) {
				var option = {
					title: {
						text: '文章统计',
						textStyle: {
							color: 'rgba(255, 255, 255,1)',
							fontSize: 18, // 务必记住设置文字大小只能是数字
							fontWeight: 'lighter'
						}
					},
					tooltip: {},
					grid: {
						top: "50px",
						left: "50px",
						right: "15px",
						bottom: "50px"
					},
					textStyle: {
						color: 'rgba(255, 255, 255,1)',
						fontSize: 100
					},
					xAxis: {
						data: typearr,
						axisLabel: {
							show: true,
							textStyle: {
								fontSize: 20
							}
						}
					},
					yAxis: {
						axisLabel: {
							show: true,
							textStyle: {
								fontSize: 20
							}
						}
					},
					series: [{
						name: '数量',
						type: 'bar',
						data: newnum
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				this.myChart.setOption(option);
			}
		}
	}
</script>
