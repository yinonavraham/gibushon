<template>
  <v-app id="main-app">
    <template v-if="loggedIn()">
    <v-navigation-drawer
      v-model="drawer"
      :right="$vuetify.rtl"
      app
    >
      <v-sheet
        color="primary"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <img :src="currentUser().photoURL" />
        </v-avatar>

        <div class="white--text">{{ currentUserDisplayName() }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="menuItem in menuItems()"
          :key="menuItem.key"
          :to="menuItem.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          key="logout"
          @click="logoutDialog = true"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>התנתק</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="secondary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Gibushon - גיבושון</v-toolbar-title>
    </v-app-bar>
    </template>
    <logout-dialog v-model="logoutDialog"/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { getAuth } from "firebase/auth";
  import LogoutDialog from "./components/LogoutDialog.vue"

  export default {
    name: 'App',

    components: {
      LogoutDialog
    },

    data: () => ({
      drawer: null,
      logoutDialog: false
    }),

    methods: {
      currentUser() {
        return getAuth().currentUser;
      },
      currentUserDisplayName() {
        let user = this.currentUser();
        return user ? user.displayName : "Anonymous";
      },
      loggedIn() {
        return this.currentUser()
      },
      menuItems() {
        return [
          {
            key: "events",
            text: "מיונים",
            icon: "mdi-calendar-multiple",
            to: "/events"
          },
          // {
          //   key: "logout",
          //   text: "התנתק",
          //   icon: "mdi-logout",
          //   to: "/logout"
          // }
        ]
      }
    }
};
</script>
