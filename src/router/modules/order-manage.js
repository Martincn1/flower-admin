/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const orderManageRouter = {
  path: '/order',
  component: Layout,
  alwaysShow: true,
  name: 'order',
  meta: {
    title: 'order',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/order-manage'),
      name: 'orderList',
      meta: { title: 'orderList', icon: 'documentation' }
    }
  ]
}

export default orderManageRouter
