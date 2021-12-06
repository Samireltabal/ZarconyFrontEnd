<template>
<div class="col col-md-4 mt-5 mb-5">
            <h3 class="mt-2 mb-2">Sign In</h3>
			<form class="mt-5 mb-5">
            <!-- Email input -->
            <div v-if="ErrorMessage" class="alert alert-danger" role="alert">
                {{ ErrorMessage }}
            </div>
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
                <icon icon="account" />
            </span>
            <input v-model="name" type="text" class="form-control" :class="Errors && Errors['login'] ? 'is-invalid' : ' '" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" />
            </div>

            <!-- Password input -->
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon2">
                <icon icon="key" />
            </span>
            <input v-model="password" type="password" id="form1Example2"  class="form-control" :class="Errors && Errors['password'] ? 'is-invalid' : ' '" placeholder="Password" aria-label="Password"
                aria-describedby="basic-addon2" />
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-success btn-block" @click.prevent="authenticate()">
                <icon icon="login" class="mx-2"/> Sign in
            </button>
            <button class="btn btn-primary btn-sm btn-block" @click.prevent="$router.push('/signup')">
                <icon icon="account-plus" class="mx-2"/> New Account
            </button>
            <button class="btn btn-link text btn-lg btn-block" @click.prevent="$router.push('/password/reset')">
                <icon icon="lock-reset" class="mx-2"/> Reset Your Password
            </button>
            </form>
    </div>
</template>
   
<script>
    import { login } from '../plugins/Authentication.js'
    export default {
        data () {
            return {
                name: null,
                password: null,
                ErrorMessage: null,
                Errors: []
            }
        },
        mounted() {
        },
        methods: {
            authenticate () {
                this.Errors = []
                this.ErrorMessage = null
                login(this.name, this.password).then((res) => {
                    localStorage.setItem('token', `Bearer ${res.access_token}`)
                    localStorage.setItem('user', JSON.stringify(res.user_data))
                    this.$router.push('/')
                }).catch((err) => {
                    this.Errors = err.response.data.errors
                    this.ErrorMessage = err.response.data.message
                })
            }
        }
    }
</script>