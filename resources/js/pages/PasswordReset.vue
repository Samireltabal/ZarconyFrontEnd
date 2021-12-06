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
            <!-- Submit button -->
            <button type="submit" class="btn btn-success btn-block" @click.prevent="authenticate()">
                <icon icon="login" class="mx-2"/> Request Reset Email
            </button>
            </form>
    </div>
</template>
   
<script>
    import { reset } from '../plugins/Authentication.js'
    export default {
        data () {
            return {
                email: null,
                ErrorMessage: null,
                SuccessMessage: null,
                Errors: []
            }
        },
        mounted() {
        },
        methods: {
            authenticate () {
                this.Errors = []
                this.ErrorMessage = null
                this.SuccessMessage = null
                reset(this.email).then((res) => {
                    this.SuccessMessage = res.message
                }).catch((err) => {
                    this.Errors = err.response.data.errors
                    this.ErrorMessage = err.response.data.message
                })
            }
        }
    }
</script>