import { token } from 'Vendor/rapidez/core/resources/js/stores/useUser'
import { mask } from 'Vendor/rapidez/core/resources/js/stores/useMask'

document.addEventListener('turbo:load', () => {
    async function placeOrder() {
        if (!token.value && window.app.guestEmail) {
            await window.magentoGraphQL(
                `mutation setGuestEmailOnCart($cart_id: String!, $email: String!) {
                    setGuestEmailOnCart(input: {
                        cart_id: $cart_id
                        email: $email
                    }) {
                        cart {
                            email
                        }
                    }
                }`,
                {
                    cart_id: mask.value,
                    email: window.app.guestEmail
                }
            )
        }

        await window.magentoGraphQL(
            `mutation setRivertyPaymentMethodOnCart(
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
                    cart {
                        selected_payment_method {
                            code
                        }
                    }
                }
            }`,
            {
                cart_id: mask.value,
                code: window.app.checkout.payment_method,
                terms_and_conditions: 1,
                customer_gender: window.app.custom?.gender ?? window.app.checkout.billing_address?.gender ?? window.app.checkout.shipping_address?.gender,
                customer_dob: window.app.custom?.dob ?? window.app.checkout.billing_address?.dob ?? window.app.checkout.shipping_address?.dob ?? window.app.checkout.billing_address?.date_of_birth ?? window.app.checkout.shipping_address?.date_of_birth ?? '1999-11-11',
                customer_telephone: window.app.checkout.billing_address?.telephone ?? window.app.checkout.shipping_address?.telephone
            }
        )

        return await window.magentoGraphQL(
                `mutation rivertyPlaceOrder($cart_id: String!) {
                    placeOrder(
                      input: {
                          cart_id: $cart_id
                      }
                    ) {
                        order {
                            order_number
                        }
                        errors {
                            code
                            message
                        }
                    }
                }`,
                {
                    'cart_id': mask.value
                }
        ).then(response => {
            if (response?.data?.placeOrder?.order?.order_number) {
                return true;
            }

            if (response?.data?.placeOrder?.errors) {
                response?.data?.placeOrder?.errors?.forEach((error) => Notify(error.message));
            }

            return false;
        })
    }

    window.app.$on('before-checkout-payment-saved', (data) => {
        if (!data.order.payment_method_code.includes('riverty_') && !data.order.payment_method_code.includes('afterpay_')) {
            return;
        }
        window.app.checkout.preventOrder = true
        window.app.checkout.doNotGoToTheNextStep = true

        placeOrder(data).then(success => success ? window.app.checkout.step = window.app.getCheckoutStep('success') : '');
    });
})
