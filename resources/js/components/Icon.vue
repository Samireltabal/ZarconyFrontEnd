<template>
  <i :class="['mdi', `mdi-${icon}`]" />
</template>
<script>
  export default {
    name: 'Icon',
    props: {
      icon: {
        required: true,
        type: [String]
      }
    }
  }
</script>
