<template>
   <v-app id="inspire">
      <v-main>
         <v-container fill-height justify-center>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>כניסה</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="loginForm" :disabled="formDisabled">
                           <v-text-field
                              prepend-icon="mdi-email"
                              name="email"
                              ref="email"
                              label="דוא״ל"
                              type="email"
                              v-model="email"
                              :rules="emailRules"
                              v-on:keyup.enter="login()"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="סיסמא"
                              type="password"
                              v-model="password"
                              :rules="passwordRules"
                              v-on:keyup.enter="login()"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="formDisabled || !valid" @click="login()">היכנס</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
      <v-snackbar v-model="alert.visible" :color="alert.type" :timeout="5000">
         <v-btn fab x-small @click="alert.visible = false">
            <v-icon :color="alert.iconColor">mdi-close</v-icon>
         </v-btn>
         &nbsp;
         <v-divider vertical :color="alert.iconColor"></v-divider>
         <v-icon :color="alert.iconColor">{{ alert.icon }}</v-icon>
         {{ alert.text }}
      </v-snackbar>
   </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
   name: 'Login',
   data() {
      return {
         email: "",
         emailRules: [
            v => !!v || 'חסר ערך בשדה דוא״ל',
            v => /.+@.+\..+/.test(v) || 'דוא״ל אינו חוקי',
         ],
         password: "",
         passwordRules: [
            v => !!v || 'חסר ערך בשדה סיסמא'
         ],
         formDisabled: false,
         valid: false,
         alert: {
            visible: false,
            text: "",
            iconColor: "",
            type: "error",
            icon: ""
         }
      }
   },
   mounted() {
      this.focusEmail();
   },
   watch: {
      email : function() {
         this.validate();
      },
      password : function() {
         this.validate();
      }
   },
   methods:  {
      login() {
         if (!this.validate()) {
            return
         }
         this.formDisabled = true
         const auth = getAuth()
         signInWithEmailAndPassword(auth, this.email, this.password)
            .then(userCreds => {
               this.$refs.loginForm.reset()
               this.$router.push("home");
            })
            .catch(err => {
               this.formDisabled = false
               console.log(`code: ${err.code}, name: ${err.name}, message: ${err.message}, error: ${err}`);
               this.showAlert("error", this.getLoginErrorMessage(err));
            })
      },
      focusEmail() {
         this.$refs.email.focus();
      },
      validate() {
         this.valid = this.$refs.loginForm ? this.$refs.loginForm.validate() : false;
         return this.valid;
      },
      showAlert(type, text) {
         this.alert.type = type;
         this.alert.text = text;
         switch (type) {
            case "error":
               this.alert.icon = "mdi-alert-octagon-outline";
               this.alert.iconColor = "white";
               break;
            case "warning":
               this.alert.icon = "mdi-alert-outline";
               this.alert.iconColor = "white";
               break;
            default:
               this.alert.icon = "";
               this.alert.iconColor = "";
               break;
         }
         this.alert.visible = true;
      },
      getLoginErrorMessage(err) {
         let errName = err.name;
         let errCode = err.code;
         if (errName && errName === "FirebaseError" && errCode) {
            switch (errCode) {
               case "auth/user-disabled":
                  return "המשתמש מושבת, נא לפנות למנהל המערכת";
               case "auth/user-not-found":
               case "auth/wrong-password":
                  return "פרטי משתמש לא נכונים";
            }
         }
         return "שגיאה במהלך ניסיון התחברות, אנא נסה שוב מאוחר יותר";
      }
   }
};
</script>

<style></style>