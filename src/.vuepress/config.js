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
          title: 'Users',
          children: [
            '/docs/users/metamask.md',
            '/docs/users/gateway.md',
          ],
          collapsable: false,
          sidebarDepth: 3,
        },
        {
          title: 'Developers',
          children: [
            {
               title: 'Getting Started',
               children: [
                 [
                      'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat',
                      'Using Optimistic Ethereum with the Truffle Development Environment'
                 ],
                 [
                      'https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle',
                      'Using Optimistic Ethereum with the Truffle Development Environment'
                 ],
               ]
            },
            { 
              title: 'Dapps for Standalone Optimistic Ethereum',
              children: [
                 [
                    '/docs/developers/alone/why.md',
                    'Why Run in Standalone Optimistic Ethereum?'
                 ],
                 [
                    '/docs/developers/alone/requirements.md',
                    'Converting Applications for Optimistic Ethernet'
                 ],
                 [
                    '/docs/developers/alone/hardhat.md',
                    'Hardhat Tooling'
                 ],
                 [
                    '/docs/developers/alone/truffle.md',
                    'Truffle Tooling'
                 ]
              ]
            },
            { 
              title: 'Multinet Dapps',
              children: [
                 [ '/docs/developers/multi/erc20.md', 
                   'Bridging ERC20 Tokens'
                 ],
                 [ '/docs/developers/multi/msgs.md',
                   'General Purpose Bridge'
                 ],
                 [ '/docs/developers/multi/fees.md',
                   'Transaction Fees'
                 ]
              ] 
            }

/*            '/docs/developers/tooling.md',
            '/docs/developers/integration.md',
            '/docs/developers/networks.md',
            '/docs/developers/eth-gateway.md',
            '/docs/developers/bridging.md',
            '/docs/developers/fees.md', */
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Protocol Specs',
          children: [
            '/docs/protocol/protocol.md',
            '/docs/protocol/evm-comparison.md',
            '/docs/protocol/protocol-readings.md',
          ],
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Additional Resources',
          children: [
            '/docs/resources/talks.md',
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
