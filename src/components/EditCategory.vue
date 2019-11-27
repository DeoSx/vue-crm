<template>
  <form class="col m10 s12" @submit.prevent="submitHandler">
    <h3>Редактировать статью</h3>
    <div class="input-field">
      <select ref="select" v-model="current">
        <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
      </select>
      <label>Название статьи</label>
    </div>
    <div class="cat-radio">
      <p>
        <label>
          <input v-model="type" name="income" type="radio" value="income" />
          <span class="span">Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input v-model="type" name="outcome" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>
    </div>
    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="title"
        :class="{invalid: $v.title.$dirty && !$v.title.required}"
      />
      <label for="name">Название</label>
      <small
        class="helper-text invalid"
        v-if="$v.title.$dirty && !$v.title.required"
      >Введите название</small>
    </div>
    <div>
      <button class="btn waves-effect waves-light" type="submit">Изменить</button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    type: "outcome",
    current: null,
    title: ""
  }),
  validations: {
    title: { required }
  },
  watch: {
    current(catId) {
      const { title } = this.categories.find(c => c.id === catId);
      this.title = title;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          title: this.title,
          type: this.type,
          id: this.current
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Статья успешно изменена");
        this.$v.$reset();
        this.$emit("updated", categoryData);
      } catch (e) {}
    }
  },
  async mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 30px;
}

form {
  margin-top: 50px;
}
</style>