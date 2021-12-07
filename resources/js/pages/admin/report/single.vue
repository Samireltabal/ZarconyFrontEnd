<template>
  <div class="container-fluid">
    <div class="col col-lg-12">
      <breadcrumb :breadcrumbs='breadcrumbs' />
    </div>
    <div class="col">
      <div class="card">
        <div class="card-title">
          <h6 class="px-5">
            Report : {{ report_data.type }} || From : {{ report_data.from }} || To : {{ report_data.to }}
          </h6>
          <h6 class="px-5">
            last generation : {{ $luxon(report_data.updated_at) }}
          </h6>
          <button class="btn btn-info btn-block" @click="regenerate">Regenerate</button>
          <button class="btn btn-success btn-block" @click="fetchReport">Refresh</button>
        </div>
        <div  v-if="report_data.ready" class="card-body">
        <div class="row">
          <div class="col col-md-5">
            <RenderLine v-if="report_data.ready" head="Transactions Created" :datasets="transactions_dataset" :keys="[1,2,3,4,5,6,7,8]" :values="[[10,20,30,40,50,60,70,10], [20,10,20,30,10,0,30,20]]" color="red" />
          </div>
          <div class="col col-md-5">
            <RenderLine v-if="report_data.ready" head="Money Transferred" :datasets="money_dataset" :keys="[1,2,3,4,5,6,7,8]" :values="[[10,20,30,40,50,60,70,10], [20,10,20,30,10,0,30,20]]" color="red" />
          </div>
          <div class="row">
            <div class="col col-lg-3">
              <div class="card h-100">
                <div class="card-body">
                  <p class="card-text">
                    <h5>Total : 
                      <h3 class="text-center"><span class="badge badge-primary badge-lg"> {{ report_data.report_body.transactions.total_transactions }} </span> Transaction</h3>
                      <h3 class="text-center"><span class="badge badge-primary badge-lg"> {{ report_data.report_body.money_transferred.total_transactions }} </span> TL</h3>
                    </h5>
                  </p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card h-100">
                <div class="card-body">
                  <p class="card-text">
                    <h5>Approved : 
                      <h3 class="text-center"><span class="badge badge-success badge-lg"> {{ report_data.report_body.transactions.approved_transactions }} </span> Transaction</h3>
                      <h3 class="text-center"><span class="badge badge-success badge-lg"> {{ report_data.report_body.money_transferred.approved_transactions }} </span> TL</h3>
                    </h5>
                  </p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card h-100">
                <div class="card-body">
                  <p class="card-text">
                    <h5>Pending : 
                      <h3 class="text-center"><span class="badge badge-warning badge-lg"> {{ report_data.report_body.transactions.pending_transactions }} </span> Transaction</h3>
                      <h3 class="text-center"><span class="badge badge-warning badge-lg"> {{ report_data.report_body.money_transferred.pending_transactions }} </span> TL</h3>
                    </h5>
                  </p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card h-100">
                <div class="card-body">
                  <p class="card-text">
                    <h5>Declined : 
                      <h3 class="text-center"><span class="badge badge-danger badge-lg"> {{ report_data.report_body.transactions.declined_transactions }} </span> Transaction</h3>
                      <h3 class="text-center"><span class="badge badge-danger badge-lg"> {{ report_data.report_body.money_transferred.declined_transactions }} </span> TL</h3>
                    </h5>
                  </p>
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
  import RenderLine from '../../../components/RenderLine.vue'
  export default {
    name: "report",
    components: {
      RenderLine
    },
    data () {
      return {
        report_data: {}
      }
    },
    computed: {
      breadcrumbs () {
        return [
          { text: 'Home', link: '/', active: false },
          { text: 'Admin', link: '/admin', active: false },
          { text: 'Reports', link: '/admin/reports', active: false },
          { text: this.report_id, link: `/admin/reports/show/${this.report_id}`, active: true }
        ]
      },
      transactions_dataset () {
        if (this.report_data.ready) {
          return {
            labels: this.report_data.report_body.chart_data.keys,
            datasets: [
              {
                label: 'Accepted Transactions',
                data: this.report_data.report_body.chart_data.approved_transactions,
                backgroundColor: 'rgba(39, 174, 96,0.4)',
              },
              {
                label: 'Pending Transactions',
                data: this.report_data.report_body.chart_data.pending_transactions,
                backgroundColor: 'rgba(230, 126, 34,0.4)',
              },
              {
                label: 'Declined Transactions',
                data: this.report_data.report_body.chart_data.declined_transactions,
                backgroundColor: 'rgba(192, 57, 43,0.4)',
              },
              {
                label: 'Total Transactions',
                data: this.report_data.report_body.chart_data.transactions_count_values,
                backgroundColor: 'rgba(22, 160, 133,0.4)',
              }
            ]
          }
        } else {
          {}
        }
      },
      money_dataset () {
        if (this.report_data.ready) {
        return {
          labels: this.report_data.report_body.chart_data.keys,
          datasets: [
            {
              label: 'transactions_amount_values',
              data: this.report_data.report_body.chart_data.transactions_amount_values,
              backgroundColor: 'rgb(255, 205, 86, 0.4)'
            }
          ]
        }
        }else {
          return {}
        }
      },
      report_id () {
        return this.$route.params.id
      }
    },
    mounted() {
      this.fetchReport()
    },
    methods: {
      fetchReport() {
        const uri = `/reports/show/${this.report_id}`
        this.axios.get(uri).then((response) => {
          this.report_data = response.data
        })
      },
      regenerate() {
        const uri = `/reports/show/${this.report_id}?force=true`
        this.axios.get(uri).then((response) => {
          this.report_data = response.data
        })
      }
    }
  }
</script>
