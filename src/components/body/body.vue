<template>
    <span class="body row">
        <div class="col s3">
            <ul class="cart-list collection">
                <template v-for="items in cart">
                    <li class="collection-item" :key = "items.cartId" v-on:click="getSingleCart(items.cartId)">
                        <span class="cartNo">{{ items.cartId }}</span>
                        <p>Total amount: Rs.{{ items.total }}/-</p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="col s9">
                <single-cart v-bind:singleCartData="singleCartData"></single-cart>
        </div>
    </span>
</template>


<script>
import singleCart from "./single-cart.vue";
    export default {
        components: {
            'single-cart': singleCart
        },
        data() {
            return {
                cart: [
                    {
                        cartId: 1,
                        items: [
                            {
                                name: 'Blue bag',
                                price: 21,
                                quantity: 2,
                                gst: 18
                            },
                            {
                                name: 'Red bag',
                                price: 32,
                                quantity: 2,
                                gst: 18
                            },
                            {
                                name: 'Orange bag',
                                price: 23,
                                quantity: 2,
                                gst: 28
                            },
                            {
                                name: 'Pink bag',
                                price: 26,
                                quantity: 2,
                                gst: 18
                            },
                        ],
                        addedBy: 'Munna',
                        created_at: 'timeGoesHere',
                        total: 2

                    },
                    {
                        cartId: 2,
                        items: [
                            {
                                name: 'Blue bag',
                                price: 30,
                                quantity: 2,
                                gst: 18
                            },
                            {
                                name: 'Red bag',
                                price: 30,
                                quantity: 2,
                                gst: 18
                            },
                            {
                                name: 'Orange bag',
                                price: 20,
                                quantity: 2,
                                gst: 28
                            },
                            {
                                name: 'Pink bag',
                                price: 25,
                                quantity: 2,
                                gst: 18
                            },
                        ],
                        addedBy: 'Munna',
                        created_at: 'timeGoesHere',
                        total: ''

                    }
                ],
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
                ],
                singleCartData: {
                        cartId: 0,
                        items: [
                            {
                                name: '-',
                                price: 0,
                                quantity: 0,
                                gst: 0
                            }
                        ],
                        addedBy: 'NAN',
                        created_at: 'NAN',
                        total: 0

                    },
                someData: "has this text"
            }
        },
        methods: {
            getSingleCart: function (id){
                this.singleCartData = this.cart.filter(d => d.cartId === id);
                this.singleCartData[0].total = this.getCartTotal(this.singleCartData);
            },
            getCartTotal: function (cartArray) {
                var cartTotal = 0;
                cartArray.forEach(elem => {
                    elem.items.forEach(item => {
                        // cartTotal += item.price*item.quantity + item.price*item.quantity*item.gst / 100;
                        cartTotal += this.getTotalWithPercentage(item);
                    });
                });
                return cartTotal;
            },

            getTotalWithPercentage: function (num) {
                return num.price*num.quantity + num.price*num.quantity*num.gst / 100;
            }
        }
    }
</script>


<style scoped>
    .body {
        min-height: 100%;
    }
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

.test-space {
    color: red;
    font-size: 22px;
    padding: 10px;
}
</style>
