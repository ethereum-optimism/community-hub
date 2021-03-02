const { description } = require('../../package')

module.exports = {
  title: 'Optimism Community Hub',
  description: description,

  head: [
    [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
    [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
    [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'docs',
        link: '/docs/',
      },
      {
        text: 'tutorial',
        link: '/tutorial/',
      },
      {
        text: 'FAQs',
        link: '/faqs/',
      },
      {
        text: 'optimism',
        link: 'https://optimism.io'
      }
    ],
    sidebar: {
      '/docs/': [
        {
          title: 'Introduction',
          children: [
            {
              title: 'Welcome! (Start here)',
              path: '/docs/'
            },
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Developer Docs',
          children: [
            {
              title: 'Building on Optimistic Ethereum',
              path: '/docs/developers/integration.md'
            },
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Protocol Docs',
          children: [
            {
              title: 'TL;DR',
              path: '/docs/protocol/tldr.md'
            },
            {
              title: 'Protocol in Detail',
              path: '/docs/protocol/protocol.md'
            },
            {
              title: 'Compared to Ethereum',
              path: '/docs/protocol/evm-comparison.md'
            },
            {
              title: 'Transaction Fees',
              path: '/docs/protocol/fees.md'
            }
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Additional Resources',
          children: [
            {
              title: 'Guides and Tutorials',
              path: '/docs/resources/tutorials.md',
            },
            {
              title: 'Protocol Readings',
              path: '/docs/resources/protocol-readings.md',
            },
            {
              title: 'Talks and Videos',
              path: '/docs/resources/talks.md',
            },
            {
              title: 'Developer Tooling',
              path: '/docs/resources/tooling.md',
            },
            {
              title: 'General Resources',
              path: '/docs/resources/general-resources.md',
            },
          ],
          collapsable: false,
          sidebarDepth: 0,
        }
      ],
      '/compare/': [
        {
          children: [ '' ],
          collapsable: false,
          sidebarDepth: 1,
        }
      ],
      '/faqs/': [
        {
          children: [ '' ],
          collapsable: false,
          sidebarDepth: 1,
        }
      ]
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
