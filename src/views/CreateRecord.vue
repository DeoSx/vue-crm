<template>
  <div class="row">
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Необходимо создать статьи (доходов/затрат) для записи операций.
      <router-link tag="a" to="/create">Создать статью.</router-link>
    </p>
    <div v-else>
      <div class="switch">
        <label>
          <span :class="{red: !checked}">Затраты</span>
          <input type="checkbox" v-model="checked" />
          <span class="lever"></span>
          <span :class="{green: checked}">Доходы</span>
        </label>
      </div>
      <OutcomeRecord v-if="!checked" />
      <IncomeRecord v-else />
    </div>
  </div>
</template>

<script>
import OutcomeRecord from "@/components/OutcomeRecord";
import IncomeRecord from "@/components/IncomeRecord";

export default {
  metaInfo: {
    title: "Создать запись"
  },
  data: () => ({
    checked: false,
    categories: [],
    loading: true
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: {
    OutcomeRecord,
    IncomeRecord
  }
};
</script>

<style lang="scss" scoped>
.row {
  margin-top: 50px;
}
span {
  padding: 3px;
}
.red {
  transition: 0.4s;
  border-radius: 15px;
  color: #000;
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
}
.green {
  transition: 0.4s;
  border-radius: 15px;
  color: #000;
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.61);
}
</style>