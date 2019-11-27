<template>
  <div>
    <div>
      <table class="responsive-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Дата</th>
            <th>Статья</th>
            <th>Сумма</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, idx) of items" :key="record.recId">
            <td>{{idx + 1}}</td>
            <td>{{record.date}}</td>
            <td>{{record.categoryName}}</td>
            <td>{{record.amount | currency}}</td>
            <td>
              <button
                @click="$router.push('/detail/' + record.recId)"
                class="btn red waves-effect waves-light"
              >Открыть</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate
        :page-count="pageCount"
        :click-handler="clickHandle"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      ></Paginate>
    </div>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/paginate.mixin";
import _ from "lodash";

export default {
  name: "OutcomeTable",
  data: () => ({
    records: []
  }),
  mixins: [paginationMixin],
  async mounted() {
    const categories = (await this.$store.dispatch("fetchCategories")).filter(
      c => c.type === "outcome"
    );
    this.records = (await this.$store.dispatch("fetchRecords")).filter(
      r => r.type === "outcome"
    );
    const records = this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title
      };
    });
    const recordsRevers = _.reverse(records);
    this.setupPage(recordsRevers);
  }
};
</script>