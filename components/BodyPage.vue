<template>
  <div class="flexSup invoBodyPage">
    <h2>Bem vindo!</h2>
    <div class="flexSup invoCardsRulesAp">
      <div class="flexSup">
        <img src="../assets/img/17-athletics.png" alt="">
        <div class="flexSup textBigNumbers">
          <h4>14</h4>
          <p>Regras da casa</p>
        </div>
      </div>
      <div class="flexSup">
        <img src="../assets/img/17-athletics.png" alt="">
        <div class="flexSup textBigNumbers">
          <h4>14</h4>
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
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Campo obrigatorio"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
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
            <b-form-select v-model="selected" :options="options" size="sm" class="mt-3" />
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import TableRules from '../components/TableRules.vue'

export default {
  name: 'BodyPage',

  components: { TableRules },

  data () {
    return {
      name: '',
      nameState: null,
      statusSelect: null,
      submittedNames: [],
      // SELECT
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
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
      this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
