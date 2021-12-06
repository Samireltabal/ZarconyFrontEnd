<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(item, key) in breadcrumbs" :key="key" class="breadcrumb-item" :class="item.active ? 'active' : ''" :aria-current="item.active ? 'page' : ''">
        <router-link v-if="!item.active" :to="item.link">
          {{ item.text }}
        </router-link>
        <span v-else>
          {{ item.text }}
        </span>
      </li>
    </ol>
  </nav>
</template>
<script>
  export default {
    name: 'BreadCrumb',
    props: {
      breadcrumbs: {
        required: true,
        type: [Array, Object]
      }
    }
  }
</script>