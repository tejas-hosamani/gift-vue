<template>
    <span class="loggedout">
        <li><router-link to="/login">Login</router-link></li>
    </span>
</template>


<script>
    export default {
        components: {

        },
        data() {
            return {
                someData: true
            }
        },
        methods: {

        }
    }
</script>


<style scoped>
    .loggedout {
        background: #06f;
    }
</style>
