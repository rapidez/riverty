import { cart } from 'Vendor/rapidez/core/resources/js/stores/useCart'
import { addBeforePaymentMethodHandler, addBeforePlaceOrderHandler, addAfterPlaceOrderHandler } from 'Vendor/rapidez/core/resources/js/stores/usePaymentHandlers'

addBeforePaymentMethodHandler(async function (query, variables, options) {
    if (!variables.code.includes('riverty_') && !variables.code.includes('afterpay_')) {
        return [query, variables, options];
    }

    // Add afterpay data to setPaymentMethodOnCart
    query = config.fragments.cart +
    `
    mutation setRivertyPaymentMethodOnCart(
        $cart_id: String!
        $code: String!
        $terms_and_conditions: Int!
        $customer_dob: String
        $customer_gender: Int
        $customer_telephone: String
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cart_id
                payment_method: {
                    code: $code
                    afterpay: {
                        customer_dob: $customer_dob
                        customer_gender: $customer_gender
                        customer_telephone: $customer_telephone
                        terms_and_conditions: $terms_and_conditions
                    }
                }
            }
        ) {
            cart { ...cart }
        }
    }`

    variables.terms_and_conditions = 1
    variables.customer_gender = window.app.custom?.gender ?? cart.value?.billing_address?.gender ?? cart.value?.shipping_address?.gender
    variables.customer_dob = window.app.custom?.dob ?? cart.value?.billing_address?.dob ?? cart.value?.shipping_address?.dob ?? cart.value?.billing_address?.date_of_birth ?? cart.value?.shipping_address?.date_of_birth ?? '1999-11-11'
    variables.customer_telephone = cart.value?.billing_address?.telephone ?? cart.value?.shipping_address?.telephone

    return [query, variables, options];
});
