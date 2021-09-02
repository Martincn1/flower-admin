/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const lotteryManageRouter = {
  path: '/lottery',
  component: Layout,
  name: ' lottery',
  meta: {
    title: 'lottery',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'prize-manage',
      component: () => import('views/lottery-manage/prize-manage'),
      name: 'prizeManageList',
      meta: { title: 'prizeManageList', icon: 'documentation' }
    },
    {
      path: 'record',
      component: () => import('views/lottery-manage/record'),
      name: 'recordList',
      meta: { title: 'recordList', icon: 'documentation' }
    }
  ]
}

export default lotteryManageRouter
