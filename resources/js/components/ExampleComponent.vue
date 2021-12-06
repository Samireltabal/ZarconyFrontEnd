<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home Component</div>
  
                    <div class="card-body">
                        Welcome to Transactions System Api is Responding : <span class="badge badge-success">{{ response.message }}</span>
                        <br/>
                        <div v-if="!$auth.loggedIn">
                            <router-link to="/user">Login</router-link> Or <router-link to="/signup">Sign up</router-link> Or <router-link to="/password/reset">Reset Password</router-link>
                        </div>
                        <div v-else>
                            <router-link to="/profile">View Your profile Page</router-link> 
                        </div>
                        <br />
                        <h3>Admin account : </h3>
                        <h4><span class="badge badge-info">admin@example.com</span></h4>
                        <h4><span class="badge badge-info">password</span></h4>
                        <br />
                        <h3>Accepted Cards : </h3>
                        <pre>
                            '5555555555554444',
                            '5105105105105100',
                            '4111111111111111',
                            '4222222222222'

                            any other number will return invalid card number with status code : 433
                        </pre>
                        <h3>Accepted CCV : </h3>
                        <pre>
                            All is ok but "111"
                            will return Declined card with status code : 434
                        </pre>
                        <h3>Available Balance in cards : </h3>
                        <pre>
                            Payments Over 100 TL
                            will return Insufficient funds with status code : 435
                        </pre>
                        <h3>Daily Limit for Transactions : </h3>
                        <pre>
                            200 which can be set from backend .env file
                        </pre>
                        <h3>Register new Account using real email : </h3>
                        <pre>
                            Because Notifications are working !
                        </pre>
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
                response: {},
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false
            }
        },
        computed: {
            AppName () {
                return process.env.MIX_API_URL
            },
            state () {
                return this.$store.state.count
            },
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
            console.log('Component mounted.')
            fetchUser()
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            login () {
                login()
            },
            showAlert() {
                fetchUser().then((res) => {
                    console.log('success', res)
                }).catch((err) => {
                    console.log('error :', err)
                })
            }
        }
    }
</script>