<template>
  <div>
    <div>
      <h1>Admin page</h1>
    </div>    
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['admin']),
  }
}
</script>

<style lang="scss">

</style>