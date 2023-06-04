<template>
  <div class="flexSup">
    <NavBar />
    <!-- <ModalActions /> -->
    <div class="flexSup invoBody">
      <HeaderNav />
      <div class="flexSup invoLineBody">
        <BodyPage />
        <CardAppointments />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import HeaderNav from '../../components/HeaderNav.vue'
import BodyPage from '../../components/BodyPage.vue'
import CardAppointments from '../../components/CardAppointments.vue'
// import ModalActions from '../../components/ModalActions.vue'

export default {
  name: 'Home',

  components: { NavBar, HeaderNav, BodyPage, CardAppointments },
  data () {
    return {

    }
  }
}
</script>
