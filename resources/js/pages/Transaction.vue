<template>
  <div class="container-fluid">
    <breadcrumb :breadcrumbs='breadcrumbs' />
    <div class="card">
    <div class="card-title px-2 py-2">
      <h4> Transaction : {{ transaction_id }} </h4>
    </div>
    <div class="card-body">
    <div v-if="transaction" class="row">
      <div class="col col-md-8">
        <ul>  
          <li> 
            <h5> Transaction Identifier : {{ transaction.transaction_identifier }} </h5>
          </li>
          <li> 
            <h5> Sender : {{ transaction.sender.user_id === user.uuid ? 'you' : transaction.sender.user.name }} </h5> <small>wallet id : {{ transaction.sender.user_id }}</small>
          </li>
          <li> 
            <h5> Reciever : {{ transaction.reciever.user_id === user.uuid ? 'you' : transaction.reciever.user.name }} </h5> <small>wallet id : {{ transaction.reciever.user_id }}</small>
          </li>
          <li> 
            <h5> Transaction Amount : {{ transaction.amount }} TL </h5>
          </li>
          <li> 
            <h5> Transaction Status : <span class="badge" :class="`badge-` + transaction.state.color_code">{{ transaction.state.state_name }}</span></h5>
          </li>
          <li v-if="transaction.approved_at"> 
            <h5> Approved at : <span class="badge" :class="`badge-` + transaction.state.color_code">{{ transaction.approved_at }}</span></h5>
          </li>
        </ul>
      </div>
      <div class="col col-md-4">
              <button class="btn btn-success btn-block rounded-0" @click="FetchTransaction"> 
                <i class="mdi mdi-refresh" /> Refresh
              </button>
              <div v-if="transaction.state.state_name === 'pending' && transaction.sender.user_id === user.uuid " class="card">
                <div class="card-header">
                    <strong>Credit Card</strong>
                    <small>enter your card details</small>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input v-model="ccname" class="form-control" id="name" type="text" placeholder="Enter your name" :class="Errors['ccname'] ? 'is-invalid' : ''">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="ccnumber">Credit Card Number</label>
                                <div class="input-group">
                                    <input v-model="ccnumber" class="form-control" type="text" placeholder="0000 0000 0000 0000"  :class="Errors['ccnumber'] ? 'is-invalid' : ''">
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="mdi mdi-credit-card"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label for="ccmonth">Month</label>
                            <select v-model="ccmonth" class="form-control" id="ccmonth"  :class="Errors['ccmonth'] ? 'is-invalid' : ''">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="ccyear">Year</label>
                            <select v-model="ccyear" class="form-control" id="ccyear"  :class="Errors['ccyear'] ? 'is-invalid' : ''">
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                                <option>2030</option>
                                <option>2031</option>
                                <option>2032</option>
                                <option>2033</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="cvv">CVV/CVC</label>
                                <input v-model="ccv" class="form-control" id="cvv" type="text" placeholder="123"  :class="Errors['ccv'] ? 'is-invalid' : ''">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                  <button class="btn btn-success btn-block rounded-0" @click="doPayment"> 
                    <i class="mdi mdi-refresh" /> Pay
                  </button>
                </div>
            </div>

      </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        breadcrumbs: [
            { text: 'Home', link: '/', active: false },
            { text: 'Wallet', link: '/wallet', active: false },
            { text: 'Transaction', link: `/transactions/show/${this.transaction_id}`, active: true }
        ],
        transaction: {},
        Errors: [],
        ccmonth: "9",
        ccyear: "2023",
        ccnumber: "5555555555554444",
        ccv: "111",
        ccname: "samir",
      }
    },
    computed: {
      transaction_id () {
        return this.$route.params.id
      },
      user () {
        return this.$store.state.$auth.user
      }
    },
    mounted () {
      this.FetchTransaction();
    },
    methods: {
      FetchTransaction () {
        this.axios.get(`transactions/show/${this.transaction_id}`).then((response) => {
          this.transaction = response.data
        })
      },
      doPayment() {
        const data = {
          transaction_id: this.transaction_id,
          ccname: this.ccname,
          ccnumber: this.ccnumber,
          ccv: this.ccv,
          ccyear: this.ccyear,
          ccmonth: this.ccmonth
        }
        this.axios.post('/transactions/checkout', data).then(() => {
            this.$swal.fire(
              'successfull operation',
              'Money Sent Successfully',
              'success'
            )
            this.FetchTransaction()
        }).catch((err) => {
          this.$swal.fire(
            'Error in Transfer',
            err.response.data.message, 
            'error'
          )
        })
      }
    }
  }
</script>