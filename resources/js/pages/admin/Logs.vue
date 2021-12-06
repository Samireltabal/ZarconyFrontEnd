<template>
 <div class="container-fluid">
      <breadcrumb :breadcrumbs='breadcrumbs' />
    <div class="card">
    <div class="card-header">
      <h3>Transactions</h3>
      <div class="row">
        <div class="col col-md-3">
          <datepicker
            v-model="date_from"
            placeholder="from date"
            :bootstrap-styling="true"
            input-class="form-control"
          ></datepicker>
        </div>
        <div class="col col-md-3">
          <datepicker 
            v-model="date_to"
            placeholder="To date"
            :bootstrap-styling="true"
            input-class="form-control"
          ></datepicker>
        </div>
        <div class="col col-md-3">
          <input
            type="email"
            v-model="email"
            placeholder="User Email"
            class="form-control"
          ></datepicker>
        </div>
        <div class="col col-md-3">
          <button class="btn btn-primary btn-block" v-on:click="fetchReports"> Generate </button>
        </div>
      </div>
    </div>
    <div class="card-body">
                        <ztable v-if="transactions.data" :headers="tableHeaders" :tabledata="transactions.data">
                            <template #created_at="slotProps">
                                {{ $luxon(slotProps.itemProp.created_at) }}
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
</template>
<script>
  import ztable from '../../components/ztable.vue'
  import Pagination from 'vue-pagination-2';
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: 'Transactions',
    components: {
      ztable,
      Pagination,
      Datepicker
    },
    data () {
      return {
        transactions: {},
        breadcrumbs: [
          { text: 'Home', link: '/', active: false },
          { text: 'Admin', link: '/admin', active: false },
          { text: 'Logs', link: '/admin/logs', active: true }
        ],
        date_from: null,
        date_to: null,
        email: null,
        user_selected: null,
        current_page: 1,
        per_page: 10,
        tableHeaders: [
                    {text: 'id', value: 'id' },
                    {text: 'Date', value: 'created_at' },
                    {text: 'uri', value: 'url' },
                    {text: 'agent', value: 'agent' },
                    {text: 'ip address', value: 'ip_address' },
                ],
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
      },
      parsed_from () {
          var data = new Date(this.date_from)
          return this.date_from ? data.toISOString() : null
      },
      parsed_to () {
          var data = new Date(this.date_to)
          return this.date_to ? data.toISOString() : null
      }
    },
    mounted () {
      this.fetchReports()
    },
    watch: {
      per_page () {
        this.currentPage = 1
        this.fetchReports()
      }
    },
    methods: {
      fetchReports () {
        const uri = '/api/admin/logs' +  '?page=' + this.current_page + '&per_page=' + this.per_page + '&date_from=' + (this.parsed_from ? this.parsed_from : null) + '&date_to=' + (this.parsed_to ? this.parsed_to : null) + '&user=' + (this.email ? this.email : null )
                this.axios.get(uri).then((res) => {
                    this.transactions = res.data
                })
      },
      customFormatter(date) {
        var data = new Date(date)
        return data.toISOString()
      }
    }
  }
</script>