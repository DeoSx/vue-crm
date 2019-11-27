<template>
  <div class="login">
    <form class="auth-form" @submit.prevent="submitHandler">
      <h3>Вход</h3>
      <div>
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
          Нет аккаунта?
          <router-link to="/register" class="auth-span-text">Зарегистрироваться</router-link>
        </p>
        <div class="center">
          <button type="submit" class="btn">Войти</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";

export default {
  name: "login",
  metaInfo: {
    title: "Вход в систему"
  },
  data: () => ({
    email: "",
    password: ""
  }),
  mounted() {
    if (this.$route.query.message) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        console.log();
        this.$v.$touch();
        return;
      }

      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.$router.push("/");
      } catch (e) {}
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  }
};
</script>

<style lang="scss" scoped>
.invalid {
  color: red;
}
</style>
