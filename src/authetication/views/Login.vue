<template>
  <v-app class="bgMinsal" v-bind:style="{ 'background-image': `url(${Background})` }">
    <v-main>
      <v-container fluid fill-height justify-center>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-img class="mx-auto d-flex mb-5" :src="Logo" max-width="150" />
          <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="1">
            <p class="text-center text-h5 blueGrayMinsal--text">Iniciar sesión</p>
            <p class="text-center blueGrayMinsal--text">Ingrese su usuario y contraseña</p>
            <v-form
              @submit.prevent="login()"
              autocomplete="off"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card-text>
                <v-text-field
                  append-icon="mdi-account"
                  name="login"
                  outlined
                  label="Usuario *"
                  type="text"
                  v-model="form.email"
                  :rules="[() => !!form.email || 'El usuario es requerido']"
                >
                </v-text-field>
                <v-text-field
                  id="password"
                  name="password"
                  outlined
                  v-model="form.password"
                  label="Contraseña *"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[() => !!form.email || 'La contraseña es requerida']"
                >
                  <template #append>
                    <v-icon v-if="!showPassword" @click="showPassword = !showPassword">
                      mdi-eye
                    </v-icon>
                    <v-icon v-else @click="showPassword = !showPassword">mdi-eye-off </v-icon>
                  </template>
                </v-text-field>
              </v-card-text>
              <v-row>
                <v-col cols="12" md="6" class="flex justify-center text-center">
                  <v-btn color="blueMinsal white--text px-sm-8" :loading="loading" type="submit">
                    entrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-flex>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js">
import Logo from '../../assets/images/logo/logo.png';
import Background from "../../assets/images/login/login_bg.jpg";

export default {
  name: "LoginComponent",
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    Logo,
    Background,
    valid: true,
    loading: false,
    showPassword: false,
  }),
  methods: {
    async login() {
      if(!this.$refs.form.validate()) return;
    },
  },
};
</script>

<style></style>
