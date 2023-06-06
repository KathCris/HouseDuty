<template>
  <div class="flexSup invoTableRules">
    <div class="flexSup invoTable">
      <div class="flexSup headerTable">
        <h3 class="textH3NameTable">
          Nome
        </h3>
        <h3>Status</h3>
        <h3>Ação</h3>
      </div>
      <div v-if="showTable" class="flexSup invoLineTable">
        <div v-for="(iten, index) in items" :key="index" class="flexSup lineTable">
          <p class="textPTable">
            {{ iten.name }}
          </p>
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
            <button v-b-modal.modal-edit-rule class="buttonTableEditDelete" @click="findRule(iten.id)">
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

    <!-- MODAL -->
    <div v-if="renderModal">
      <b-modal
        id="modal-edit-rule"
        ref="modal"
        title="Editar regra"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Nome da regra"
            label-for="input"
            invalid-feedback="Campo obrigatorio"
            :state="inputState"
          >
            <b-form-input
              id="input"
              v-model="ruleInEdit.name"
              :state="inputState"
              required
            />
          </b-form-group>
          <b-form-group
            label="Status"
            label-for="status-select"
            invalid-feedback="Campo obrigatorio"
            :state="statusSelect"
          >
            <b-form-select v-model="ruleInEdit.active" :options="options" size="sm" class="mt-3" />
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'TableRules',
  data () {
    return {
      renderModal: false,
      showTable: false,
      ruleInEdit: null,
      // modal
      teste: '',
      inputState: null,
      statusSelect: null,
      submittedInput: [],
      // table
      items: [],
      rows: 100,
      currentPage: 1,
      token: '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8',
      // SELECT
      selected: null,
      options: [
        { value: null, text: 'Selecione uma opção' },
        { value: '1', text: 'Ativo' },
        { value: '0', text: 'Inativo' }
      ]
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
          console.log('this.items', this.items)
          this.showTable = true
        })
    },

    async findRule (idRuleAtual) {
      console.log('idRuleAtual', idRuleAtual)

      await this.$axios.get(`https://sys-dev.searchandstay.com/api/admin/house_rules/${idRuleAtual}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          console.log(response)
          this.ruleInEdit = response.data.data
          console.log('this.ruleInEdit', this.ruleInEdit)
          this.renderModal = true
        })
    },

    // functions modal
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.inputState = valid
      return valid
    },
    resetModal () {
      this.teste = ''
      this.inputState = null
    },
    handleOk (bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedInput.push(this.teste)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-rule')
      })
    }

  }
}
</script>
