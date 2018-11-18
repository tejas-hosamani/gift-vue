<template>
    <span class="body container">
        <div class="row" v-show="fm.status">
            <div class="col-md-6" >
                <ul class="collection">
                    <li style="padding: 10px 60px;" class="collection-item white-text" v-bind:class="{ red: fm.error, green: fm.success }">{{ fm.msg }}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div v-if="showCartForm" class="col-md-12">
                <div class="container">
                    <form action="" class="row">
                        <select v-model="tempCart.cartId" class="custom-select col-md-6">
                            <option disabled selected>Pick new customer ID</option>
                            <template v-for="item in avail">
                                <option v-if="!item.availId" v-bind:class="{ disabled: item.availId }" :key="item.value">{{ item.value }}</option>
                            </template>
                        </select>
                        <div class="col-md-1"></div>
                        <div class="col-md-6 modi-class">
                            <div class="container">
                                <div class="row" v-for="(cartEl, index) in tempCart.items" :key="index">
                                    <div class="">{{ index + 1 }}. </div>
                                    <select v-model="cartEl.name" class="custom-select col-md-6">
                                        <option disabled selected>Select an item</option>
                                        <option v-for="item in shop" :key="item.name">{{ item.name }}</option>
                                        
                                    </select>
                                    <select v-model="cartEl.quantity" class="custom-select col">
                                        <option disabled selected>Quantity</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        
                                    </select>
                                    <div class="col modi-class-for-cancel">
                                        <a class="btn-floating btn-small waves-effect waves-light red"
                                            @click="removeItemFromCart(index)">
                                            <i class="material-icons">close</i>
                                        </a>
                                    </div>
                                </div>

                                <a class=""
                                    @click="addNewItemToCart">
                                   <img class="tapToAddAnItem-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAAAnCAIAAAAAf10mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR6SURBVHhe7Z29atxAEMfzUKlSpXV3nV/DlRsXCSSQ1G5c+C1CzIEfImAuLmIT2/gC/sDEGEJSJc7M7OznrUDalbGk+/9YhFZarVaj+a10dqEXjwCA9QC2A7AuqO2/fv+5+HF1er788vUEBWUI5eRsSTlJmYkULS5JDNl2qnz7fnn38+Hv339mKwDPDmUj5SRlJuUnUrSMMIZUZdvJftokewEYFnf3DxfLK6RoDSaGtMK20+MeUyYYJpSZJ+eXSNEaTAxphW2n93vZCMAQMT9BtQKKMAGE7WDowPZ6YDsYB7C9HtgOxgFsrwe2g3EA2+uB7WAcwPZ6YDsYB7C9nm62H+1tbsxyZfvwWpsUsTg+0rXeuJ7v5Ed1c7g12zm40VofHO/ONncXZv32aHFr1kC/FNjOObB3rBXQ1XZPj84s9jdm+2O23XF7sL25NYftT0JX2zkB6DkE2wNge4/A9g58+jx/+/6jVlrQxXa+ERuznS1aTtr2ghjSst52E19X1F5+89879LtWQ8+q6159Geaem9sL8Q8KPwydzrnsH4S2B33uzhtsD0ZCRaU1l7kIDtc39hDzJh9EwJ036NPNAklMeLsf3hNNQ4OD0vTlq9dU2idrB9sp7HILJNSTtb0shrSstT0OK2e/qRotbaLz9syjL3y2ix7WKN9PSPzQFsdMlY+1QzKaabPwvNLnqlTx5cisIVXjoT2dbF99DeE+ZczRsz1u7MdgYqLXGI1TdvlLmywuTTslawfbLRO2vTiGtOz5Td5FOU3fUGxHsDG9Pdn2MVb+yDTCnTqeHUyfjSNX3NWJ7f55nr/qrO287g8k7LXEMXHHMulQp0iSpqa0SVbY7qiJIS37sV2eZuaNNLA9DHfWFq90aqzI0GAmH2XPxYZE2hDOnFZjULgT2620SRp3sD3syhVrux9PNOx1sL0Y2F5PP7ZzWG02a7UX23Pt7Zyi260hdbbzRr4EPbtrkzTOHpu1XToMx+OIxwPb2wLb6+nF9sQ0Tnpve5i+XuyAYGN6ezLt0xnBnqJp+4pC3GdqbGObYttlYzgeR3yNa2d79i30zbsPursZ2O6oiSEte7DdZTaHmJ6Tzvb4L2QZAcKuWDOX/dx+5W75qYRgPaiNMSTUWPqx5oTnlT5XjJV+7LTC47FtutkepZf06RvzLhlPnIL+WGIdbCeSZG2TpgRsDymOIS2rf7erIeq5k0fCHf+3KYMI7PbGXUmDBGOsFHJjVXIu8X/ggkOa/gPHQ9U2tJfb83g62m4HoBOHTkam2MHAdsIla8s0JWB7QlkMadnd9nZMO9ygBkrW9mlKFNg+eQpiSEvYDoYObK8HtoNxANvreVrbAegL2F4PbAfjALbXA9vBOIDt9cB2MA5gez2wHYwD2F4PbAfjALbX423HR7bAYOFvmJ0tkaI1mBjSCtuOD2iCwYJvvNYTfeNVP459j49jgwFB2Ug5GX2/HSnakTCGVGXbCaqQ/fS4N7+RUFCevZyeLyknTZoiRctKEkO1HQAweWA7AOvB4+N/+x2KxCMAOHYAAAAASUVORK5CYII=" alt=""></a>
                            </div>
                        </div>
                    </form>
                    <a class="btn btn-success" @click="addToCart">Add cart</a>
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
                tempCart: {
                    cartId: 'Pick new customer ID',
                        items: [
                            {
                                name: 'Select an item',
                                price: 0,
                                quantity: 1,
                                gst: 0
                            }
                        ],
                        addedBy: 'Munna',
                        created_at: 'timeGoesHere',
                        total: 2
                },
                avail: [ 'disabled', 'disabled' ],

                shop: [
                    {
                        name: 'Blue bag',
                        price: 21,
                        gst: 18
                    },
                    {
                        name: 'Red bag',
                        price: 32,
                        gst: 18
                    },
                    {
                        name: 'Orange bag',
                        price: 23,
                        gst: 28
                    },
                    {
                        name: 'Pink bag',
                        price: 26,
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
                                name: 'Select an item',
                                price: 0,
                                quantity: 1,
                                gst: 0
                            }
                        ],
                        addedBy: 'NAN',
                        created_at: 'NAN',
                        total: 0

                    },
                showCartForm: true,
                someData: "has this text".padStart,
                fm: {
                    status: false,
                    error: false,
                    success: false,
                    msg: ''
                }
                
            }
        },
        methods: {
            getSingleCart: function (id){
                this.singleCartData = this.cart.filter(d => d.cartId === id);
                this.singleCartData[0].total = this.getCartTotal(this.singleCartData);
            },
            getCartTotal: function (cartArray) {
                var cartTotal = 0;

                if(Array.isArray(cartArray)) {
                    cartArray.forEach(elem => {
                        elem.items.forEach(item => {
                            cartTotal += this.getTotalWithPercentage(item);
                        });
                    });
                } else {
                    cartArray.items.forEach(item => {
                        cartTotal += this.getTotalWithPercentage(item);
                    });
                }

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
            },

            addNewItemToCart: function (){
                this.tempCart.items.push({
                    name: 'Select an item',
                    quantity: '0'
                });
            },
            removeItemFromCart: function(index) {
                this.tempCart.items.splice(index, 1);
            },
            addToCart: function() {

                // Validate
                if(this.validationMeth()) {
                    // Add Price and Tax
                    this.addPriceAndTax();

                    // Get Total
                    this.tempCart.total = this.getCartTotal(this.tempCart);

                    // Add cart
                    this.cart.push({
                        cartId: this.tempCart.cartId,
                        items: this.tempCart.items,
                        total: this.tempCart.total
                    });
                    this.seeIfavail(this.cart);
                    this.showCartForm = false;
                }
            },
            validationMeth: function () {
                let validationStatus = true;

                // Check whether customer ID exists or not
                let cartId = this.tempCart.cartId;
                if(isNaN(cartId)) {
                    this.setPageStatus(true, 'error', 'Please pick a customer ID');
                    validationStatus = false;
                }

                // Check whether all items are full: name and quantity
                let emptyItemCheck = this.tempCart.items.findIndex(k => k.name == '' || k.name == 'Select an item' || k.quantity == '' || k.quantity == 'Quantity' || k.quantity == 0);
                if(emptyItemCheck >= 0) {
                    this.setPageStatus(true, 'error', 'Item '+ (emptyItemCheck+1) +' is missing data');
                    validationStatus = false;
                }

                return validationStatus;
            },

            setPageStatus: async function(status, type, msg) {
                this.fm.status = status;
                if(type == 'error') {
                    this.fm.error = true;
                    this.fm.msg = msg;
                } else if(type == 'success') {
                    this.fm.success = true;
                    this.fm.msg = msg;
                } else if(type == 'unset') {
                    this.fm.error = false;
                    this.fm.msg = '';
                    this.fm.success = false;
                    this.fm.status = false;
                }
                await this.sleep(5000);
                this.fm.error = false;
                this.fm.msg = '';
                this.fm.success = false;
                this.fm.status = false;

            },

            addPriceAndTax: function() {
                let tempvarHere = '';
                this.tempCart.items.forEach(element => {
                     tempvarHere = this.shop.filter(d => d.name === element.name);
                     element.price = tempvarHere[0].price;
                    element.gst = tempvarHere[0].gst;
                });
            },

            sleep: function (ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
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

.custom-select {
    width: 56%;
}
 .custom-select .disabled {
    pointer-events:none;
    color: #f00;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
}
.tapToAddAnItem-bg {
    opacity: 0.5;
    margin-left: -7px;
}
.modi-class {
    padding: 5%;
    background: #eee;
}

.modi-class-for-cancel {
    text-align: right;
}

</style>
