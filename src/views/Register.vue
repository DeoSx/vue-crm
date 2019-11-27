<template>
  <div class="login">
    <form class="auth-form" @submit.prevent="submitHandler">
      <h3>Регистрация</h3>
      <div>
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
        <div class="input-field">
          <input
            id="email"
            type="email"
            v-model="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
          >Введите Email</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корретный Email</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
          <label for="password">Password</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >Введите пароль</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен содержать не меньше {{this.$v.password.$params.minLength.min}}, вы ввели {{password.length}}</small>
        </div>
        <p class="auth-text">
          Есть аккаунт?
          <router-link to="/login" class="auth-span-text">Войти</router-link>
        </p>
        <div class="center">
          <button type="submit" class="btn">Зарегистрироваться</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",
  metaInfo: {
    title: "Регистрация"
  },
  data: () => ({
    email: "",
    password: "",
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
      try {
        await this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$router.push("/");
      } catch (e) {}
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required }
  }
};
</script>

<style lang="scss" scoped>
.invalid {
  color: red;
}
</style>
