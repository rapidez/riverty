<template v-if="method.code.includes('riverty_') || method.code.includes('afterpay_')">
    <x-rapidez::radio
        name="payment_method"
        v-model="variables.code"
        v-bind:value="method.code"
        v-bind:dusk="'method-'+index"
        v-on:change="mutate"
        required
        >
        @{{ method.title }}
    </x-rapidez::radio>
    <div class="mt-2" v-if="variables.code === method.code">
        <span class="my-1">@lang('In order to use Riverty to pay, we need the following information.')</span>
        <x-rapidez::label :label="__('Date of Birth')" class="my-1">
            <x-rapidez::input
                name="dob"
                type="date"
                v-model="$root.custom.dob"
            >
            </x-rapidez::input>
        </x-rapidez::label>
        <x-rapidez::label :label="__('Gender')" class="my-1">
            <div class="flex">
                <x-rapidez::radio
                    name="gender"
                    value="1"
                    v-model="$root.custom.gender"
                >
                    <div>@lang('Male')</div>
                </x-rapidez::radio>
                <x-rapidez::radio
                    name="gender"
                    value="2"
                    v-model="$root.custom.gender"
                >
                    <div>@lang('Female')</div>
                </x-rapidez::radio>
            </div>
        </x-rapidez::label>
    </div>
</template>