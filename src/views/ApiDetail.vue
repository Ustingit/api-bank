<template>
    <div>
        DETAIL 
    </div>
</template>

<script>
export default {
    name: 'Details',
    mounted() {
        debugger
        console.log('in details', this.$route.params.id)
    }
}
</script>