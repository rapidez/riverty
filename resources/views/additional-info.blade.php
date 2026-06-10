<template v-else-if="method.code.includes('riverty_') || method.code.includes('afterpay_')">
    <x-rapidez::input.radio
        name="payment_method"
        v-model="variables.code"
        v-bind:value="method.code"
        v-bind:dusk="'method-'+index"
        v-on:change="mutate"
        required
        >
        @{{ method.title }}
    </x-rapidez::input.radio>
    <div class="mt-2" v-if="variables.code === method.code">
        <span class="my-1">@lang('In order to use Riverty to pay, we need the following information.')</span>
        <x-rapidez::label :label="__('Date of Birth')" class="my-1">
            <x-rapidez::input
                name="dob"
                type="date"
                v-model="custom.dob"
            >
            </x-rapidez::input>
        </x-rapidez::label>
        <x-rapidez::label :label="__('Gender')" class="my-1">
            <div class="flex">
                <x-rapidez::input.radio
                    name="gender"
                    value="1"
                    v-model="custom.gender"
                >
                    <div>@lang('Male')</div>
                </x-rapidez::input.radio>
                <x-rapidez::input.radio
                    name="gender"
                    value="2"
                    v-model="custom.gender"
                >
                    <div>@lang('Female')</div>
                </x-rapidez::input.radio>
            </div>
        </x-rapidez::label>
    </div>
</template>
