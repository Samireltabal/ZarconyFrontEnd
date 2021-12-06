<template>
<div class="col col-md-4 mt-5 mb-5">
            <h3 class="mt-2 mb-2">Reset Password</h3>
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
            <div v-if="SuccessMessage" class="alert alert-success" role="alert">
                {{ SuccessMessage }}
            </div>
 
            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">
                  <icon icon="email" />
              </span>
              <input v-model="email" type="text" class="form-control" :class="Errors && Errors['email'] ? 'is-invalid' : ' '" placeholder="Email" aria-label="Email"
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
                <icon icon="login" class="mx-2"/> Request Reset Email
            </button>
            </form>
    </div>
</template>
   
<script>
    export default {
        data () {
            return {
                email: null,
                password_confirmation: null,
                password: null,
                ErrorMessage: null,
                SuccessMessage: null,
                Errors: []
            }
        },
        computed: {
            token () {
                return this.$route.params.token
            },
            form () {
                return {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    token: this.token
                }
            }
        },
        mounted() {
        },
        methods: {
            authenticate () {
                this.axios.post('auth/password/reset', this.form).then((response) => {
                    this.$swal.fire(
                        'success',
                        response.data.message,
                        'success'
                    )
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 2000);
                }).catch((err) => {
                    this.$swal.fire(
                        'Error',
                        err.response.data.message,
                        'error'
                    )
                })
            }
        }
    }
</script>