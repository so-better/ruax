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
		ruax.defaults.headers = {
			a: 2
		}
		ruax.defaults.beforeRequest = function (config) {
			console.log(config)
			return config
		}
		ruax.create({
			type: 'get',
			url: 'https://118.25.177.182/api/common/cache/queryWebSiteVersion',
			headers: {
				b: 3
			}
		}).then(res => {
			console.log(res)
		})
	}
}
</script>
<style lang="less"></style>
