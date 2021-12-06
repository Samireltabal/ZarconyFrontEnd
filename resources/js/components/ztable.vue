<template>
<div>
  <table class="table table-bordered table-sm align-middle">
    <thead>
      <tr>
        <td v-for="head in headers" :key="head.value">
          {{ head.text }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in tabledata" :key="key">
        <td v-for="header in headers">
          <slot :name="header.value" :itemProp="item">
          {{ item[header.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <slot name="pagination">
    pagination slot
  </slot>
  </div>
</template>
<script>
 export default {
   name: 'ztable',
   props: {
     headers: {
       required: true,
       type: [Array, Object]
     },
     tabledata: {
       required: true,
       type: [Array, Object]
     }
   },
   data () {
     return {
       message: 'message from table'
     }
   }
 }
</script>
