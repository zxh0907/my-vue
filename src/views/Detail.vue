<template>
	<div>
		这是<strong>id={{ $route.params.id }}</strong>的详细页, 参数<strong>from={{$route.query.from}}</strong><br/>
		<router-link to="/list" alt="">返回列表页</router-link>
	</div>

</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      
    }
  },
  created () {

  }
}
</script>