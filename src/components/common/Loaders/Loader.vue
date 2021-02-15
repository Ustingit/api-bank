<template>
    <OrbitalsLoader />
</template>

<script>
import { OrbitalsLoader } from 'vue-spinners-css';

export default {
    computed: {
        color() {
         const colors = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only'];

         return colors[Math.floor(Math.random() * 3)];
        }
    },
    components: {
      OrbitalsLoader
    }
}
</script>