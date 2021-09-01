/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const integralManageRouter = {
  path: '/integralManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' integralManage',
  meta: {
    title: 'integralManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/integralManage/goodsManage',
      component: () => import('views/integral-manage/goods-manage'),
      name: 'integralManageGoodsManage',
      meta: { title: 'integralManageGoodsManage' }
    },
    {
      path: '/integralManage/clockRecord',
      component: () => import('views/integral-manage/clock-record'),
      name: 'integralManageClockRecord',
      meta: { title: 'integralManageClockRecord' }
    },
    {
      path: '/integralManage/integralExchange',
      component: () => import('views/integral-manage/integral-exchange'),
      name: 'integralManageIntegralExchange',
      meta: { title: 'integralManageIntegralExchange' }
    }
  ]
}

export default integralManageRouter
