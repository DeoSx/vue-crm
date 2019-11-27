<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code]);
    }
  }
};
</script>

<style lang="scss">
.empty-layout {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>