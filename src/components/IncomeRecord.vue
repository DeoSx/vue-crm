<template>
  <div class="row">
    <Loader v-if="loading" />
    <form v-else @submit.prevent="submitHandler">
      <h5>Записать доходы</h5>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>Выберите статью доходов</label>
      </div>
      <div class="input-field">
        <input id="number" type="number" v-model="amount" />
        <label for="number">Сумма</label>
        <small
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.required"
        >Сумма не должна быть пустой</small>
        <small
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minLength"
        >Сумма не должна быть меньше {{this.$v.amount.params.minLength.min}}</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model="description" />
        <label for="name">Описание</label>
        <small
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание</small>
      </div>
      <div>
        <button class="btn waves-effect waves-light" type="submit">Записать</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    select: null,
    categories: [],
    description: "",
    amount: 1,
    category: null,
    type: "income",
    loading: true
  }),
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch("createRecord", {
        description: this.description,
        categoryId: this.category,
        date: new Date().toLocaleString(),
        amount: +this.amount,
        type: this.type
      });
      const bill = this.info.bill + +this.amount;
      await this.$store.dispatch("updateInfo", { bill });
      this.$message("Операция успешно проведена");
      this.$v.$reset();
      this.description = "";
      this.amount = 1;
    }
  },
  async mounted() {
    this.categories = (await this.$store.dispatch("fetchCategories")).filter(
      c => c.type === "income"
    );

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
    this.loading = false;
  },
  validations: {
    description: { required },
    amount: { required, minLength: minLength(1) }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.invalid {
  color: red;
}
</style>