/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const exchangeManageRouter = {
  path: '/exchange',
  component: Layout,
  name: ' exchange',
  meta: {
    title: 'exchange',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'exchangeList',
      component: () => import('views/exchange-manage/exchange-list'),
      name: 'exchangeList',
      meta: { title: 'exchangeList', icon: 'documentation' }
    },
    {
      path: 'exchangeRecord',
      component: () => import('views/exchange-manage/record'),
      name: 'exchangeRecord',
      meta: { title: 'exchangeRecord', icon: 'documentation' }
    },
    {
      path: 'withdrawl',
      component: () => import('views/exchange-manage/with-drawl'),
      name: 'withdrawl',
      meta: { title: 'withdrawl', icon: 'documentation' }
    }
  ]
}

export default exchangeManageRouter
