import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - AppMel",
    title: "AppMel",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/vue-masonry", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // "@nuxtjs/sanity/module"
    "@nuxtjs/dotenv"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/firebase", "@nuxtjs/pwa"],

  pwa: {
    manifest: {
      name: "BBsitApp",
      lang: "fr",
      theme_color: "#841e79",
      background_color: "#841e79",
      short_name: "BBsitApp",
      display: "standalone",
      start_url: "/"
    },
    icon: {
      source: "/icon.png",
      fileName: "icon.png"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.lime.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.lime.darken2,
          success: colors.green.accent3,
          UI: colors.lime.darken2
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // auth: {
  //   strategies: {
  //     google: {
  //       clientId:
  //         "366728592323-8o1tbqashorqa33sjjmmulv4mk5on8sj.apps.googleusercontent.com",
  //       codeChallengeMethod: "",
  //       responseType: "id_token token"
  //     }
  //   }
  // },

  // router: {
  //   middleware: ["auth"]
  // },

  firebase: {
    config: {
      apiKey: "AIzaSyC10MnYf5_4Nm4wtsvRfaKe1UJyKJ9Eq5w",
      authDomain: "bbsitapp-1b591.firebaseapp.com",
      projectId: "bbsitapp-1b591",
      storageBucket: "bbsitapp-1b591.appspot.com",
      messagingSenderId: "1093775072520",
      appId: "1:1093775072520:web:5e9a280e8772b44877a0bd"
    },
    services: {
      auth: true // Just as example. Can be any other service.
    },
    services: {
      auth: {
        // it is recommended to configure either a mutation or action but you can set both
        initialize: {
          onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION"
          // onAuthStateChangedAction: 'onAuthStateChangedAction'
        },
        persistence: "local" // default
      }
    }
  }
};

// 366728592323-8o1tbqashorqa33sjjmmulv4mk5on8sj.apps.googleusercontent.com
