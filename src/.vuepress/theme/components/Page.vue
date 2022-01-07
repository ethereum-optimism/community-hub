<template>
  <main class="page">
    <BreadCrumb :key="$route.path" />

    <slot name="top" />

    <PageInfo :key="$route.path" />

    <Anchor :key="$route.path" />

    <slot v-if="!pagePassword || pageDescrypted" name="content-top" />

    <Content :key="$route.path" class="theme-default-content" />

    <slot v-if="!pagePassword || pageDescrypted" name="content-bottom" />

    <PageMeta :key="$route.path" />

    <PageNav :key="$route.path" v-bind="{ sidebarItems }" />

    <Comment :key="$route.path" />

    <slot name="bottom" />
  </main>
</template>

<script src="./Page" />

<style lang="stylus">
.page
  display block
  box-sizing border-box
  min-height 100vh
  padding-left $sidebarWidth
  padding-bottom 2rem
  background var(--bgcolor)

  @media (max-width $MQMobile)
    min-height 100vh

  // narrow desktop / iPad
  @media (max-width $MQNarrow)
    padding-left $mobileSidebarWidth

  // wide mobile
  @media (max-width $MQMobile)
    padding-left 0

  @media (min-width $MQMobile)
    .theme-container:not(.has-sidebar) &
      padding-left 0

  @media (min-width $MQWide)
    .has-anchor &:not(.blog)
      padding-right 16rem
</style>
