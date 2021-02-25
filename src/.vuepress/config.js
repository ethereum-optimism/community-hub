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
          path: '/docs/',
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Developer Docs',
          path: '/docs/developers/',
          children: [
            {
              title: 'Deploying to Optimistic Ethereum',
              path: '/docs/developers/integration.md'
            },
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Protocol Docs',
          path: '/docs/protocol',
          children: [
            {
              title: 'Protocol',
              path: '/docs/protocol/protocol.md'
            },
            {
              title: 'EVM Comparison',
              path: '/docs/protocol/evm-comparison.md'
            }
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Additional Resources',
          path: '/docs/resources',
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
              title: 'Talks & Videos',
              path: '/docs/resources/talks.md',
            },
            {
              title: 'Tooling',
              path: '/docs/resources/tooling.md',
            },
          ],
          collapsable: false,
          sidebarDepth: 1,
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
