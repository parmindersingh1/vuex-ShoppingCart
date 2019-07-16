import shop from "../../api/shop";

export default {
    namespaced: true,

    states: {
        items: []
    },

    getters: {
        products(state, getters){
            return state.items;
        },

        availableProducts(state, getters){
            return state.items.filter(item => item.inventory > 0);
        },

        productIsInStock() {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: {
        setProducts(state, items) {
            // update products
            state.items = items;
        },

        decrementProductQuantity(state, product) {
            // update products
            product.inventory--;
        },
    },

    actions: {
        fetchProducts({commit}) {
            // make the call
            // run set products mutation
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    // store.state.items = items;
                    commit('setProducts', products);
                    resolve();
                })
            })

        },
    }
}