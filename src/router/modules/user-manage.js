/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userManageRouter = {
  path: '/userManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' userManage',
  meta: {
    title: 'userManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/userManage/member',
      component: () => import('views/user-manage/member'),
      name: 'userManageMember',
      meta: { title: 'userManageMember' }
    },
    {
      path: '/userManage/teacher',
      component: () => import('views/user-manage/teacher'),
      name: 'userManageTeacher',
      meta: { title: 'userManageTeacher' }
    },
    {
      path: '/userManage/grade',
      component: () => import('views/user-manage/grade'),
      name: 'userManageGrade',
      meta: { title: 'userManageGrade' }
    },
    {
      path: '/userManage/invitation',
      component: () => import('views/user-manage/invitation'),
      name: 'userManageInvitation',
      meta: { title: 'userManageInvitation' }
    },
    {
      path: '/userManage/address',
      component: () => import('views/user-manage/receive-address'),
      name: 'userManageAddress',
      meta: { title: 'userManageAddress' }
    },
    {
      path: '/userManage/integral',
      component: () => import('views/user-manage/integral'),
      name: 'userManageIntegral',
      meta: { title: 'userManageIntegral' }
    }
  ]
}

export default userManageRouter
