/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const commonManageRouter = {
  path: '/commonManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' commonManage',
  meta: {
    title: 'commonManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'problem',
      component: () => import('views/common-manage/problem'),
      name: 'commonManageProblem',
      meta: { title: 'commonManageProblem' }
    },
    {
      path: 'coursePush',
      component: () => import('views/common-manage/course-push'),
      name: 'commonManageCoursePush',
      meta: { title: 'commonManageCoursePush' }
    },
    {
      path: 'availableCourse',
      component: () => import('views/common-manage/available-course'),
      name: 'commonManageAvailableCourse',
      meta: { title: 'commonManageAvailableCourse' }
    },
    {
      path: 'homeBanner',
      component: () => import('views/common-manage/home-banner'),
      name: 'commonManageHomeBanner',
      meta: { title: 'commonManageHomeBanner' }
    },
    {
      path: 'level',
      component: () => import('views/common-manage/level-manage'),
      name: 'commonManageLevel',
      meta: { title: 'commonManageLevel' }
    }
  ]
}

export default commonManageRouter
