const { description } = require('../../package')

module.exports = {
  title: 'Optimistic Ethereum Docs',
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
    editLinkText: `Something off? Click here to suggest an edit to this page on GitHub 👩‍💻`,
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
        {
          title: 'Getting Started',
          children: [
            '/docs/getting-started/basics.md',
            '/docs/getting-started/first-tx.md',
            '/docs/getting-started/deposit-and-withdraw.md',
            '/docs/getting-started/things-to-do.md',
            '/docs/getting-started/contributing.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Building Apps on OE',
          children: [
            '/docs/building-apps/basic-deploy.md',
            '/docs/building-apps/favorite-tools.md',
            '/docs/building-apps/transaction-fees.md',
            '/docs/building-apps/system-contracts.md',
            '/docs/building-apps/standard-bridge.md',
            '/docs/building-apps/sending-messages.md',
            '/docs/building-apps/dev-node.md',
            '/docs/building-apps/network-node.md',
            '/docs/building-apps/mainnet-deployment.md',
            '/docs/building-apps/regenesis.md',
            '/docs/building-apps/differences.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Useful Tools for Developers',
          children: [
            '/docs/useful-tools/networks.md',
            '/docs/useful-tools/faucets.md',
            '/docs/useful-tools/explorers.md',
            '/docs/useful-tools/providers.md',
            '/docs/useful-tools/running-a-node.md',
            '/docs/useful-tools/monitoring.md',
            '/docs/useful-tools/debugging.md',
            [
              'https://www.optimism.io/apps/tools',
              'And a big list of other OE tools'
            ],
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Under the Hood',
          children: [
            '/docs/under-the-hood/theory.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Retroactive Public Goods Funding',
          children: [
            '/docs/retropgf/what-is-retropgf.md',
            '/docs/retropgf/resources.md',
            '/docs/retropgf/rounds.md',
          ],
          collapsable: false,
          sidebarDepth: 0,
        },
        {
          title: 'Getting Involved',
          children: [
            '/docs/getting-involved/forums.md',
            '/docs/getting-involved/contributing-to-code.md',
            '/docs/getting-involved/contributing-to-protocol.md',
            '/docs/getting-involved/contributing-to-retropgf.md',
            '/docs/getting-involved/contributing-to-docs.md',
            '/docs/getting-involved/other-ways.md',
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
