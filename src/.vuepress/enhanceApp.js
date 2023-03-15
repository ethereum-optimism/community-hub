import event from '@vuepress/plugin-pwa/lib/event'

export default ({ router }) => {
  autoReload();
  
  router.addRoutes([
    { path: '/docs/', redirect: '/' },
  ])
}

const autoReload = () => {
    event.$on('sw-updated', e => e.skipWaiting().then(() => {
      console.log('SW UPDATED AND RELOADING');
      location.reload(true);
    }))
}
