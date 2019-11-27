<template>
  <div>
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <a class="brand-logo pointer left" @click.prevent="navOpen">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right">
          <li>
            <a class="dropdown-trigger" href="#" data-target="dropdown1" ref="dropdown">
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="dropdown1" class="dropdown-content">
              <li>
                <a href="#!" @click.prevent="$router.push('/profile')">Профиль</a>
              </li>
              <li>
                <a href="#" @click.prevent="logout">Выйти</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <ul id="slide-out" class="sidenav indigo lighten-5" ref="sidenav" @click="navClose">
      <router-link
        tag="li"
        :to="link.url"
        v-for="link of links"
        :key="link.url"
        active-class="active"
        :exact="link.exact"
      >
        <a class="waves-effect waves-teal">{{link.title}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    sidenav: null,
    dropdown: null,
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "Создать статью", url: "/create" },
      { title: "Затраты", url: "/outcome" },
      { title: "Доходы", url: "/income" },
      { title: "Записать операцию", url: "/record" }
    ]
  }),
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown);
    this.sidenav = M.Sidenav.init(this.$refs.sidenav, {});
  },
  methods: {
    navOpen() {
      M.Sidenav.getInstance(this.$refs.sidenav).open();
    },
    navClose() {
      M.Sidenav.getInstance(this.$refs.sidenav).close();
    },
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login?message=auth/logout");
    }
  },
  destroyed() {
    if (this.sidenav && this.sidenav.destroy) {
      this.sidenav.destroy();
    }
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
  a {
    font-size: 20px;
  }
}
.pointer {
  cursor: pointer;
}
.sidenav {
  padding-top: 20px;
}
</style>