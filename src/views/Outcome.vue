<template>
  <div class="row">
    <h5 class="center" :class="{display: !records.length}">Всего затрат: {{sum | currency}}</h5>

    <div class="center" :class="{display: !records.length}">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" class="loader-margin" />

    <p class="center absolute" v-else-if="!records.length">
      Записи расходов пусты.
      <router-link to="/record" tag="a">Добавить запись.</router-link>
    </p>

    <div v-else>
      <OutcomeTable />
    </div>
  </div>
</template>

<script>
import OutcomeTable from "@/components/OutcomeTable.vue";
import { Pie } from "vue-chartjs";

export default {
  name: "outcome",
  metaInfo: {
    title: "Затраты"
  },
  data: () => ({
    categories: [],
    records: [],
    loading: true,
    display: "display",
    sum: 0
  }),
  extends: Pie,
  async mounted() {
    const categories = (await this.$store.dispatch("fetchCategories")).filter(
      c => c.type === "outcome"
    );

    this.records = (await this.$store.dispatch("fetchRecords")).filter(
      r => r.type === "outcome"
    );

    this.sum = this.records.reduce((total, r) => {
      return (total += r.amount);
    }, 0);

    this.setup(categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      const records = this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title
        };
      });

      const categoriesAmount = categories.map(c => {
        return this.records.reduce((total, r) => {
          if (c.id === r.categoryId) {
            total += +r.amount;
          }
          return total;
        }, 0);
      });

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Все расходы",
            data: categoriesAmount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(245, 139, 64, 0.2)",
              "rgba(235, 149, 64, 0.2)",
              "rgba(225, 169, 64, 0.2)"
            ],
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
    }
  },
  components: {
    OutcomeTable
  }
};
</script>

<style lang="scss" scoped>
.loader-margin {
  margin-top: 50px;
}
.row {
  position: relative;
}
.display {
  display: none;
}
.absolute {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>