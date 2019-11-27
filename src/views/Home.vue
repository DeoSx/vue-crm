<template>
  <div class="home">
    <Loader v-if="loading" class="loader-margin" />

    <div v-else class="info">
      <h4>Баланс на счете: {{bill | currency}}</h4>
      <h5>Всего доходов: {{income | currency}}</h5>
      <h5>Всего расходов: {{outcome | currency}}</h5>
    </div>
    <div class="doughnut" :class="{display: !records.length}">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  metaInfo: {
    title: "Главная страница"
  },
  name: "home",
  extends: Pie,
  data: () => ({
    loading: true,
    income: [],
    outcome: [],
    display: "display",
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.income = (await this.$store.dispatch("fetchRecords")).filter(
      r => r.type === "income"
    );
    this.outcome = (await this.$store.dispatch("fetchRecords")).filter(
      r => r.type === "outcome"
    );
    this.income = this.income.reduce((total, r) => {
      return (total += +r.amount);
    }, 0);
    this.outcome = this.outcome.reduce((total, r) => {
      return (total += +r.amount);
    }, 0);

    this.renderChart({
      labels: ["Доходы", "Расходы"],
      datasets: [
        {
          label: "График расходов и доходов",
          data: [this.income, this.outcome],
          backgroundColor: ["green", "red"],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
    this.loading = false;
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.display {
  display: none;
}
.loader-margin {
  margin: 50px;
}
.info {
  margin-top: 30px;
}
.doughnut {
  margin: 0 auto;
  max-width: 700px;
  max-height: 700px;
}
</style>
