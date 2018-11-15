<template>
    <div class="col s3">
        <ul class="cart-list collection">
            <li class="collection-item" v-for="item in items" :key = "item.cartId">
                <span class="cartNo">{{ item.cartId }}</span>
                <p># of items: {{ item.nItems }} <br>
                    Total amount: Rs.{{ item.totalAmount }}/-
                </p>
            </li>
        </ul>
    </div>
    
</template>


<script>
    export default {
        components: {

        },
        data() {
            return {
                items: [
                    {
                        cartId: 2,
                        nItems: 3,
                        totalAmount: 220
                    },
                    {
                        cartId: 5,
                        nItems: 4,
                        totalAmount: 450
                    },
                    {
                        cartId: 1,
                        nItems: 2,
                        totalAmount: 122
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>


<style scoped>
.cartNo {
    font-size: 2.28rem;
    display: inline-block;
    position: absolute;
    width: 28px;
    padding: 7px;
    height: 34px;
    overflow: hidden;
    left: 15px;
    display: inline-block;
    vertical-align: middlel;
}
.collection .collection-item {
    padding: 0px;
    padding-left: 60px;
}
    
</style>
