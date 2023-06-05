<template>
  <div class="flexSup directionColumn invoNavBar">
    <div class="flexSup invoLogo">
      <span class="material-icons">
        house
      </span>
      <h2> HouseDuty </h2>
    </div>
    <div class="flexSup directionColumn invoButtonsNav">
      <div class="flexSup directionColumn">
        <button class="flexSup buttonNavBarSelected" @click="changePage('home')">
          <span class="material-icons">
            grid_view
          </span>
          Home
        </button>
        <button class="flexSup buttonNavBar" @click="changePage('compromissos')">
          <span class="material-icons">
            person
          </span>
          Compromissos
        </button>
        <button class="flexSup buttonNavBar" @click="changePage('projetos')">
          <span class="material-icons">
            image
          </span>
          Projetos
        </button>
      </div>
      <!-- Rodapé -->
      <div class="flexSup directionColumn">
        <button class="flexSup buttonNavBar" @click="changePage('settings')">
          <span class="material-icons">
            settings
          </span>
          Settings
        </button>
        <button class="flexSup buttonNavBar">
          <span class="material-icons">
            logout
          </span>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['statePage'])
  },
  methods: {
    ...mapActions(['changeStatePage']),

    changePage (pageActual) {
      console.log(pageActual)
      this.$store.commit('changeStatePage', pageActual)
      console.log(this.statePage)
    }
  }
}
</script>
