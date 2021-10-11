<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row justify="space-between" align="center">
        <v-col cols="auto" class="ma-4">
          <v-btn
            icon
            color="UI"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
          >
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ma-4">
          <!-- <v-btn color="UI" icon>
            <v-icon>
              mdi-send
            </v-icon>
          </v-btn> -->
          <confirmation
            :disabled="!isValid"
            :data="dataBbsit"
            ref="confirmation"
          ></confirmation>
        </v-col>
      </v-row>

      <v-card-text>
        <v-card-title class="pl-1">Ajouter un bbitting</v-card-title>
        <v-form v-model="isValid">
          <v-text-field
            label="Nom des parents"
            v-model="parentName"
            autocomplete="new"
            :rules="[rules.required]"
          >
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-account
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            label="Numéro de téléphone"
            v-model="phoneNumber"
            autocomplete="new"
            :rules="[rules.required]"
            type="number"
          >
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-phone
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            label="Adresse"
            v-model="adress"
            autocomplete="new"
            :rules="[rules.required]"
          >
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-map-marker
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            v-model="date"
            label="Date"
            prepend-icon="mdi-calendar"
            :rules="[rules.date]"
          >
            <template v-slot:prepend>
              <v-icon color="UI">
                mdi-calendar
              </v-icon>
            </template>
          </v-text-field>

          <v-row justify="space-between">
            <v-col cols="5">
              <v-text-field
                v-model="startHour"
                label="Début"
                :rules="[rules.required]"
              >
                <template v-slot:prepend>
                  <v-icon color="UI">
                    mdi-clock
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="endHour"
                label="Fin"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-textarea
        class="ma-3"
        outlined
        label="Informations diverses, âges des enfants..."
        hide-details
        v-model="details"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import confirmation from "../components/confirmation.vue";

export default {
  components: { confirmation },
  layout: "subpage",
  beforeRouteLeave(to, from, next) {
    if (
      (this.details == "" &&
        this.parentName == "" &&
        this.adress == "" &&
        this.phoneNumber == "" &&
        this.date == "" &&
        this.startHour == "" &&
        this.endHour == "") ||
      this.$refs.confirmation.sucessPost == true
    ) {
      return next();
    } else {
      if (
        confirm(
          "Attention, si vous quittez, vous allez perdre ce que vous avez écrit."
        )
      ) {
        return next();
      }
    }
  },
  data: () => ({
    details: "",
    parentName: "",
    adress: "",
    phoneNumber: "",
    date: "",
    startHour: "",
    endHour: "",
    menu: false,
    menu2: false,
    menu3: false,
    rules: {
      date: value => {
        const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        return (
          pattern.test(value) || "Format de la date : jj/mm/aaaa ou jj/mm/aa."
        );
      },
      required: value => !!value || "Requis."
    },
    isValid: false
  }),
  watch: {
    date(val) {
      if (!isNaN(val[0]) && !isNaN(val[1]) && val.length == 2) {
        this.date += "/";
      }

      if (!isNaN(val[3]) && !isNaN(val[4]) && val.length == 5) {
        this.date += "/";
      }
    }
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    }
  },
  computed: {
    dataBbsit() {
      return {
        parentName: this.parentName,
        adress: this.adress,
        phoneNumber: this.phoneNumber,
        date: this.date,
        startHour: this.startHour,
        endHour: this.endHour,
        details: this.details
      };
    }
  }
};
</script>
