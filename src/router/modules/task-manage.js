/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const homeworkeRouter = {
  path: '/task',
  component: Layout,
  name: ' task',
  redirect: 'noRedirect',
  meta: {
    title: 'task',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/task-manage/task'),
      name: 'taskList',
      meta: { title: 'taskList', icon: 'documentation', affix: true }
    },
    {
      path: 'honor',
      component: () => import('views/task-manage/honor'),
      name: 'honorList',
      meta: { title: 'honorList', icon: 'documentation', affix: true }
    }
  ]
}

export default homeworkeRouter
