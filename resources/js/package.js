import './eventlisteners'

document.addEventListener('turbo:load', (event) => {
    Vue.set(window.app.custom, 'dob', window.app.custom?.dob)
    Vue.set(window.app.custom, 'gender', window.app.custom?.gender)
});
