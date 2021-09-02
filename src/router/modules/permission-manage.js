/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const permissionManageRouter = {
  path: '/permission',
  component: Layout,
  name: 'permissionManage',
  meta: {
    title: 'permissionManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/permission-manage'),
      name: 'permissionManageList',
      meta: { title: 'permissionManageList', icon: 'documentation' }
    }
  ]
}

export default permissionManageRouter
