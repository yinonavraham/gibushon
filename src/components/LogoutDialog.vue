<template>
  <v-row justify="center">
    <v-dialog
      v-model="value"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          התנתק
        </v-card-title>
        <v-card-text>האם ברצונך להתנתק?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="hide()"
          >
            לא
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="logout()"
          >
            התנתק
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: "LogoutDialog",
    props: {
        value: Boolean
    },
    methods: {
        hide() {
            this.$emit("input", false);
        },
        logout() {
            this.hide();
            this.$router.push("Logout");
        }
    }
}
</script>
