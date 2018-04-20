<template>
	<div>
		列表页
    <ul>
      <li><router-link to="/detail/1?from=a" alt="">标题1</router-link></li>
      <li><router-link to="/detail/2?from=b" alt="">标题2</router-link></li>
    </ul>
	</div>

</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      
    }
  }
}
</script>