<template>
	<div style="padding: 20px">
		<button>按钮</button>
	</div>
</template>
<script>
import Ruax from '../src'
export default {
	mounted() {
		const ruax = new Ruax()
		//cljLL4sT7G8qlVKvvBqLskqWAfCOMjow
		ruax.create({
			url: 'https://api.map.baidu.com/place/v2/search?query=银行&location=39.915,116.404&radius=2000&output=json&ak=cljLL4sT7G8qlVKvvBqLskqWAfCOMjow',
			dataType: 'jsonp'
		})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}
</script>
<style lang="less"></style>
