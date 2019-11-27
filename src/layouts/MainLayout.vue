<template>
  <div>
    <Navbar />
    <main class="app-content">
      <div class="app-page container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
export default {
  components: {
    Navbar
  },
  async mounted() {
    if (Object.keys(this.$store.getters.info)) {
      await this.$store.dispatch("fetchInfo");
    }
  }
};
</script>

<style lang="scss">
</style>