<template>
  <div class="flexSup">
    <NavBar />
    <HeaderNav />
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import HeaderNav from '../../components/HeaderNav.vue'

export default {
  name: 'Home',

  components: { NavBar, HeaderNav },
  data () {
    return {

    }
  }
}
</script>
