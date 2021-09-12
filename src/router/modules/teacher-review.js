/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const homeworkeRouter = {
  path: '/review',
  component: Layout,
  name: ' teacherReview',
  redirect: 'noRedirect',
  meta: {
    title: 'teacherReview',
    // TODO: icon 后续修改
    icon: 'component'
  },
  children: [
    {
      path: 'list',
      component: () => import('views/teacher-review'),
      name: 'teacherReviewList',
      meta: { title: 'teacherReviewList', icon: 'documentation' }
    }
  ]
}

export default homeworkeRouter
