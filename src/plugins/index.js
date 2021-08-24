import Vue from 'vue'

import readExcel from './excel/read-excel.js'
import downExcel from './excel/down-excel.js'
import confirmHandler from './confirm/index.js'

// 导入表格
Vue.prototype.$readExcel = readExcel
// 下载表格
Vue.prototype.$downExcel = downExcel
// 二次确认弹框
Vue.prototype.$confirmBox = confirmHandler

