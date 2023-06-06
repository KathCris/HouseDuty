<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">
          Faça o login
        </h2>
        <b-form>
          <b-form-group
            label="E-mail"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="joaosilva@email.com"
              autocomplete="off"
            />
          </b-form-group>

          <b-form-group
            label-for="password"
          >
            <label class="d-flex justify-content-between">
              Senha
            </label>

            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Digite sua senha"
            />
          </b-form-group>

          <b-button
            type="button"
            class="btnEntrar"
            block
            @click="verifyLogin()"
          >
            <i class="fas fa-sign-in-alt" /> Entrar
          </b-button>
        </b-form>
      </div>
    </b-col>
    <b-col sm="7" class="d-flex justify-content-center align-items-center">
      <img src="../assets/img/undraw_Login_re_4vu2.png" class="img-login">
    </b-col>
  </b-row>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'IndexPage',

  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {

    verifyLogin () {
      if (this.form.email === 'house.duty@gmail.com' && this.form.password === '123') {
        const token = '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8'
        Cookie.set('token', token)
        this.$router.push('/home')
      } else if (this.form.email !== 'house.duty@gmail.com' && this.form.password === '123') {
        alert('Email invalido, por favor insira o email cadastrado!')
      } else if (this.form.email === 'house.duty@gmail.com' && this.form.password !== '123') {
        alert('Senha invalida, por favor insira a senha correta!')
      } else {
        alert('Email e senha invalidos, por favor insira o login cadastrado!')
      }
    }

  }
}
</script>

<style>

*, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.btnEntrar{
  background-color: var(--primary-green);
  border: none;
}

.row-login {
  margin-left: 0;
}

.left-login {
  background-color: #F2F2F2;
}

.title-login {
  font-weight: bold;
}

.img-login{
  width: 80%!important;
}

</style>
