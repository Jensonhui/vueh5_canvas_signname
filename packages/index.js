import MobileSignature from './canvas-signature/index'

const components = [
  MobileSignature
]

const install = function (Vue) {
  if (install.installed) return

  components.map(item => {
    Vue.component(item.name, item)
  })
}

export {
  install, // 导出必须携带，否则无法Use
  MobileSignature
}