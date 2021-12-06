<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <breadcrumb :breadcrumbs='breadcrumbs' />
                <div class="card">
                    <div class="card-header">Wallet</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col col-md-6">
                                <h5>Balance : {{ wallet.balance }} TL</h5>
                                <h5>Wallet identifier : {{ wallet.user_id }} </h5>
                                <h5>Last Hour Transactions : {{ wallet.LastHourTotalTransactions }} TL</h5>
                                <h5>Wallet State : {{ wallet.suspended_at ? 'Suspended' : 'Active' }}</h5>
                            </div>
                            <div class="col col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted">Registered Email Address Of the payee</small>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-success btn-block rounded-0 mt-2 mb-2" @click="searchAccount()">Search Account</button>
                                </div>
                                <div v-if="resultFound">
                                    <h4> User Found </h4>
                                    <h5>name: {{ result.name }}</h5>
                                    <h5>phone: {{ result.phone }}</h5>
                                    <h5>email: {{ result.email }}</h5>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Amount</label>
                                        <input v-model="amount" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Amount">
                                        <small id="emailHelp" class="form-text text-muted">Amount you want to send to this account</small>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                        <input v-model="from_balance" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Use Your balance
                                        </label>
                                        </div>
                                    </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
        </div>
    </div>
                                    <button class="btn btn-success btn-block rounded-0 mt-2 mb-2" @click="doPayment()">send payment</button>
                                </div>
                                </div>
                                <div v-if="AccountNotFound" class="alert alert-danger">
                                    Account not found
                                    <p v-for="(error, key) in searchErrors" :key="key">
                                        {{ key }} : <span v-for="single in error" :key="single" class="clearfix">{{ single }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <ztable v-if="transactions.data" :headers="tableHeaders" :tabledata="transactions.data">
                            <template #state="slotProps">
                                {{ slotProps.itemProp.state.state_name }}
                            </template>
                            <template #secondParty="slotProps">
                                {{ wallet.user_id === slotProps.itemProp.reciever_identifier ? slotProps.itemProp.sender.user.name : slotProps.itemProp.reciever.user.name }}
                            </template>
                            <template #isRecharge="slotProps">
                                {{ slotProps.itemProp.is_recharge ? 'yes'  : 'no' }}
                            </template>
                            <template #amount="slotProps">
                                {{ slotProps.itemProp.amount }} TL
                            </template>
                            <template #created_at="slotProps">
                                {{ $luxon(slotProps.itemProp.created_at) }}
                            </template>
                            <template #direction="slotProps">
                                {{ wallet.user_id === slotProps.itemProp.reciever_identifier ? 'recieved' : 'sent' }}
                            </template>
                            <template #options="slotProps">
                                <router-link :to="`/transactions/show/${slotProps.itemProp.transaction_identifier}`">
                                    <h6> <i class="mdi mdi-eye" /> View </h6>
                                </router-link>
                            </template>
                            <template v-if="transactions" #pagination>
                                <div class="row justify-content-center">
                                    <div class="col col-md-3 text-center">
                                    <label for="perPage">Results per page: </label>
                                    </div>
                                    <div class="col col-md-3 text-center">
                                    <select v-model="per_page" class="form-control" id="perPage">
                                        <option selected>Open this select menu</option>
                                        <option :value="10">10</option>
                                        <option :value="50">50</option>
                                        <option :value="100">100</option>
                                    </select>
                                    </div>
                                    <div class="col col-md-6 text-center">
                                    <pagination v-model="currentPage" :records="parseInt(transactions.total)" :per-page="per_page"/>
                                    
                                </div>
                                </div>
                            </template>
                        </ztable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>
    import ztable from '../components/ztable.vue'
    import Pagination from 'vue-pagination-2';
    export default {
        components: {
            ztable,
            Pagination
        },
        data () {
            return {
                breadcrumbs: [
                    { text: 'Home', link: '/', active: false },
                    { text: 'Wallet', link: '/wallet', active: true }
                ],
                email: null,
                result: {},
                AccountNotFound: false,
                resultFound: false,
                from_balance: true,
                wallet: {},
                name: '',
                searchErrors: [],
                amount: null,
                Errors: [],
                transactions: {},
                tableHeaders: [
                    {text: 'id', value: 'id' },
                    {text: 'Date', value: 'created_at' },
                    {text: 'identifier', value: 'transaction_identifier' },
                    {text: 'Using CC', value: 'isRecharge' },
                    {text: 'Amount', value: 'amount' },
                    {text: 'state', value: 'state' },
                    {text: 'From / To', value: 'secondParty' },
                    {text: 'direction', value: 'direction' },
                    {text: 'options', value: 'options' },
                ],
                current_page: 1,
                per_page: 10
            }
        },
        computed: {
            currentPage: {
                get: function () {
                 return this.transactions ? parseInt(this.transactions.current_page) : 1
                },
                set: function (val) {
                    this.current_page = parseInt(val)
                    this.fetchReports()
                }
            }
        },
        watch: {
            per_page () {
                this.currentPage = 1
                this.fetchReports()
            }
        },
        mounted() {
            this.fetchWallet()
            this.fetchReports()
        },
        methods: {
            fetchWallet () {
                this.axios.get('/transactions/wallet').then((res) => {
                    this.wallet = res.data
                })
            },
            fetchReports () {
                const uri = '/transactions/list' + '?page=' + this.current_page + '&per_page=' + this.per_page
                this.axios.get(uri).then((res) => {
                    this.transactions = res.data
                })
            },
            searchAccount () {
                this.searchErrors = []
                this.resultFound = false
                this.AccountNotFound = false
                this.axios.post('/transactions/user/search', {email: this.email}).then((res) => {
                    this.resultFound = true
                    this.result = res.data
                }).catch((err) => {
                    if( err.response.status === 422 ) {
                        this.searchErrors = err.response.data.errors
                    }
                    this.AccountNotFound = true
                })
            },
            doPayment () {
                this.Errors = []
                const data = {
                    reciever_id: this.result.id,
                    amount: this.amount,
                    from_balance: this.from_balance,
                }
                
                this.$swal.fire({
                    title: 'Payment Confirmation',
                    text: `payment with ${this.amount} TL to ${this.result.name}`,
                    showConfirmationButton: true,
                    showCancelButton: true
                }).then((result) => {
                    if(result.isConfirmed) {
                        this.axios.post('/transactions/pay', data).then((response) => {
                            if(response.data.approved) {
                                this.$swal.fire(
                                    'successfull operation',
                                    'Money Sent Successfully',
                                    'success'
                                )
                            } else {
                                this.$swal.fire(
                                    'Transaction Created',
                                    'Waiting For Payment, you will be redirected in 3 seconds',
                                    'info'
                                )
                                setTimeout(() => {
                                    this.$router.push(`/transactions/show/${response.data.transaction_identifier}`)
                                }, 3000);
                            }
                        }).then(() => {
                            this.fetchReports()
                            this.fetchWallet()
                            this.resultFound = false
                            this.AccountNotFound = false
                            this.result = {}
                            this.amount = 0
                            this.ccnumber = null
                            this.ccmonth = null
                            this.ccv = null
                            this.ccname = null
                        }).catch((err) => {
                            console.log(err.response.status)
                            if (err.response.status === 422) {
                                this.Errors = err.response.data.errors
                                this.$swal.fire(
                                    'Validation Error',
                                    err.response.data.message, 
                                    'error'
                                )
                            } else {
                                this.$swal.fire(
                                    'Error in Transfer',
                                    err.response.data.message, 
                                    'error'
                                )    
                            }
                        })
                    } else {
                        this.$swal.fire(
                            'Operation Canceled',
                            'Operation has been canceled', 
                            'error'
                        )
                    }
                })
            }
        }
    }
</script>