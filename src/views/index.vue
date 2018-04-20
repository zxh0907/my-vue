<template>
	<div>
		<Nav></Nav>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>

</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'index',
  data () {
    return {

    }
  },
  components: {
  	Nav
  },
  created () {
    console.log("dd");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content{background:#ddd; min-height: 500px}
</style>
