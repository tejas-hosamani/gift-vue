<template>
    <span class="body container">
        <div class="row">
            <div v-show="showCartForm" class="col-md-12">
                <div class="container">
                    <form action="" class="row">
                        <select class="custom-select col-md-6">
                            <option disabled selected>Pick new customer ID</option>
                            <template v-for="item in avail">
                                <option v-if="!item.availId" v-bind:class="{ disabled: item.availId }" :key="item.value">{{ item.value }}</option>
                            </template>
                        </select>
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row">
                                    <select class="custom-select col">
                                        <option disabled selected>Select an item</option>
                                        <option v-for="item in shop" :key="item.name">{{ item.name }}</option>
                                        
                                    </select>
                                    <select class="custom-select col">
                                        <option disabled selected>Quantity</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <ul class="cart-list collection">
                    <li v-on:click="showCartForm =! showCartForm" class="collection-item deep-purple darken-2 white-text">
                        <span class="cartNo cartNo-add"><i class="material-icons">add_circle_outline</i></span>
                        <p class="another-call-damnit">Add cart</p>
                    </li>
                    <template v-for="items in cart">
                        <li class="collection-item" :key = "items.cartId" v-on:click="getSingleCart(items.cartId)">
                            <span class="cartNo">{{ items.cartId }}</span>
                            <p>Total amount: Rs.{{ items.total }}/-</p>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="col">
                    <single-cart v-bind:singleCartData="singleCartData"></single-cart>
            </div>
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

                avail: [ 'disabled', 'disabled' ],

                shop: [
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
                showCartForm: true,
                someData: "has this text".padStart
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
            },

            seeIfavail: function (cart) {
                let tempAvail = cart.map((val) => {
                    return val.cartId;
                });

                for(var i=0;i<16;i++) {
                    this.avail[i] = { availId: false, value: i };
                }

                for(var j=0; j<tempAvail.length;j++) {
                    this.avail[tempAvail[j]] = { availId: true};
                    this.avail[tempAvail[j]].value = tempAvail[j];
                }
                // console.log(tempAvail);
                // console.log(this.avail);
            }

            
        },
        computed: {
            // seeIfavail: function (cart) {
            //     let tempAvail = cart.map((val) => {
            //         return val.cartId;
            //     });

            //     for(var i=0;i<16;i++) {
            //         this.avail[i] = { availId: false, value: i };
            //     }

            //     for(var j=0; j<tempAvail.length;j++) {
            //         this.avail[tempAvail[j]] = { availId: true};
            //         this.avail[tempAvail[j]].value = tempAvail[j];
            //     }
            //     // console.log(tempAvail);
            //     // console.log(this.avail);
            // }
        },
        beforeMount() {
            this.seeIfavail(this.cart);
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
.cartNo-add {
    padding: 12px 0px;
}
 
.another-call-damnit {
    padding: 1em 0;
    margin: 0px;
}
.collection-item {
    cursor: pointer;
}
.custom-select option{
    color: #06f;
}
 .custom-select .disabled {
    pointer-events:none;
    color: #f00;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
}

</style>
