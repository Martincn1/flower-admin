/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const agentManageRouter = {
  path: '/agent',
  component: Layout,
  name: ' agent',
  meta: {
    title: 'agent',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/agent-manage'),
      name: 'agentList',
      meta: { title: 'agent', icon: 'documentation' }
    }
  ]
}

export default agentManageRouter
