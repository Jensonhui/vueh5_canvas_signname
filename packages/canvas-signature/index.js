import MobileSignature from './src/index'

MobileSignature.install = function (Vue) {
  Vue.component(MobileSignature.name, MobileSignature);
}

export default MobileSignature;