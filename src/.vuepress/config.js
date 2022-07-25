const { description } = require('../../package')
const path = require('path')

module.exports = {
  title: 'Optimism Docs',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/logos/favicon.png"}],
  ],

  cache: false,

  theme: path.resolve(__dirname, './theme'),
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
    iconPrefix: 'far fa-',
    pageInfo: false,
    pwa: {
      cacheHTML: false,
    },
    activeHash: {
      offset: -200,
    },
    algolia: {
      apiKey: '47d21d4ea72ed7cb504b1c6c0a46b5a0',
      indexName: 'optimism'
    },
    nav: [
      {
        text: "Getting Started",
        link: '/docs/guides/'
      },
      {
        text: 'How Optimism Works',
        link: '/docs/protocol/',
      },      
      {
        text: 'Dev Docs',
        link: '/docs/developers/',
      },
      {
        text: "Governance",
        link: "/docs/governance/"
      },      
      {
        text: 'Contribute',
        link: '/docs/contribute/',
      },
      {
        text: 'Community',
        items: [
          {
            icon: 'discord',
            iconPrefix: 'fab fa-',
            iconClass: 'color-discord',
            text: 'Discord',
            link: 'https://discord.optimism.io',
          },
          {
            icon: 'github',
            iconPrefix: 'fab fa-',
            iconClass: 'color-github',
            text: 'GitHub',
            link: 'https://github.com/ethereum-optimism/optimism',
          },
          {
            icon: 'twitter',
            iconPrefix: 'fab fa-',
            iconClass: 'color-twitter',
            text: 'Twitter',
            link: 'https://twitter.com/optimismFND',
          },
          {
            icon: 'twitch',
            iconPrefix: 'fab fa-',
            iconClass: 'color-twitch',
            text: 'Twitch',
            link: 'https://www.twitch.tv/optimismpbc'
          },
          {
            icon: 'medium',
            iconPrefix: 'fab fa-',
            iconClass: 'color-medium',
            text: 'Blog',
            link: 'https://optimismpbc.medium.com/'
          },
          {
            icon: 'computer-classic',
            iconClass: 'color-ecosystem',
            text: 'Ecosystem',
            link: 'https://www.optimism.io/apps/all',
          },
          {
            icon: 'globe',
            iconClass: 'color-optimism',
            text: 'optimism.io',
            link: 'https://www.optimism.io/',
          }
        ]
      }
    ],
    searchPlaceholder: 'Search the docs',
    sidebar: {    
      '/docs/governance/': [
        [
          'https://www.optimism.io/vision',
          'The Optimistic Vision'
        ],
        '/docs/governance/economics.md',        
        '/docs/governance/allocations.md',
        [
          'https://github.com/ethereum-optimism/OPerating-manual/blob/main/manual.md',
          'OPerating Manual for the Optimism Collective'
        ],        
        '/docs/governance/airdrop-1.md',
        '/docs/governance/gov-fund.md'
      ],
      '/docs/guides/': [
        '/docs/developers/build/basic-contract.md',
        '/docs/developers/tutorials.md',        
        '/docs/guides/wallet-dev.md',
        '/docs/guides/cex-dev.md',
        '/docs/guides/token-dev.md',
        '/docs/guides/bridge-dev.md',
        '/docs/guides/smart-contract-devs.md',
        '/docs/guides/testing.md',
      ],
      '/docs/protocol/': [
        {
          title: 'How Optimism Works',
          children: [
            '/docs/protocol/1-design-philosophy.md',
            '/docs/protocol/2-rollup-protocol.md',
          ],
          collapsable: false,          
        },
        {
          title: 'Protocol Specs',
          children: [
            '/docs/protocol/protocol-2.0.md',
            '/docs/protocol/compressed-ctc.md'
          ]
        }
      ],
      '/docs/developers/': [
        '/docs/developers/releases.md',
        {
          title: 'Building on Optimism',
          children: [
            '/docs/developers/build/using-tools.md',
            '/docs/developers/build/transaction-fees.md',
            '/docs/developers/build/system-contracts.md',
            '/docs/developers/build/dev-node.md',
            '/docs/developers/build/run-a-node.md',
            '/docs/developers/build/differences.md',
            '/docs/developers/build/json-rpc.md',
            '/docs/developers/build/testing-dapps.md'
          ],
        },
        {
          title: 'Bridging L1 and L2',
          children: [
            '/docs/developers/bridge/basics.md',
            '/docs/developers/bridge/standard-bridge.md',
            '/docs/developers/bridge/messaging.md',
            '/docs/developers/bridge/comm-strategies.md'
          ],
          collapsable: true,
        },
        '/docs/developers/known-issues.md',
        { 
          title: "Useful Tools",
          children: [
            '/docs/useful-tools/networks.md',
            '/docs/useful-tools/debugging.md',
            '/docs/useful-tools/faucets.md',
            '/docs/useful-tools/monitoring.md',
            '/docs/useful-tools/explorers.md',
            '/docs/useful-tools/providers.md',
            ['https://www.optimism.io/apps/tools', 'Third Party Tools'],
          ],
        },
        {
          title: "SDK",
          children: [
            '/docs/sdk/js-client.md',
            [
              'https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/docs',
              'Contracts API'
            ]            
          ]
        },
        {
        title: "Bedrock (future version)",
          children: [
            '/docs/developers/bedrock.md',
            '/docs/developers/bedrock-temp/infra.md',            
          ]
        }
      ],
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
  
module.exports.themeConfig.sidebar["/docs/useful-tools/"] = module.exports.themeConfig.sidebar["/docs/developers/"]
