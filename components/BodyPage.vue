<template>
  <div class="flexSup invoBodyPage">
    <h2>Bem vindo!</h2>
    <div class="flexSup invoCardsRulesAp">
      <div class="flexSup">
        <img src="../assets/img/17-athletics.png" alt="">
        <div class="flexSup textBigNumbers">
          <h4> {{ qtdRules }} </h4>
          <p>Regras da casa</p>
        </div>
      </div>
      <div class="flexSup">
        <img src="../assets/img/17-athletics.png" alt="">
        <div class="flexSup textBigNumbers">
          <h4>1</h4>
          <p>Compromissos da semana</p>
        </div>
      </div>
    </div>
    <div class="flexSup invoRulesHouse">
      <div class="flexSup textRule">
        <h1>Regras da casa</h1>
        <p>Nessa sessão você pode visualizar todos as regras da sua casa, adicionar nova, excluir e editar as regras.</p>
      </div>
      <button v-b-modal.modal-prevent-closing class="buttonCreatRules">
        <span class="material-icons">
          add_circle_outline
        </span>
        Criar nova regra
      </button>
    </div>
    <div class="flexSup invoTable">
      <TableRules />
    </div>

    <!-- MODAL -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Regras"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Nome da regra"
            label-for="name-input"
            invalid-feedback="Campo obrigatorio"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="nameRule"
              :state="nameState"
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
              v-model="selectedActive"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import TableRules from '../components/TableRules.vue'

export default {
  name: 'BodyPage',

  components: { TableRules },

  data () {
    return {
      testeRender: false,
      nameRule: '',
      nameState: null,
      statusSelect: null,
      submittedNames: [],
      // SELECT
      selectedActive: null,
      options: [
        { value: null, text: 'Selecione uma opção' },
        { value: '1', text: 'Ativo' },
        { value: '0', text: 'Inativo' }
      ],
      // title
      titleModal: 'Criação das regras',
      token: ''
    }
  },
  computed: {
    ...mapState(['qtdRules'])
  },
  mounted () {
    this.getToken()
  },
  methods: {

    getToken () {
      this.token = Cookie.get('token')
    },

    checkFormValidity () {
      const validState = this.$refs.form.checkValidity()
      this.nameState = validState
      this.statusSelect = validState
      return validState
    },
    resetModal () {
      this.nameRule = ''
      this.nameState = null
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

      if (confirm('Tem certeza que deseja criar uma regra?')) {
        this.createRule()

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      } else {
        return 'cancel'
      }
    },
    async createRule () {
      const data = {
        house_rules: {
          name: this.nameRule,
          active: this.selectedActive
        }
      }
      await this.$axios.post('https://sys-dev.searchandstay.com/api/admin/house_rules', data, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then((response) => {
          try {
            alert('Regra cadastrada com sucesso!')
            window.location.reload()
          } catch (error) {
            alert('Ocorreu um erro! :(')
          }
        })
    }
  }
}
</script>
