import MkHello from './components/MkHello'
import MkAction from './components/core/MkAction'
import MkActionForm from './components/core/MkActionForm'
import MkTable from './components/core/MkTable'
import MkTableCrud from './components/core/MkTableCrud'
const MarkOneVuetify = {
  install(Vue, options) {
    Vue.component(MkHello.name, MkHello)
    Vue.component('MkAction', MkAction)
    Vue.component('MkActionForm', MkActionForm)
    Vue.component('MkTable', MkTable)
    Vue.component('MkTableCrud', MkTableCrud)
  }
}
export default MarkOneVuetify
