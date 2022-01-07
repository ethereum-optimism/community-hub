const { description } = require('../../package')

module.exports = {
  title: 'Optimism Docs',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: 'vuepress-theme-hope',
  themeConfig: {
    contributor: false,
    hostname: 'https://community.optimism.io',
    logo: '/assets/logos/logo.png',
    docsDir: 'src',
    docsRepo: 'https://github.com/ethereum-optimism/community-hub',
    docsBranch: 'main',
    lastUpdated: false,
    darkmode: 'disable',
    themeColor: false,
    blog: false,
    algolia: {
      apiKey: '47d21d4ea72ed7cb504b1c6c0a46b5a0',
      indexName: 'optimism'
    },
    nav: [
      {
        text: 'Developer Docs',
        link: '/docs/developers/',
      },
      {
        text: 'Tools for Developers',
        link: '/docs/useful-tools/',
      },
      {
        text: 'Protocol',
        link: '/docs/protocol/',
      },
      {
        text: 'Community',
        items: [
          {
            text: 'Discord',
            link: 'https://discord.optimism.io',
          }
        ]
      }
    ],
    searchPlaceholder: 'Search the docs',
    sidebar: {
      '/docs/developers/': [
        {
          title: 'Building on Optimism',
          // Reordered to follow the order in which I
          // expect people will do things, followed by
          // more advanced topics such as RPC and Block Time
          children: [
            '/docs/developers/build/basic-contract.md',
            '/docs/developers/build/using-tools.md',
            '/docs/developers/build/transaction-fees.md',
            '/docs/developers/build/system-contracts.md',
            '/docs/developers/build/dev-node.md',
            '/docs/developers/build/run-a-node.md',
            '/docs/developers/build/differences.md',
          ],
        },
        {
          title: 'Bridging L1 and L2',
          children: [
            '/docs/developers/bridge/standard-bridge.md',
            '/docs/developers/bridge/messaging.md',
          ],
          collapsable: true,
        },
        '/docs/developers/tutorials.md',
        '/docs/developers/known-issues.md',
        '/docs/developers/contact-us.md'
      ],
      '/docs/useful-tools/': [
        '/docs/useful-tools/networks.md',
        '/docs/useful-tools/debugging.md',
        '/docs/useful-tools/faucets.md',
        '/docs/useful-tools/monitoring.md',
        '/docs/useful-tools/explorers.md',
        '/docs/useful-tools/providers.md',
        ['https://www.optimism.io/apps/tools', 'Third Party Tools'],
      ],
      '/docs/protocol/': [
        '/docs/protocol/protocol-2.0.md',
        '/docs/protocol/sequencing.md',
        '/docs/protocol/challenges.md',
        '/docs/protocol/protocol-readings.md',
        [
          'https://github.com/ethereum-optimism/optimistic-specs',
          'Protocol Specs'
        ]
      ],
      '/docs/retro-pgf/': [
        [
          'https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c',
          'What is RetroPGF?'
        ],
        '/docs/retro-pgf/rounds.md',
        '/docs/retro-pgf/resources.md',
      ]
    }
  },

  plugins: [
    [
      '@vuepress/plugin-medium-zoom',
      {
        // When an image is inside a link, it means we don't to expand it
        // when clicked
        selector: ':not(a) > img'
      }
    ],
    "plausible-analytics"
  ]
}
