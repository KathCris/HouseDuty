<template>
  <div class="flexSup invoCardAp">
    <div class="flexSup directionColumn backgroundCard">
      <h3> Compromissos da semana  </h3>

      <div class="flexSup lineAp">
        <img src="../assets/img/11.png" alt="">
        <p>Limpar a casa</p>
      </div>

      <button class="flexSup buttonNavBarSelected centerlizer" @click="changePage('compromissos')">
        Ir para compromissos
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CardAppointments',
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
      this.$store.commit('changeStatePage', pageActual)
    }
  }
}

</script>
