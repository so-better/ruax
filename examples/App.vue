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
		ruax.defaults.beforeResponse = function (xhr, res) {
			if (res) {
				if (res.state == 200) {
					return res.data
				}
			}
		}
		ruax.get('https://www.mvi-web.cn/mvi/api/cache/queryWebSiteVersion').then(res => {
			console.log(res)
		})
	}
}
</script>
<style lang="less"></style>
