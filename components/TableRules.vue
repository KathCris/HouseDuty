<template>
  <div class="flexSup invoTableRules">
    <b-table style="width: 100%; margin-bottom: 0px!important;" :items="items" :fields="fields" striped sticky-header>
      <!-- status de ativo ou inativo -->
      <template #cell(Status)>
        <button class="tagAtivo">
          Ativo
        </button>
        <button class="tagInativo">
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
      items: [
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' },
        { Name: 'Lavar a louça' }
      ],
      rows: 100,
      currentPage: 1
    }
  }
}
</script>
