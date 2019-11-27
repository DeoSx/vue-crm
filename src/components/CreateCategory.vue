<template>
  <form class="col s12 m10" @submit.prevent="submitHandler">
    <h3>Создать статью</h3>
    <h6>Выберете категорию статьи</h6>
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
    <h6>Укажите название статьи</h6>
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
      <button class="btn waves-effect waves-light" type="submit">Создать</button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "CreateCategory",
  data: () => ({
    type: "outcome",
    title: ""
  }),
  validations: {
    title: { required }
  },
  async mounted() {},
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          type: this.type
        });
        this.title = "";
        this.$v.$reset();
        this.$message("Статья успешно создана");
        this.$emit("created", category);
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-top: 30px;
}
.cat-radio {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>