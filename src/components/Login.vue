<template>
   <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>כניסה</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-email"
                              name="email"
                              ref="email"
                              label="דוא״ל"
                              type="email"
                              v-model="email"
                              v-on:keyup.enter="login()"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="סיסמא"
                              type="password"
                              v-model="password"
                              v-on:keyup.enter="login()"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login()">היכנס</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
   name: 'Login',
   props: {
      source: String,
   },
   data() {
      return {
         email: "",
         password: "",
      }
   },
   mounted() {
      this.focusEmail();
   },
   methods:  {
      login: function() {
         const auth = getAuth()
         signInWithEmailAndPassword(auth, this.email, this.password)
            .then(userCreds => {
               this.$router.push("home");
            })
            .catch(err => {
               alert(err);
            })
      },
      focusEmail() {
         this.$refs.email.focus();
      }
   }
};
</script>

<style></style>