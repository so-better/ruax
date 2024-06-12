<template>
	<div style="padding: 20px">
		<button>按钮</button>
	</div>
</template>
<script>
import Ruax from '../src'
export default {
	async mounted() {
		const ruax = new Ruax()
		//cljLL4sT7G8qlVKvvBqLskqWAfCOMjow
		ruax.create({
			url: '/aa',
			headers: {
				a: 1
			}
		})
		setTimeout(() => {
			ruax.create({
				url: '/bb',
				headers: {
					c: 1
				}
			})
		}, 1000)
	}
}
</script>
<style lang="less"></style>
