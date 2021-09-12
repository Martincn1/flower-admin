/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const recordManageRouter = {
  path: '/record',
  component: Layout,
  name: ' recordManage',
  meta: {
    title: 'recordManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'noText',
      component: () => import('views/record-manage/no-text'),
      name: 'noText',
      meta: { title: 'noText', icon: 'documentation' }
    },
    {
      path: 'likeRecord',
      component: () => import('views/record-manage/like-record'),
      name: 'likeRecord',
      meta: { title: 'likeRecord', icon: 'documentation' }
    },
    {
      path: 'attendRecord',
      component: () => import('views/record-manage/attend-record'),
      name: 'attendRecord',
      meta: { title: 'attendRecord', icon: 'documentation' }
    }
  ]
}

export default recordManageRouter
