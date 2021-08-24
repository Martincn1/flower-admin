/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userManageRouter = {
  path: '/userManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' userManage',
  meta: {
    title: '用户管理',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/userManage/member',
      component: () => import('views/user-manage/tinymce'),
      name: 'UserManageMember',
      meta: { title: '会员管理' }
    },
    {
      path: '/userManage/teacher',
      component: () => import('views/user-manage/teacher'),
      name: 'UserManageTeacher',
      meta: { title: '教师管理' }
    }
  ]
}

export default userManageRouter
