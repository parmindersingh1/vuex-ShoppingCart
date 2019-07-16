<template>
    <div>
        <h1>Product List</h1>
        <img src="https://a.disquscdn.com/get?url=http%3A%2F%2Fimgur.com%2FJfPpwOA.gif&key=wUJUXMr1tp11IuGb__NNSA&w=480&h=100" alt="loading"
        v-if="loading">
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}}

                <button
                        :disabled="!productIsInStock(product)"
                        @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<script>

    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
         data() {
            return {
                // products: [],
                loading: false,
                productIndex: 1
            }
         },

        computed: {
             ...mapState({
                 products: state => state.products.items,
             }),

            ...mapGetters('products',{
                productIsInStock: 'productIsInStock'
            })
        },
        // computed: mapState({
        //     products: state => state.products,
        //     // allProducts: state => state.products,
        //     // firstProduct: state => state.products[0],
        //     // specificProduct(state) {
        //     //     return state.products[this.productIndex]
        //     // }
        // }),
        // computed: {
        //   products() {
        //       return this.$store.getters.products;
        //   },
        //
        //   productIsInStock() {
        //       return this.$store.getters.productIsInStock;
        //   }
        // },
        methods: {

            ...mapActions({
                fetchProducts: 'products/fetchProducts',
                addProductToCart: 'cart/addProductToCart'
            }),

             // addProductToCart(product) {
             //     this.$store.dispatch("addProductToCart", product);
             // }
        },
        created() {
            this.loading = true;
            this.fetchProducts()
                .then(() => this.loading = false);
        }
    }

</script>

<style scoped>

</style>