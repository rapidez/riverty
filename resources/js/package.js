import './eventlisteners'

document.addEventListener('vue:loaded', (event) => {
    window.app.config.globalProperties.custom.dob = window.app.config.globalProperties.custom?.dob
    window.app.config.globalProperties.custom.gender = window.app.config.globalProperties.custom?.gender
});
