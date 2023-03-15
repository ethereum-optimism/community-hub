import event from '@vuepress/plugin-pwa/lib/event'

export default ({ router }) => {
  console.log('new build is here');
  autoReload();
  
  router.addRoutes([
    { path: '/docs/', redirect: '/' },
  ])
}

const autoReload = () => {
    event.$on('sw-updated', e => e.skipWaiting().then(() => {
      console.log('SW UPDATED AND RELOADING 2');
      location.reload(true);
    }))
}
