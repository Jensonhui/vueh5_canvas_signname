import signatureH5 from './signature-h5/index.vue'

const components = [
  signatureH5
]

const install = function (Vue) {
  if (install.installed) return

  components.forEach(item => {
    Vue.component(item.name, item);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install