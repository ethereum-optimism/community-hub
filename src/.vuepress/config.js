const { description } = require('../../package')

module.exports = {
  title: 'Optimistic Ethereum | Docs',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Contract Docs',
        link: '/contracts/',
      },
      {
        text: 'Optimism',
        link: 'https://optimism.io'
      }
    ],
    sidebar: {
      '/contracts/': [
        {
          title: 'Contract Docs',
          collapsable: false,
          children: [
            '',
            '00-overview',
            {
              title: 'System Architecture (A Deep Dive)',
              collapsable: false,
              children: [
                '/contracts/01-deep-dive/00-rollup-contracts',
                '/contracts/01-deep-dive/01-execution-contracts',
                '/contracts/01-deep-dive/02-verification-contracts',
                '/contracts/01-deep-dive/03-bridge-contracts',
              ]
            },
            {
              title: 'Contract APIs',
              collapsable: false,
              children: [
                '/contracts/02-contract-apis/00-rollup-contracts',
                '/contracts/02-contract-apis/01-execution-contracts',
                '/contracts/02-contract-apis/02-verification-contracts',
                '/contracts/02-contract-apis/03-bridge-contracts',
              ]
            },
            {
              title: 'Contract Usage Examples',
              collapsable: false,
              children: [
                '/contracts/03-examples/00-submitting-transactions',
                '/contracts/03-examples/01-using-bridge-contracts',
              ]
            }
          ]
        }
      ],
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'fulltext-search'
  ]
}
