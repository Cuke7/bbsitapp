<template>
  <v-row justify="center" align="center">
    <v-col cols="10" sm="8" md="6">
      <div v-if="!currentUser">
        <v-row class="mb-6" justify="center">
          <v-col cols="10">
            <v-btn
              color="UI"
              style="width: 100%"
              :disabled="!register"
              @click="register = !register"
              >SE CONNECTER</v-btn
            >
          </v-col>
          <v-col cols="10">
            <v-btn
              color="UI"
              style="width: 100%"
              :disabled="register"
              @click="register = !register"
              >Créer un compte</v-btn
            >
          </v-col>
        </v-row>
        <v-form v-model="isFormValid">
          <v-fab-transition>
            <v-text-field
              label="Nom"
              v-model="name"
              v-if="register"
              :rules="[register ? rules.required : true]"
            >
              <template v-slot:prepend>
                <v-icon color="UI">
                  mdi-account
                </v-icon>
              </template>
            </v-text-field>
          </v-fab-transition>

          <v-text-field label="Email" v-model="email" :rules="[rules.email]">
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-email
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            class="textField"
            color="UI"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            :rules="[register ? rules.counter : true]"
            v-model="password"
          >
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-lock
              </v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="UI" @click="showPassword = !showPassword">
                {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
            </template></v-text-field
          >
        </v-form>

        <v-fab-transition>
          <v-row justify="end" align="center">
            <v-col cols="auto">
              <v-btn
                v-if="register"
                color="UI"
                :disabled="!isFormValid"
                @click="emailPasswordRegister()"
              >
                CONFIRMER
              </v-btn>
              <v-btn
                color="UI"
                v-else
                @click="emailPasswordLogin()"
                :disabled="!isFormValid"
              >
                CONNEXION
              </v-btn>
            </v-col>
          </v-row>
        </v-fab-transition>

        <v-row justify="center" align="center" class="mt-6">
          <v-col cols="auto">
            ou alors
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-btn color="red" @click="googleLogin()">Google</v-btn>
          </v-col>
          <!-- <v-col cols="auto">
          <v-btn color="blue" @click="facebookLgin()">Facebook</v-btn>
        </v-col> -->
        </v-row>

        <!-- <v-row justify="center" align="center" class="mt-12">
        <v-btn color="grey" @click="signOut()">DÉCONNEXION</v-btn>
      </v-row> -->
      </div>
      <div v-else>
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-btn color="red" @click="signOut()">DÉCONNEXION</v-btn>
          </v-col>
        </v-row>
      </div>
      <v-snackbar v-model="errorSnackbar" :timeout="timeout">
        {{ errorMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn color="UI" text v-bind="attrs" @click="errorSnackbar = false">
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "loginLayout",
  data: () => ({
    name: "",
    email: "",
    password: "",
    timeout: "5000",
    register: false,
    showPassword: false,
    isFormValid: false,
    rules: {
      required: value => !!value || "Requis.",
      counter: value => value.length >= 6 || "Min 6 caractères.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email invalide.";
      }
    },
    errorMessage: "",
    errorSnackbar: false
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    signOut() {
      console.log("signOut");
      // this.$fireAuth.signOut()
      this.$fire.auth.signOut();
    },
    emailPasswordLogin() {
      this.$fireModule
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("Signed in !");
          this.$router.push("/");
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

          if (errorCode == "auth/wrong-password") {
            this.errorMessage = "Erreur, mot de passe incorrect.";
            this.errorSnackbar = true;
          }

          if (errorCode == "auth/user-not-found") {
            this.errorMessage = "Erreur, adresse email inconnue.";
            this.errorSnackbar = true;
          }
          if (errorCode == "auth/invalid-email") {
            this.errorMessage = "Erreur, format de l'adresse email incorrect.";
            this.errorSnackbar = true;
          }
        });
    },
    emailPasswordRegister() {
      this.$fireModule
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("YES", user);
          user.updateProfile({ displayName: this.name });
          this.$router.push("/");
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log();
          if (errorCode == "auth/email-already-in-use") {
            this.errorMessage = "Erreur, l'adresse email est déjà utilisée.";
            this.errorSnackbar = true;
          }
        });
    },
    googleLogin() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fireModule
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("Google login sucess", result);
          this.$router.push("/");
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
        });
    }
  }
};
</script>

<style scoped>
.ele {
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
</style>
