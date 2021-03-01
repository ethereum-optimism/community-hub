export default ({ router }) => {
  router.addRoutes([
    { path: '/docs/', redirect: '/docs/introduction/welcome' },
  ])
}
