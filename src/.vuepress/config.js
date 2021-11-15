const { description } = require('../../package')

module.exports = {
  title: 'Optimism Docs',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: 'https://github.com/ethereum-optimism/optimism',
    repoLabel: 'github',
    editLinks: true,
    docsDir: 'src',
    docsRepo: 'https://github.com/ethereum-optimism/community-hub',
    docsBranch: 'main',
    editLinkText: `Want to suggest a change? We'd 💖 a pull request over on GitHub`,
    lastUpdated: false,
    algolia: {
      apiKey: '47d21d4ea72ed7cb504b1c6c0a46b5a0',
      indexName: 'optimism'
    },
    nav: [
      {
        text: 'optimism',
        link: 'https://www.optimism.io',
      },
      {
        text: 'faqs',
        link: 'https://www.optimism.io/faqs',
      },
      {
        text: 'discord',
        link: 'https://discord.optimism.io',
      },
    ],
    sidebar: [
        [
          'https://intercom.help/optimism/en/',
          'User Docs & Help Center '
        ],
        {
          title: 'Developer Docs',
          children: [
            // Moved to a separate page that's linkable from the homepage
            '/docs/developers/tutorials.md',
            {
              title: 'Building on Optimism',
              // Reordered to follow the order in which I
              // expect people will do things, followed by
              // more advanced topics such as RPC and Block Time
              children: [
                '/docs/developers/l2/dev-node.md',
                '/docs/developers/l2/new-fees.md',
                '/docs/developers/l2/contracts-2.0.md',
                '/docs/developers/l2/json-rpc.md',
                '/docs/developers/l2/differences.md',
              ],
              collapsable: false,
              sidebarDepth: 0,
            },
            {
              title: 'Bridging L1 and L2',
              children: [
                // Common (standard bridge) before
                // rare (messaging)
                '/docs/developers/bridge/standard-bridge.md',
                '/docs/developers/bridge/messaging.md'
              ],
              collapsable: false,
              sidebarDepth: 0,
            },
            '/docs/developers/util.md',
            '/docs/developers/known-issues.md',
            '/docs/developers/contact-us.md'
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Infrastructure',
          children: [
            '/docs/infra/networks.md',
            [
              'https://github.com/optimisticben/op-replica/blob/main/README.md',
              'Running a Node'
            ],
            [
              'https://www.optimism.io/apps/tools',
              'Third Party Tools'
            ],
            '/docs/infra/monitoring.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Protocol Docs',
          children: [
            '/docs/protocol/protocol-2.0.md',
            '/docs/protocol/sequencing.md',
            '/docs/protocol/challenges.md',
            '/docs/protocol/protocol-readings.md',
            [
              'https://github.com/ethereum-optimism/optimistic-specs',
              'Protocol Specs'
            ]
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Retroactive Public Goods Funding',
          children: [
            [
              'https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c',
              'What is RetroPGF?'
            ],
            '/docs/retro-pgf/rounds.md',
            '/docs/retro-pgf/resources.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        }
    ]
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
