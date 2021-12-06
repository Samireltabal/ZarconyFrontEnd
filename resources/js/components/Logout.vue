<template>
  <div class="col col-md-6 align-self-center">
		<div class="card">
      <div class="card-text">
        <p>Logging Out..</p>
      </div>
    </div>
  </div>
</template>
<script>
import { logout } from '../plugins/Authentication.js'
  export default {
    mounted () {
      logout().then(() => {
        this.$router.push('/')
      })
    }
  }
</script>