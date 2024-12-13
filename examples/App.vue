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
    ruax.beforeRequest = (options) => {
      console.log('beforeRequest', options);
      return options
    }
    ruax.beforeResponse = (data) => {
      console.log(data);
      return data
    }
    ruax.create({
      url: 'https://www.so-better.cn/api/lib/all?a=1',
      responseType: 'json',
      method: 'post'
    }).then(data => {
      console.log(data);
    })
  }
}
</script>
<style lang="less"></style>
