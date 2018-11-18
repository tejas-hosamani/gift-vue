<template>
    <div class="single-cart">
        <h5>Customer ID: {{ singleCartData[0].cartId }}</h5>
        <table class="striped">
            <thead>
            <tr class="indigo white-text text-darken-2">
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
                <template v-for="items in singleCartData">

                    <tr v-for="(item, index) in items.items" :key = "index">
                        <td>{{ item.name }}</td>
                        <td>
                            {{ item.price }}
                            <!-- <input type="number" ref="priceValue" v-on:blur="runthisfun(index)" /> -->
                        </td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ getTotalWithTax(item) }}</td>
                    </tr>
                </template>
                <tr class="black-text green lighten-3">
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>{{ getCartTotal(singleCartData) }}</td>
                </tr>
               
            </tbody>
        </table>
    </div>
</template>


<script>
    export default {
        props: ['singleCartData'],
        components: {

        },
        data() {
            return {
                cartTotal: 0
            }
        },
        methods: {
            getCartTotal: function (cartArray) {
                var cartTotal = 0;
                cartArray.forEach(elem => {
                    elem.items.forEach(item => {
                        cartTotal += item.price*item.quantity + item.price*item.quantity*item.gst / 100;
                    });
                });
                return cartTotal;
            },

            getTotalWithTax: function (num) {
                return num.price*num.quantity + num.price*num.quantity*num.gst / 100;
            },

            runthisfun: function (id) {
                console.log(this.singleCartData[0].items[id].price);
                console.log(this.$refs.priceValue[id].value);

                // console.log(this.cart);
                // this.singleCartData[0].items[id].price = this.$refs.priceValue[id].value;
            }
        }
    }
</script>


<style scoped>

</style>
