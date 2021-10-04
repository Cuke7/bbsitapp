<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="374">
      <template v-slot:activator="{ on, attrs }">
        <a color="UI" icon v-bind="attrs" v-on="on">
          Mot de passe oublié ?
        </a>
      </template>
      <v-card class="dialog">
        <v-card-text class="pt-6">
          Si l'adresse mail fournie correspond à un compte, un lien pour
          redéfinir le mot de passe va être envoyé. Pensez à bien regarder dans
          vos spams 😉
        </v-card-text>
        <v-card-text class="text-center font-weight-bold">
          {{ email }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="red lighten-2" text @click="dialog = false">
            Annuler
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="green lighten-1"
            text
            @click="sendPasswordReset()"
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["email"],
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  methods: {
    sendPasswordReset() {
      this.loading = true;
      this.$fireModule
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.loading = false;
          this.$emit("emailSent");
          this.dialog = false;
        })
        .catch(error => {
          const errorCode = error.code;
          this.loading = false;
          if (errorCode == "auth/invalid-email") {
            this.$emit("incorectEmail");
            this.dialog = false;
          }
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
.dialog {
  background-image: linear-gradient(
    to left top,
    #0051c9,
    #5c40b0,
    #782f95,
    #851e79,
    #88125f
  );
}
</style>
