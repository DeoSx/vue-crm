<template>
  <div>
    <form @submit.prevent="submitHandler">
      <h4>Изменить имя</h4>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите имя</small>
      </div>
      <div>
        <button class="btn waves-effect waves-light blue" type="submit">Изменить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "profile",
  metaInfo: {
    title: "Профиль"
  },
  data: () => ({
    name: ""
  }),
  mounted() {},
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        console.log();
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch("updateInfo", { name: this.name });
    }
  },
  validations: {
    name: { required }
  }
};
</script>