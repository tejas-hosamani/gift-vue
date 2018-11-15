<template>
    <span class="loggedin">
        <li><router-link to="/" exact><i class="material-icons">home</i></router-link></li>
        <li><router-link to="/add" exact><i class="material-icons">add_circle</i></router-link></li>
        <li><router-link to="#" exact><i class="material-icons">settings_power</i></router-link></li>
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
    .loggedin {
        background: #06f;
    }
</style>
