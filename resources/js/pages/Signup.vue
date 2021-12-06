<template>
<div class="col col-md-4 mt-5 mb-5">
            <h3 class="mt-2 mb-2">Sign Up</h3>
			<form class="mt-5 mb-5">
            <!-- Email input -->
            <div v-if="ErrorMessage" class="alert alert-danger" role="alert">
                {{ ErrorMessage }}
                <ul v-if="Errors">
                  <li v-for="(error, key) in Errors" :key="key">
                    {{ error[0] }}
                  </li>
                </ul>
            </div>
            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">
                  <icon icon="account" />
              </span>
              <input v-model="name" type="text" class="form-control" :class="Errors && Errors['name'] ? 'is-invalid' : ' '" placeholder="Name.." aria-label="name"
                  aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">
                  <icon icon="email" />
              </span>
              <input v-model="email" type="text" class="form-control" :class="Errors && Errors['email'] ? 'is-invalid' : ' '" placeholder="Email" aria-label="Email"
                  aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">
                  <icon icon="phone" />
              </span>
              <input v-model="phone" type="text" class="form-control" :class="Errors && Errors['phone'] ? 'is-invalid' : ' '" placeholder="Phone" aria-label="Phone"
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
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon2">
                <icon icon="key" />
            </span>
            <input v-model="password_confirmation" type="password" id="form1Example2"  class="form-control" :class="Errors && Errors['password'] ? 'is-invalid' : ' '" placeholder="Password confirmation" aria-label="Password confirmation"
                aria-describedby="basic-addon2" />
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-success btn-block" @click.prevent="authenticate()">
                <icon icon="login" class="mx-2"/> Register
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
    import { signUp } from '../plugins/Authentication.js'
    export default {
        data () {
            return {
                name: null,
                email: null,
                phone: null,
                password_confirmation: null,
                password: null,
                show_password: false,
                ErrorMessage: null,
                Errors: []
            }
        },
        computed: {
          form () {
            return {
              name: this.name,
              email: this.email,
              phone: this.phone,
              password: this.password,
              password_confirmation: this.password_confirmation,
            }
          }
        },
        mounted() {
        },
        methods: {
            authenticate () {
                this.Errors = []
                this.ErrorMessage = null
                signUp(this.form).then((res) => {
                    localStorage.setItem('token', `Bearer ${res.token}`)
                    localStorage.setItem('user', JSON.stringify(res.data))
                    this.$router.push('/')
                }).catch((err) => {
                    this.Errors = err.response.data.errors
                    this.ErrorMessage = err.response.data.message
                })
            }
        }
    }
</script>