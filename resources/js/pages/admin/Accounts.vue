<template>
  <div class='container-fluid'>
    <div class="row">
     <div class="col col-md-12">
        <breadcrumb :breadcrumbs='breadcrumbs' />
     </div>
    </div>
    <div class="row">
      <div class="col col-md-12">
        <ztable :headers="tableHeaders" :tabledata="accounts">
          <template #balance="slotProps">
            {{ slotProps.itemProp.wallet.balance }} TL
          </template>
          <template #lastHour="slotProps">
            {{ slotProps.itemProp.wallet.LastHourTotalTransactions }} TL
          </template>
          <template #options="slotProps">
            <button class="btn icon" @click="deleteAccount(slotProps.itemProp.id)">
              <i class="mdi mdi-delete-forever" />
            </button>
          </template>
          <template v-if="response_data" #pagination>
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
                  <pagination v-model="currentPage" :records="parseInt(response_data.total)" :per-page="per_page"/>
                  
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
  export default {
    name: 'Accounts',
    components: {
      ztable,
      Pagination
    },
    data () {
      return {
        breadcrumbs: [
          { text: 'Home', link: '/', active: false },
          { text: 'Admin', link: '/admin', active: false },
          { text: 'Accounts', link: '/admin/accounts', active: true }
        ],
        tableHeaders: [
          { text: '#', value:'id' },
          { text: 'Name', value:'name' },
          { text: 'Email', value:'email' },
          { text: 'Phone', value:'phone' },
          { text: 'Role', value:'role' },
          { text: 'Wallet Balance', value:'balance' },
          { text: 'Last Hour', value:'lastHour' },
          { text: 'Options', value:'options' }
        ],
        accounts: [
          {
            uuid: '12131.1214123-1213413',
            name: 'samir',
            email: 'email@mail.com',
            phone: '01222222222',
            balance: '1000tr'
          }
        ],
        response_data: {},
        current_page: 1,
        per_page: 10
      }
    },
    computed: {
      currentPage: {
        get: function () {
          return this.response_data ? parseInt(this.response_data.current_page) : 1
        },
        set: function (val) {
          this.current_page = parseInt(val)
          this.fetchAccounts()
        }
      }
    },
    watch: {
      per_page () {
        this.currentPage = 1
        this.fetchAccounts()
      }
    },
    mounted () {
      this.fetchAccounts()
    },
    methods: {
      fetchAccounts () {
        const uri = 'admin/auth/accounts' + '?page=' + this.current_page + '&per_page=' + this.per_page
        this.axios.get(uri).then((response) => {
          this.response_data = response.data
          this.accounts = response.data.data
        })
      },
      deleteAccount (id)  {
        this.$swal.fire(
          'Deleting Account id : ' + id,
          'deleting is currently disabled',
          'info'
        )
      },
      handlePagination (val) {
        console.log(val)
      }
    }
  }
</script>