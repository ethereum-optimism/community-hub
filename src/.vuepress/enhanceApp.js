import event from '@vuepress/plugin-pwa/lib/event'
import redirects from './redirects'

export default ({ router }) => {
  registerAutoReload();
  
  router.addRoutes([
    { path: '/docs/', redirect: '/' }
  ])

  // Custom redirect hack.
  if (typeof window !== 'undefined') {
    router.beforeEach((to, from, next) => {
      const target = redirects[to.path] || redirects[to.path.replace(/\/$/, '')]
      if (target) {
        if (target.startsWith('http://') || target.startsWith('https://')) {
          window.location.href = target
        } else {
          next(target)
        }
      } else {
        next()
      }
    })
  }
}

// When new content is detected by the app, this will automatically
// refresh the page, so that users do not need to manually click
// the refresh button. For more details see:
// https://linear.app/optimism/issue/FE-1003/investigate-archive-issue-on-docs
const registerAutoReload = () => {
    event.$on('sw-updated', e => {
        e.skipWaiting().then(() => 
        {
          if (typeof location !== 'undefined')
            location.reload(true);
        }
      )
    })
}
