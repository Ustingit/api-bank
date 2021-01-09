<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" >API-Bank</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/addApi" >Добавить API</b-nav-item>
        <b-nav-item to="/about" >About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Поиск"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">EN</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Профиль</b-dropdown-item>
          <b-dropdown-item href="#">Выйти из системы</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<style scoped>
    .no-decor {
    text-decoration: none;
}
</style>