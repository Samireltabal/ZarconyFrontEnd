<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Hello, {{ $auth.user.name }}</div>
  
                    <div class="card-body">
                        <div class="row">
                          <div class="col col-md-6">
                            <h4>Change User Data</h4>
                            <form class="mt-5 mb-5" @submit.prevent="changeData()">
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">
                                    <icon icon="account" />
                                </span>
                                <input v-model="name" type="text" class="form-control" :class="Errors && Errors['name'] ? 'is-invalid' : ' '" placeholder="Name" aria-label="name"
                                    aria-describedby="basic-addon1" />
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">
                                    <icon icon="email" />
                                </span>
                                <input v-model="email" type="text" class="form-control" :class="Errors && Errors['email'] ? 'is-invalid' : ' '" placeholder="Email" aria-label="Email"
                                    aria-describedby="basic-addon1" />
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">
                                    <icon icon="phone" />
                                </span>
                                <input v-model="phone" type="text" class="form-control" :class="Errors && Errors['phone'] ? 'is-invalid' : ' '" placeholder="Phone" aria-label="phone"
                                    aria-describedby="basic-addon1" />
                              </div>
                              <div class="input-group mb-3">
                                <button type="submit" class="btn btn-success rounded-0 btn-block">Update</button>
                              </div>
                            </form>
                            <h4>Change Password</h4>
                                <form class="mt-5 mb-5" @submit.prevent="changePassword()">

                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon2">
                                    <icon icon="key" />
                                </span>
                                <input v-model="old_password" type="password" id="form1Example2"  class="form-control" :class="Errors && Errors['password'] ? 'is-invalid' : ' '" placeholder="Old Password" aria-label="Old Password"
                                    aria-describedby="basic-addon2" />
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon2">
                                    <icon icon="key" />
                                </span>
                                <input v-model="new_password" type="password" id="form1Example2"  class="form-control" :class="Errors && Errors['new_password'] ? 'is-invalid' : ' '" placeholder="New Password" aria-label="New Password"
                                    aria-describedby="basic-addon2" />
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon2">
                                    <icon icon="key" />
                                </span>
                                <input v-model="new_password_confirmation" type="password" id="form1Example2"  class="form-control" :class="Errors && Errors['new_password_confirmation'] ? 'is-invalid' : ' '" placeholder="New Password Confirmation" aria-label="New Password Confirmation"
                                    aria-describedby="basic-addon2" />
                              </div>
                              <div class="input-group mb-3">
                                <button type="submit" class="btn btn-success rounded-0 btn-block">Change Password</button>
                              </div>
                            </form>
                          </div>
                          <div class="col col-md-6">
                            <div class="row justify-content-center align-center">
                              <div class="col col-md-8">
                                <h4>Change Avatar</h4>
                                <div class="clearfix" />
                                <img
                                  :src="$auth.user.avatar"
                                  class="img-fluid"
                                  alt=""
                                />
                              <div class="clearfix" />
                              <div class="input-group mb-3">
                                <input class="form-control form-control-sm" ref="avatar" id="formFileSm" type="file" @change="changeAvatar"/>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>
    import { login, fetchUser } from '../plugins/Authentication.js'
    export default {
        data () {
            return {
                name: null,
                email: null,
                phone: null,
                old_password: null,
                new_password: null,
                new_password_confirmation: null,
                Errors: []
            }
        },
        computed: {
            $auth () {
                return this.$store.state.$auth
            }
        },
        created () {
            this.axios
                .get('/auth')
                .then(response => {
                    this.response = response.data;
                });
        },
        mounted() {
            fetchUser()
            this.name = this.$auth.user.name
            this.email = this.$auth.user.email
            this.phone = this.$auth.user.phone
        },
        methods: {
            changePassword () {
              this.Errors = []
              const data = {
                form_type: 'password',
                password: this.old_password,
                new_password: this.new_password,
                new_password_confirmation: this.new_password_confirmation
              }

              this.axios.put('auth/user', data).then(() => {
                this.$swal.fire(
                  'Success',
                  'Password changed successfully',
                  'success'
                )
                this.old_password = null
                this.new_password = null
                this.new_password_confirmation = null
              }).catch((err) => {
                this.Errors = err.response.data.errors
                this.$swal.fire(
                  'Something went wrong',
                  err.response.data.message,
                  'error'
                )
              })
              
            },
            changeData () {
              this.Errors = []
              const data = {
                form_type: 'data',
                name: this.name,
                phone: this.phone,
                email: this.email
              }

              this.axios.put('auth/user', data).then(() => {
                this.$swal.fire(
                  'Success',
                  'Data changed successfully',
                  'success'
                )
                fetchUser()
              }).catch((err) => {
                this.Errors = err.response.data.errors
                this.$swal.fire(
                  'Something went wrong',
                  err.response.data.message,
                  'error'
                )
              })
            },
            changeAvatar () {
              const form = new FormData()
              form.append('avatar', this.$refs.avatar.files[0])
              this.axios.post('auth/avatar', form).then(() => {
                this.$swal.fire(
                  'successfull operation',
                  'successfully updated',
                  'success'
                )
              }).then(() => {
                fetchUser()
                this.$refs.avatar.files = null
              })
            }
        }
    }
</script>