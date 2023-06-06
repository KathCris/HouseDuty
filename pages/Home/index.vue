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
import Cookie from 'js-cookie'

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
      token: ''
    }
  },
  computed: {
    ...mapState(['statePage'])
  },
  mounted () {
    this.getToken()
    this.fristAcess()
  },
  methods: {
    ...mapActions(['teste']),

    getToken () {
      this.token = Cookie.get('token')

      this.checkedToken()
    },

    checkedToken () {
      if (this.token !== '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8') {
        alert('Usuario não autorizado, por favor volte para o login! :)')
        this.$router.push('/')
      }
    },

    fristAcess () {
      this.$store.commit('changeStatePage', 'home')
    }
  }
}
</script>
