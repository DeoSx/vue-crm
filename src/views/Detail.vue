<template>
  <div class="row">
    <Loader v-if="loading" />
    <div v-else class="col s12 m6">
      <div class="card darken-1" :class="recordClass">
        <div class="card-content white-text">
          <span class="card-title">
            <strong>{{record.title}}</strong>
          </span>
          <p>
            <strong>Дата:</strong>
            {{record.date}}
          </p>
          <p>
            <strong>Описание:</strong>
            {{record.description}}
          </p>
          <p>
            <strong>Сумма:</strong>
            {{record.amount | currency}} KZT
          </p>
        </div>
        <div class="card-action">
          <router-link :to="'/'+record.type" class="blue btn">Вернуться назад</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Информация по записи"
  },
  data: () => ({
    record: {},
    recordClass: "",
    loading: true
  }),
  async mounted() {
    const recId = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", recId);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      ...category
    };
    this.recordClass = this.record.type === "outcome" ? "red" : "green";
    this.loading = false;
  }
};
</script>