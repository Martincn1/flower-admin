/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const applyManageRouter = {
  path: '/applyManage',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: ' applyManage',
  meta: {
    title: 'applyManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/applyManage/apply',
      component: () => import('views/apply-manage/apply-record'),
      name: 'applyManageApplyRecord',
      meta: { title: 'applyManageApplyRecord' }
    }
  ]
}

export default applyManageRouter
