<template>
  <div class="flexSup directionColumn invoNavBar">
    <div class="flexSup invoLogo">
      <span class="material-icons">
        house
      </span>
      <h2> HouseDuty </h2>
    </div>
    <div class="flexSup directionColumn invoButtonsNav">
      <div class="flexSup directionColumn">
        <button class="flexSup buttonNavBarSelected">
          <span class="material-icons">
            grid_view
          </span>
          Home
        </button>
        <button class="flexSup buttonNavBar">
          <span class="material-icons">
            person
          </span>
          Compromissos
        </button>
        <button class="flexSup buttonNavBar">
          <span class="material-icons">
            image
          </span>
          Projetos
        </button>
      </div>
      <!-- Rodapé -->
      <div class="flexSup directionColumn">
        <button class="flexSup buttonNavBar">
          <span class="material-icons">
            settings
          </span>
          Settings
        </button>
        <button class="flexSup buttonNavBar">
          <span class="material-icons">
            logout
          </span>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {

    }
  }
}
</script>
