/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const adminManageRouter = {
  path: '/admin',
  component: Layout,
  name: ' admin',
  meta: {
    title: 'admin',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/admin-manage'),
      name: 'adminList',
      meta: { title: 'admin', icon: 'documentation' }
    }
  ]
}

export default adminManageRouter
