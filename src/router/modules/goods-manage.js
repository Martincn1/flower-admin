/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const goodsManageRouter = {
  path: '/goodsManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' goodsManage',
  meta: {
    title: 'goodsManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/goodsManage/goods',
      component: () => import('views/goods-manage/goods'),
      name: 'goodsManageGoods',
      meta: { title: 'goodsManageGoods' }
    },
    {
      path: '/goodsManage/lessons',
      component: () => import('views/goods-manage/coupon'),
      name: 'goodsManageCoupon',
      meta: { title: 'goodsManageCoupon' }
    }
  ]
}

export default goodsManageRouter
