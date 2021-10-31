<template>
  
</template>

<script>
import { getAuth } from "firebase/auth";
export default {
    name: "Logout",
    mounted() {
        getAuth().signOut().then(() => {
            this.$router.push("Login")
        }).catch((err) => {
            console.error("Error while logging out: " + err)
            this.$router.push("Login")
        });
    }
}
</script>

<style>

</style>