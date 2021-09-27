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
          <confirmation :data="dataBbsit"></confirmation>
        </v-col>
      </v-row>

      <v-card-text>
        <v-card-title class="pl-1">Détails du babysitting</v-card-title>

        <v-text-field
          label="Nom des parents"
          v-model="parentName"
          autocomplete="new"
        >
          <template v-slot:prepend>
            <v-icon v-if="alternative" color="UI">
              mdi-account
            </v-icon>
          </template>
        </v-text-field>

        <v-text-field
          label="Numéro de téléphone"
          v-model="phoneNumber"
          autocomplete="new"
        >
          <template v-slot:prepend>
            <v-icon v-if="alternative" color="UI">
              mdi-phone
            </v-icon>
          </template>
        </v-text-field>

        <v-text-field label="Adresse" v-model="adress" autocomplete="new">
          <template v-slot:prepend>
            <v-icon v-if="alternative" color="UI">
              mdi-map-marker
            </v-icon>
          </template>
        </v-text-field>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            >
              <template v-slot:prepend>
                <v-icon v-if="alternative" color="UI">
                  mdi-calendar
                </v-icon>
              </template>
            </v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              Annuler
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              Valider
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-row justify="space-between">
          <v-col cols="5">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="startHour"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startHour"
                  label="Début"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
                  <template v-slot:prepend>
                    <v-icon v-if="alternative" color="UI">
                      mdi-clock
                    </v-icon>
                  </template>
                </v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="startHour"
                full-width
                @click:minute="$refs.menu2.save(startHour)"
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="5">
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endHour"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endHour"
                  label="Fin"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                v-model="endHour"
                full-width
                @click:minute="$refs.menu3.save(endHour)"
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
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
import { groq } from "@nuxtjs/sanity";

import createClient from "@sanity/client";
import confirmation from "../components/confirmation.vue";

const client = createClient({
  projectId: "djx9uviv",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "sk8de6z5DrYHFWnu6NIJAHELXUQuwYiJlxwpy7VMV0Qlzuw3vCnvMGyvzI7hq4GnzJm7FSIE7q5SQtPFQccUeUcOR26ZXG929MUSR3zNA4aUliYO0DXz3c38Brd5cDvH91wcp4x2XU5OK1NjeAhaxoUSSNSYjyMgvZVY6jDqMLwUQskaWH9U", // or leave blank for unauthenticated usage
  useCdn: true // `false` if you want to ensure fresh data
});

export default {
  components: { confirmation },
  layout: "subpage",
  data: () => ({
    details: "",
    parentName: "Karen",
    adress: "",
    phoneNumber: "",
    date: "",
    startHour: "",
    endHour: "",
    menu: false,
    menu2: false,
    menu3: false,
    alternative: true
  }),
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
