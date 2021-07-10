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
    repo: 'https://github.com/ethereum-optimism/optimism',
    repoLabel: 'github',
    editLinks: true,
    docsDir: 'src',
    docsRepo: 'https://github.com/ethereum-optimism/community-hub',
    docsBranch: 'main',
    editLinkText: `See a typo? We'd 💖 a pull request over on GitHub`,
    lastUpdated: false,
    algolia: {
      apiKey: '47d21d4ea72ed7cb504b1c6c0a46b5a0',
      indexName: 'optimism'
    },
    nav: [
      {
        text: 'networks',
        link: '/docs/developers/networks',
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
        text: 'open issues',
        link: 'https://github.com/ethereum-optimism/optimism/issues',
      },
      {
        text: 'open pull requests',
        link: 'https://github.com/ethereum-optimism/optimism/pulls'
      },
      {
        text: 'chat',
        link: 'https://discord.optimism.io',
      },
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
          title: 'User Docs',
          children: [
            '/docs/developers/eth-gateway.md',
            '/docs/developers/fees.md',
            '/docs/developers/metamask.md',
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Developer Docs',
          children: [
            {
               title: "Tutorials",
               collapsable: true,
               children: [
                   '/docs/resources/hardhat.md',
                   '/docs/resources/truffle.md'
               ]
            },
            '/docs/developers/integration.md',
            '/docs/developers/networks.md',
            '/docs/developers/bridging.md',
            '/docs/resources/tooling.md',
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Protocol Docs',
          children: [
            '/docs/protocol/protocol.md',
            '/docs/protocol/evm-comparison.md',
            '/docs/resources/protocol-readings.md',
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Additional Resources',
          children: [
            '/docs/resources/talks.md',
            '/docs/resources/general-resources.md',
          ],
          collapsable: false,
          sidebarDepth: 1,
        }
      ]
    }
  },

  plugins: [
    [
      '@vuepress/plugin-medium-zoom',
      {
        selector: 'img'
      }
    ]
  ]
}
