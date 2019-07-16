import shop from "../../api/shop";

export default {
    namespaced: true,

    state: {
        items: [],
        checkoutStatus: null
    },

    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal(state, getters, rootState) {
            return getters.cartProducts.reduce((total, product) => total += product.price * product.quantity, 0);
        },
    },

    mutations: {
        pushProductToCart(state, productId) {
            // update products
            state.items.push({
                id: productId,
                quantity: 1
            });
        },

        incrementItemQuantity(state, cartItem) {
            // update products
            cartItem.quantity++;
        },

        setCheckoutStatus(state, status) {
            // update status
            state.checkoutStatus = status;
        },

        emptyCart(state) {
            // empty cart
            state.items = [];
        },
    },

    actions: { // like component methods
        addProductToCart({state, getters, commit, rootState, rootGetters}, product) {

            if(rootGetters['products/productIsInStock'](product)) {
                const cartItem = state.items.find(item => item.id === product.id)

                if(!cartItem) {
                    commit("pushProductToCart", product.id);
                } else {
                    commit("incrementItemQuantity", cartItem);
                }

                commit("products/decrementProductQuantity", product, {root: true});

            } else {
                // show out of stock message
            }
        },

        checkout({state, commit, rootState}) {
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }


}