<template>
  <div class="flexSup">
    <NavBar />
    <div class="flexSup invoBody">
      <HeaderNav />
      <div v-if="statePage === 'home'" class="flexSup invoLineBody">
        <BodyPage />
        <CardAppointments />
      </div>
      <div v-if="statePage !== 'home'" class="flexSup invoLineBody">
        <PageStart />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import NavBar from '../../components/NavBar.vue'
import HeaderNav from '../../components/HeaderNav.vue'
import BodyPage from '../../components/BodyPage.vue'
import CardAppointments from '../../components/CardAppointments.vue'
import PageStart from '../../components/PageStart.vue'

export default {
  name: 'Home',

  components: { NavBar, HeaderNav, BodyPage, CardAppointments, PageStart },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['statePage'])
  },
  methods: {
    ...mapActions(['teste'])

  }
}
</script>
