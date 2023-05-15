<template>
  <main class="page">
    <BreadCrumb :key="$route.path" />

    <slot name="top" />

    <div style="background:rgb(253, 235, 236);padding:16px 16px 16px 12px">
      <p style="text-align: center;">
        The OP Mainnet upgrade to the Bedrock release will take place on <b>June 6, 2023 at 16:00 UTC!</b>
        <br />
        <a target="_" href="https://oplabs.notion.site/Bedrock-Mission-Control-EXTERNAL-fca344b1f799447cb1bcf3aae62157c5">See here for additional details.</a>
        <OutboundLink>
        </OutboundLink>
      </p>
    </div> 

    <PageInfo :key="$route.path" />

    <MyTransition v-if="pagePassword && !pageDescrypted" :delay="0.08" :disable="true">
      <Password
        :key="$route.path"
        :page="true"
        @password-verify="password = $event"
      />
    </MyTransition>

    <MyTransition v-else-if="isPathEncrypted" :delay="0.08" :disable="true">
      <Password
        :key="$route.path"
        :page="true"
        @password-verify="checkPathPassword"
      />
    </MyTransition>

    <template v-else>
      <MyTransition :delay="0.12" :disable="true">
        <Anchor :key="$route.path" />
      </MyTransition>

      <slot v-if="!pagePassword || pageDescrypted" name="content-top" />

      <MyTransition v-show="!pagePassword || pageDescrypted" :delay="0.08" :disable="true">
        <Content :key="$route.path" class="theme-default-content" />
      </MyTransition>

      <slot v-if="!pagePassword || pageDescrypted" name="content-bottom" />

      <MyTransition :delay="0.12" :disable="true">
        <PageMeta :key="$route.path" />
      </MyTransition>

      <MyTransition :delay="0.14" :disable="true">
        <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
      </MyTransition>

      <MyTransition :delay="0.16" :disable="true">
        <Comment :key="$route.path" />
      </MyTransition>
    </template>

    <slot name="bottom" />

    <!-- Google tag (gtag.js) -->
    <!-- put here because the plugin didn't work -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9KLVB8X0ME">      
    </script>

    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9KLVB8X0ME');
    </script>
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
