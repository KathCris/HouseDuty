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
            <button v-b-modal.modal-edit-rule class="buttonTableEditDelete" @click.prevent="findRule(iten.id)">
              <span class="material-icons">
                edit
              </span>
            </button>
            <button v-b-modal.modal-1 class="buttonTableEditDelete" @click.prevent="findDeleteRules(iten.id)">
              <span class="material-icons">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flexSup fotterTable">
      <div class="flexSup invoPagination">
        <p>Página {{ currentPage }} de {{ qtdPages }} </p>
        <div class="flexSup pagination">
          <button class="btnNavigate">
            <span class="material-icons">
              chevron_left
            </span>
          </button>
          <button class="btnNavigate">
            <span class="material-icons">
              navigate_next
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL EDICAO -->
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
            <b-form-select
              v-model="ruleInEdit.active"
              :options="options"
              size="sm"
              class="mt-3"
              :state="statusSelect"
              required
            />
          </b-form-group>
        </form>
      </b-modal>
    </div>

    <!-- MODAL DE EXCLUSAO -->
    <b-modal id="modal-1" title="Excluir regra">
      <p class="my-4">
        Tem certeza que deseja excluir essa regra?
      </p>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="deleteRule()"
          >
            Excluir
          </b-button>
          <b-button
            style="margin-right: 16px;"
            size="sm"
            class="float-right"
            @click="$bvModal.hide('modal-1')"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  // name: 'TableRules',
  data () {
    return {
      qtdPages: null,
      qtdRulesLocal: 0,
      idRule: null,
      idDeleteRule: null,
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
  computed: {
    ...mapState(['qtdRules'])
  },
  mounted () {
    this.listRules()
  },
  methods: {
    ...mapActions(['showQtdRules']),

    async listRules () {
      await this.$axios.get('https://sys-dev.searchandstay.com/api/admin/house_rules', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          this.items = response.data.data.entities
          this.qtdRulesLocal = response.data.data.pagination.total
          this.commitShowQtdRules()

          this.qtdPages = response.data.data.pagination.total_pages

          this.showTable = true
        })
    },

    commitShowQtdRules () {
      this.$store.commit('showQtdRules', this.qtdRulesLocal)
    },

    async findRule (idRuleAtual) {
      this.idRule = idRuleAtual

      await this.$axios.get(`https://sys-dev.searchandstay.com/api/admin/house_rules/${this.idRule}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          this.ruleInEdit = response.data.data
          this.renderModal = true
        })
    },

    // functions modal
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.inputState = valid
      this.statusSelect = valid
      return valid
    },
    resetModal () {
      this.inputState = null
      this.statusSelect = null
    },
    handleOk (bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }

      if (confirm('Tem certeza que deseja editar essa regra?')) {
        this.editRule()

        this.$nextTick(() => {
          this.$bvModal.hide('modal-edit-rule')
        })
      } else {
        return 'cancel'
      }
    },

    async editRule () {
      const data = {
        house_rules: {
          name: this.ruleInEdit.name,
          active: this.ruleInEdit.active
        }
      }
      await this.$axios.put(`https://sys-dev.searchandstay.com/api/admin/house_rules/${this.idRule}`, data, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          try {
            alert('Regra editada com sucesso!')
            window.location.reload()
          } catch (error) {
            alert('Ocorreu um erro! :(')
          }
        })
    },

    findDeleteRules (idDeleteRuleActual) {
      this.idDeleteRule = idDeleteRuleActual
    },

    async deleteRule () {
      await this.$axios.delete(`https://sys-dev.searchandstay.com/api/admin/house_rules/${this.idDeleteRule}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          try {
            alert('Regra excluida com sucesso!')
            window.location.reload()
          } catch (error) {
            alert('Ocorreu um erro! :(')
          }
        })
    }

  }
}
</script>
