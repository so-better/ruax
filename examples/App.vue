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
		ruax.get('https://www.mvi-web.cn/api/cache/queryWebSiteVersion').then(res => {
			console.log(res)
		})
	}
}
</script>
<style lang="less"></style>
