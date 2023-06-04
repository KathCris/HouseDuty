<template>
  <div class="flexSup">
    <NavBar />
    <div class="flexSup invoBody">
      <HeaderNav />
      <CardAppointments />
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import HeaderNav from '../../components/HeaderNav.vue'
import CardAppointments from '../../components/CardAppointments.vue'

export default {
  name: 'Home',

  components: { NavBar, HeaderNav, CardAppointments },
  data () {
    return {

    }
  }
}
</script>
