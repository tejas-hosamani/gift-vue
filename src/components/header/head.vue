<template>
    <div class="head-el">
          <nav class="indigo darken-4">
            <div class="nav-wrapper">
            <a href="#!" class="brand-logo right hide-on-med-and-down">Logo</a>
            <ul id="nav-mobile" class="left">
                <loggedin></loggedin>
                <loggedout></loggedout>
            </ul>
            </div>
        </nav>

    </div>
</template>


<script>
import loggedin from "./loggedin-links.vue";
import loggedout from "./loggedout-links.vue";
    export default {
        components: {
            loggedin: loggedin,
            loggedout: loggedout
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
    
</style>
