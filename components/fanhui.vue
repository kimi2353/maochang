<template>
	<div>
		<div class="search">
			<image @click="searchFan" src="../static/img/fanhui.png" mode=""></image>
		</div>
	</div>
</template>

<script>
	export default {
		name:"fanhui",
		data() {
			return {
				
			};
		},
		methods:{
			//返回上一级
			searchFan(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
	.search image{
		width: 120rpx;
		height: 56rpx;
	}
	.search {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>
