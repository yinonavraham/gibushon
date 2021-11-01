<template>
  
</template>

<script>
import AuthService from "@/services/auth/authService";

const authService = new AuthService();

export default {
    name: "Logout",
    mounted() {
        authService.logout().then(() => {
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