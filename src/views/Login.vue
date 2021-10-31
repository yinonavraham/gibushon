<template>
    <div>
        <input type="email" placeholder="Email" v-model="email" />
        <br/>
        <input type="password" placeholder="Password" v-model="password" />
        <br/>
        <button id="login" @click="login">Login</button>
    </div>
</template>

<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
            }
        },
        methods:  {
            login: function() {
                alert("Login as " + this.email)
                const auth = getAuth()
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(userCreds => {
                        alert("Logged in: " + userCreds.user.displayName + " (" + userCreds.user.email + ")");
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
        }
    }
    
</script>
