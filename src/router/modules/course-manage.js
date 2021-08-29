/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const courseManageRouter = {
  path: '/courseManage',
  component: Layout,
  redirect: 'noRedirect',
  name: ' courseManage',
  meta: {
    title: 'courseManage',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: '/courseManage/course',
      component: () => import('views/course-manage/course'),
      name: 'courseManageCourse',
      meta: { title: 'courseManageCourse' }
    },
    {
      path: '/courseManage/lessons',
      component: () => import('views/course-manage/lessons'),
      name: 'courseManageLessons',
      meta: { title: 'courseManageLessons' }
    },
    {
      path: '/courseManage/characters',
      component: () => import('views/course-manage/characters'),
      name: 'courseManageCharacters',
      meta: { title: 'courseManageCharacters' }
    },
    {
      path: '/courseManage/courseType',
      component: () => import('views/course-manage/course-type'),
      name: 'courseManageCourseType',
      meta: { title: 'courseManageCourseType' }
    },
    {
      path: '/courseManage/usableCourse',
      component: () => import('views/course-manage/usable-course'),
      name: 'courseManageUsableCourse',
      meta: { title: 'courseManageUsableCourse' }
    },
    {
      path: '/courseManage/classRecords',
      component: () => import('views/course-manage/class-records'),
      name: 'courseManageClassRecords',
      meta: { title: 'courseManageClassRecords' }
    },
    {
      path: '/courseManage/receiveRecords',
      component: () => import('views/course-manage/receive-records'),
      name: 'courseManageReceiveRecords',
      meta: { title: 'courseManageReceiveRecords' }
    }
  ]
}

export default courseManageRouter
