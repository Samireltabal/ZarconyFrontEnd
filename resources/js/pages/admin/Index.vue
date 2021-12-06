<template>
  <div class='container-fluid'>
    <div class="row">
     <div class="col col-md-12">
        <breadcrumb :breadcrumbs='breadcrumbs' />
     </div>
    </div>
    <div class="row">
      <div class="col col-md-6">
          <RenderDoughnutShift v-if="renderChart" head="Money Transferred" :keys="money_keys" :values="money_values" color="red"/>
      </div>
      <div class="col col-md-6">
          <RenderDoughnutShift v-if="renderChart" head="Transactions" :keys="count_keys" :values="count_values" color="red"/>
      </div>
      <div class="col col-md-3">
        <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Accounts</h5>
          <p class="card-text">
            <h5>Registered Accounts : 
              <h3 class="text-center"><span class="badge badge-success badge-lg"> {{ report.users_count }} </span> </h3>
            </h5>
          </p>
          <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/accounts')">Go To Accounts Panel</button>
        </div>
      </div>
      </div>
      <div class="col col-md-3">
        <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Transactions</h5>
          <p class="card-text">
            <h5>completed Transactions : 
              <h3 class="text-center"><span class="badge badge-success badge-lg"> {{ count_values[0] }} </span> </h3>
              Declined Transactions : 
              <h3 class="text-center"><span class="badge badge-danger badge-lg"> {{ count_values[1] }} </span> </h3>
            </h5>
          </p>
          <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/transactions')">Go To Transactions Panel</button>
        </div>
      </div>
      </div>
      <div class="col col-md-3">
        <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Reports</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
          </p>
          <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/reports')">Go To Reports Panel</button>
        </div>
      </div>
      </div>
      <div class="col col-md-3">
        <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Logs</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
          </p>
          <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/logs')">Go To Logs Panel</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RenderDoughnutShift from '../../components/RenderDoughnutShift.vue'
  export default {
    name: 'Admin',
    components: {
      RenderDoughnutShift
    },
    data () {
      return {
        breadcrumbs: [
          { text: 'Home', link: '/', active: false },
          { text: 'Admin', link: '/admin', active: true }
        ],
        graphs: [],
        money_keys: [],
        money_values: [],
        count_keys: [],
        count_values: [],
        renderChart: false,
        report: {}
      }
    },
    mounted () {
      this.fetch_report()
      this.fetch_graph()
    },
    computed: {
      
    },
    methods: {
      fetch_report() {
        this.axios.get('admin/auth/report').then((response) => {
          this.report = response.data
        })
      },
      fetch_graph () {
        this.axios.get('transactions/admin/report').then((response) => {
          this.graphs = response.data
          this.money_keys = response.data.money_keys
          this.money_values = response.data.money_values
          this.count_keys = response.data.count_keys
          this.count_values = response.data.count_values
          this.renderChart = true
        })
      }
    }
  }
</script>