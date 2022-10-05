const { description } = require('../../package')
const path = require('path')

module.exports = {
  title: 'Optimism Docs',
  description: description,

  head: [ 
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/logos/favicon.png"}],
  ],

//  cache: false,

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
          '/docs/governance/',
          'What is the Optimism Collective?'
        ],
        [
          'https://www.optimism.io/vision',
          'The Optimistic Vision'
        ],
        {
          title: "OP Holders",
          children: [
            '/docs/governance/howto-delegate.md',
            '/docs/governance/economics.md',
            '/docs/governance/allocations.md',             
            '/docs/governance/airdrop-1.md'    
          ],
          collapsable: true,
        },                
        {
          title: "Delegates",
          children: [          
                '/docs/governance/delegate.md',
                '/docs/governance/existing-delegate.md',                
                '/docs/governance/delegate-info.md',
          ],
          collapsable: true,
        },
        {
          title: "Proposal Submitters",
          children: [
            '/docs/governance/proposals.md',
            [
              'https://gov.optimism.io/tags/c/proposals/38/passed',
              'Passed Proposals'
            ]
          ],
          collapsable: true,
        },
        {
          title: "Token House Governance",
          children: [
            '/docs/governance/token-house.md',
            '/docs/governance/token-house-history.md',
            '/docs/governance/gov-fund.md', 
            [
              'https://docs.google.com/spreadsheets/d/1eaHOlWB34ij1KGsXdaNyTQg4tt1Pu2JurJsElBb6a8k/edit#gid=0',
              "Governance Fund Tracker"
            ],            
            [
              'https://gov.optimism.io/t/working-constitution-of-the-optimism-collective/55',
              "Working Constitution"
            ],
            [
              'https://github.com/ethereum-optimism/OPerating-manual/blob/main/manual.md',
              'Operating Manual'
            ]
          ],
          collapsable: true,
        },                        
        '/docs/governance/citizens-house.md',        
        [
          'https://calendar.google.com/calendar/u/0?cid=Y19mbm10Z3VoNm5vbzZxZ2JuaTJncGVyaWQ0a0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
          'Governance Calendar'
        ],        
      ],
      '/docs/guides/': [
        '/docs/developers/build/basic-contract.md',
        '/docs/developers/tutorials.md',       
        '/docs/guides/wallet-dev.md',
        '/docs/guides/cex-dev.md',
        [
          "https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token",
          "Adding an ERC20 token to the standard bridge"
        ],
        '/docs/guides/bridge-dev.md',
        [
          "https://github.com/ethereum-optimism/optimism-tutorial/tree/main/getting-started",
          "Developing smart contracts on Optimism"
        ],

        '/docs/guides/testing.md',
        [
          'https://docs.alchemy.com/reference/optimism-sdk-examples',
          'Using Alchemy to query the Optimism blockchain'
        ]
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
            '/docs/developers/build/testing-dapps.md',
            '/docs/developers/build/cheap-dapp.md'

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
            '/docs/useful-tools/oracles.md',
            ['https://www.optimism.io/apps/tools', 'Third Party Tools'],
          ],
        },
        {
          title: "SDK",
          children: [
            '/docs/sdk/js-client.md',
            [
              'https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/docs',
              'Optimism Contracts'
            ],
            '/docs/sdk/alchemy-sdk.md'           
          ]
        },
        '/docs/developers/media.md',
        {
        title: "Bedrock (future version)",
          children: [
            '/docs/developers/bedrock.md',
            '/docs/developers/bedrock-temp/infra.md', 
            [
              'https://oplabs.notion.site/Usage-Guide-3667cfd2b180475894201f4a69089419',
              'Bedrock alpha - user guide',
            ],
            [
              'https://oplabs.notion.site/Contract-Addresses-8669ef7d6f124accb0220a5e0f24be0d',
              'Bedrock alpha - contract addresses'
            ],
            [
              'https://oplabs.notion.site/Running-a-Node-eda545c730e64b44b762ab12e93296aa',
              'Bedrock alpha - running a node'
            ]        
          ]
        }
      ],
    }
  },

  plugins: [
    "@vuepress/pwa",
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
