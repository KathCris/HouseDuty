<template>
  <div class="flexSup invoPageConstruction">
    <h3> {{ statePage }} - Pagina em construção</h3>
    <img src="../assets/img/construction_pana.png" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageStart',

  data () {
    return {

    }
  },
  computed: {
    ...mapState(['statePage'])
  }
}
</script>
