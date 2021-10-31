<template>
    <div>
        <input type="email" placeholder="Email" v-model="email" />
        <br/>
        <input type="password" placeholder="Password" v-model="password" />
        <br/>
        <input placeholder="Display Name" v-model="displayName" />
        <br/>
        <button @click="signup">SignUp</button>
    </div>
</template>

<script>
    import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
    import md5 from "md5";
    import encodeurl from "encodeurl";

    export default {
        name: "SignUp",
        data() {
            return {
                email: "",
                password: "",
                displayName: "",
            }
        },
        methods:  {
            signup: function() {
                const auth = getAuth()
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then(userCreds => {
                        var emailHash = md5(this.email);
                        var displayNameEncoded = encodeurl(this.displayName);
                        var photoUrl = `https://www.gravatar.com/avatar/${emailHash}?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${displayNameEncoded}/128`
                        updateProfile(userCreds.user, { displayName: this.displayName, photoURL: photoUrl })
                        .catch(err => { 
                            console.log("ERROR: Could not update use display name: " + err); 
                        })
                        console.log(`Signed up as: ${this.displayName}  (${userCreds.user.email}, ${photoUrl})`);
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
        }
    }
    
</script>
