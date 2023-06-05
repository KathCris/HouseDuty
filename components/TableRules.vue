<template>
  <div class="flexSup invoTableRules">
    <div class="flexSup invoTable">
      <div class="flexSup headerTable">
        <h3 class="textH3NameTable">Nome</h3>
        <h3>Status</h3>
        <h3>Ação</h3>
      </div>
      <div class="flexSup invoLineTable">
        <div v-for="(iten, index) in items" :key="index" class="flexSup lineTable">
          <p class="textPTable">{{ iten.name }}</p>
          <div class="flexSup invoStatus">
            <div v-if="iten.active === 1" class="flexSup statusAtivo">
              <button class="tagAtivo">
                Ativo
              </button>
            </div>
            <div v-if="iten.active === 0" class="flexSup statusInativo">
              <button class="tagInativo">
                Inativo
              </button>
            </div>
          </div>
          <div class="flexSup invoButtonsTable">
            <button class="buttonTableEditDelete">
              <span class="material-icons">
                edit
              </span>
            </button>
            <button class="buttonTableEditDelete">
              <span class="material-icons">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flexSup fotterTable">
      <b-pagination v-model="currentPage" pills :total-rows="rows" style="margin-bottom: 0px!important;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRules',
  data () {
    return {
      items: [],
      rows: 100,
      currentPage: 1,
      token: '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8'
    }
  },
  mounted () {
    this.listRules()
  },
  methods: {

    async listRules () {
      await this.$axios.get('https://sys-dev.searchandstay.com/api/admin/house_rules', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          this.items = response.data.data.entities
        })
    }
  }
}
</script>
