const { description } = require('../../package')

module.exports = {
  title: 'Stay Optimistic',
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
        text: 'faqs',
        link: '/faqs/',
      },
      {
        text: 'discord',
        link: 'https://discord.optimism.io',
      },
    ],
    sidebar: {
      '/docs/': [
        {
          title: 'User Docs',
          children: [
            // {
            //   title: 'Supported Wallets',
            //   children: [
            //     [
            //       '/docs/users/metamask.md',
            //       'MetaMask'
            //     ],
            //     [
            //       `https://rainbow.me/`,
            //       `Rainbow`
            //     ],
            //     [
            //       `https://support.token.im/hc/en-us/articles/900006289803-How-to-use-Layer-2-network-through-imToken's-custom-network-function-`,
            //       'imToken'
            //     ],
            //     [
            //       `https://medium.com/ethereum-optimism/improving-ux-on-l2-ff2f88f44836`,
            //       `Coinbase Wallet`
            //     ]
            //   ],
            //   collapsable: false,
            //   sidebarDepth: 0,
            // },
            '/docs/users/wallets.md',
            '/docs/users/metamask.md',
            '/docs/users/gateway.md',
            '/docs/users/dapps.md',
            '/docs/users/fees.md'
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Developer Docs',
          children: [
            // Moved Learning resources to the top because
            // it's the first thing I want noobs to see.
            {
              title: 'Guides and Tutorials',
              children: [
                [
                  'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat',
                  'Optimistic Ethereum with Hardhat'
                ],
                [
                  'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle',
                  'Optimistic Ethereum with Truffle'
                ],
                [
                  '/docs/developers/l2/remix.md',
                  'Optimistic Ethereum with Remix (coming soon)'
                ],
                [
                  'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-token',
                  'Registering an ERC20 Token on L2 (coming soon)'
                ],
                [
                  'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/l1-l2-deposit-withdrawal',
                  'Depositing and Withdrawing ERC20 Tokens (coming soon)'
                ],
                [
                  'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/',
                  'Generic L1 ⇔ L2 Communication (coming soon)'
                ]
              ],
              collapsable: false,
              sidebarDepth: 0,
            },
            {
              title: 'Working on Optimistic Ethereum',
              // Reordered to follow the order in which I
              // expect people will do things, followed by
              // more advanced topics such as RPC and Block Time
              children: [
                '/docs/developers/l2/dev-node.md',
                '/docs/developers/l2/hardhat.md',
                '/docs/developers/l2/truffle.md',
                '/docs/developers/l2/convert.md',
                '/docs/developers/l2/contracts.md',
                '/docs/developers/l2/block-time.md',
                '/docs/developers/l2/rpc.md',
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
            '/docs/developers/fees.md',
            '/docs/developers/talks.md'
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
            '/docs/infra/third-party-tools.md',
            '/docs/infra/monitoring.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Protocol Specs',
          children: [
            '/docs/protocol/protocol.md',
            '/docs/protocol/evm-comparison.md',
            '/docs/protocol/protocol-readings.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        }
      ],
      '/compare/': [
        {
          children: [''],
          collapsable: false,
          sidebarDepth: 0,
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
    [
      '@vuepress/plugin-medium-zoom',
      {
        selector: 'img'
      }
    ]
  ]
}
