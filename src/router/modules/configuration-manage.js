/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const configurationRouter = {
  path: '/configuration',
  component: Layout,
  name: ' configuration',
  redirect: 'noRedirect',
  meta: {
    title: 'configuration',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/configuration-manage'),
      name: 'configurationList',
      meta: { title: 'configurationList', icon: 'documentation' }
    }
  ]
}

export default configurationRouter
