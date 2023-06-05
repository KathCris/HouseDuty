<template>
  <div class="flexSup invoTableRules">
    <b-table
      style="width: 100%; margin-bottom: 0px!important;"
      :items="items"
      :fields="fields"
      striped
      sticky-header
    >
      <!-- status de ativo ou inativo -->
      <!-- <template #cell(Name)>
        <p> {{ items[0].name }} </p>
      </template> -->
      <!-- status de ativo ou inativo -->
      <template #cell(Status)>
        <button v-if="items.active === 1" class="tagAtivo">
          Ativo
        </button>
        <button v-if="items.active === 0" class="tagInativo">
          Inativo
        </button>
      </template>
      <!-- Botões de editar e excluir -->
      <template #cell(show_details)>
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
      </template>
    </b-table>
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
      fields: ['Name', 'Status', 'show_details'],
      items: [],
      // items: [
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' },
      //   { Name: 'Lavar a louça' }
      // ],
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
          console.log('dadeda', response.data.data.entities)
          this.items = response.data.data.entities
          console.log(this.items)
          console.log('this.items.name', this.items[0].name)
        })
    }
  }
}
</script>
