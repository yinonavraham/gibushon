<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <span v-if="!currentUser()"><router-link to="/login">Login</router-link> |</span>
      <span v-if="!currentUser()"><router-link to="/signup">SignUp</router-link> |</span>
      <button v-if="currentUser()" @click="logout">Logout</button>
      {{ currentUser() ? currentUser().displayName ? currentUser().displayName : currentUser().email : "" }}
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { getAuth } from "firebase/auth";
export default {
  methods: {
    currentUser() {
      var auth = getAuth();
      return auth ? auth.currentUser : null
    },
    logout() {
      getAuth().signOut()
      .then(() => {
        alert("Signed out");
      })
      .catch(err => {
        alert(err);
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
