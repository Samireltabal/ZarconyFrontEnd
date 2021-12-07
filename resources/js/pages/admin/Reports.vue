<template>
  <div class="container-fluid">
    <div class="row">
    <div class="col col-md-8">
      <div class="card">
        <div class="card-title">
          <h3 class="px-2 py-2">
            Generated Reports
          </h3>
        </div>
        <div class="card-body">
          <ztable :headers="tableHeaders" :tabledata="response_data.data">
          <template #options="slotProps">
            <button class="btn icon" @click="$router.push(`/admin/reports/show/${slotProps.itemProp.identifier}`)">
              <i class="mdi mdi-eye" />
            </button>
          </template>
          <template #user="slotProps">
            {{ slotProps.itemProp.user.name }}
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
    <div class="col col-md-4">
      <div class="card">
        <div class="card-title">
          <h5 class="px-5 py-5">Generate report</h5>
          <form @submit.prevent="generateReport()">
            <datepicker 
            v-model="date_from"
            placeholder="From date"
            :bootstrap-styling="true"
            input-class="form-control mt-4 mx-2"
          ></datepicker>
          <datepicker 
            v-model="date_to"
            placeholder="To date"
            :bootstrap-styling="true"
            input-class="form-control mt-4 mx-2"
          ></datepicker>
          <button type="submit" class="btn btn-success btn-block rounded-0 mt-2"> Generate Report </button>
          </form>

        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import ztable from '../../components/ztable.vue'
  import Pagination from 'vue-pagination-2';
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: 'Reports',
    components: {
      ztable,
      Pagination,
      Datepicker
    },
    data () {
      return {
        reports: {},
        date_from: null,
        date_to: null,
        type: "transactions",
        response_data: {},
        current_page: 1,
        per_page: 10,
        tableHeaders: [
          { text: '#', value:'id' },
          { text: 'from', value:'from' },
          { text: 'to', value:'to' },
          { text: 'type', value:'type' },
          { text: 'created by', value:'user' },
          { text: 'ready', value:'ready' },
          { text: 'options', value:'options' }
        ],
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
      this.fetchReports()
    },
    methods: {
      fetchReports () {
        const uri = '/reports/list' + '?page=' + this.current_page + '&per_page=' + this.per_page
        this.axios.get(uri).then((response) => {
          this.response_data = response.data
          this.reprots = response.data.data
        })
      },
      customFormatter(date) {
        var data = new Date(date)
        return data.toISOString()
      },
      generateReport () {
        const data = {
          type: this.type,
          from: this.date_from,
          to: this.date_to
        }
        this.axios.post('reports/generate', data).then((response) => {
          this.$router.push(`/admin/reports/show/${response.data.identifier}`)
        })
      }
    }
  }
</script>
