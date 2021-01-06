const { description } = require('../../package')

module.exports = {
  title: 'The Optimism Community Hub',
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
          title: 'Contract Docs',
          collapsable: false,
          children: [
            '',
            '00-overview',
            {
              title: 'System Architecture (A Deep Dive)',
              collapsable: false,
              children: [
                '/docs/01-deep-dive/00-rollup-contracts',
                '/docs/01-deep-dive/01-execution-contracts',
                '/docs/01-deep-dive/02-verification-contracts',
                '/docs/01-deep-dive/03-bridge-contracts',
              ]
            },
            {
              title: 'Contract APIs',
              collapsable: false,
              children: [
                '/docs/02-contract-apis/00-rollup-contracts',
                '/docs/02-contract-apis/01-execution-contracts',
                '/docs/02-contract-apis/02-verification-contracts',
                '/docs/02-contract-apis/03-bridge-contracts',
              ]
            },
            {
              title: 'Contract Usage Examples',
              collapsable: false,
              children: [
                '/docs/03-examples/00-submitting-transactions',
                '/docs/03-examples/01-using-bridge-contracts',
              ]
            }
          ]
        }
      ],
      '/compare/': [
        {
          children: [''],
          collapsable: true,
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
