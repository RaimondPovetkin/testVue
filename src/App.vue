<template>
  <div>
    <router-view>
    <register-block></register-block>
    </router-view>
  </div>
</template>

<script>
import RegisterBlock from "@/components/auth/RegisterPage";

export default {
  components: {RegisterBlock},
}
</script>