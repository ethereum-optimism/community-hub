const { description } = require('../../package')

module.exports = {
  title: 'Stay Optimistic.',
  description: description,

  head: [
    [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
    [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
    [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
  ],

  themeConfig: {
    repo: 'https://github.com/ethereum-optimism/community-hub',
    repoLabel: 'github',
    editLinks: true,
    docsDir: 'src',
    docsRepo: 'https://github.com/ethereum-optimism/community-hub',
    docsBranch: 'main',
    editLinkText: '✍️ edit this page on github',
    lastUpdated: false,
    nav: [
      {
        text: 'tl;dr',
        link: '/tldr/',
      },
      {
        text: 'testnet',
        link: '/testnet/',
      },
      {
        text: 'faq',
        link: '/faqs/',
      },
      {
        text: 'docs',
        link: '/docs/',
      },
      {
        text: 'tutorial',
        link: 'https://github.com/ethereum-optimism/optimism-tutorial/blob/main/README.md',
      },
      {
        text: 'discord',
        link: 'https://discord.com/invite/jrnFEvq',
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
          title: 'User Docs',
          children: [
            {
              title: 'How Fees Work in Optimistic Ethereum',
              path: '/docs/users/fees-in-optimistic-ethereum.md'
            },
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Protocol Docs',
          children: [
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
      ]
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
