// TODO 将components目录下的所有组件设置为全局组件，后续未用到的组件需要进行删除
/**
*directory {String} -读取文件的路径
*useSubdirectories {Boolean} -是否遍历文件的子目录
*regExp {RegExp} -匹配文件的正则
 */
// const context = require.context('./', true, /\.vue$/)

// /**
//  * context.keys() 返回所有匹配到的文件路径
//  */
// const install = (Vue) => {
//   context.keys().forEach(key => {
//     const component = context(key).default
//     Vue.component(component.name, component)
//   })
// }

// export default { install }

import BaseSelect from './BaseSelect'
import Pagination from './MyPagination/Pagination'
import TableRender from './TableRender/TableRender'
import HeaderBar from './HeaderBar'
import ImageView from './ImageView'
import AvatarUpload from './AvatarUpload'
import BaseDatePicker from './BaseDatePicker'

const components = [
  BaseSelect,
  Pagination,
  TableRender,
  HeaderBar,
  ImageView,
  AvatarUpload,
  BaseDatePicker
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default { install }
