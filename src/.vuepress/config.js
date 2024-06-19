const { description } = require("../../package");
const path = require("path");

module.exports = {
  title: "Optimism Docs",
  description: description,

  head: [
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/logos/favicon.png",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://community.optimism.io/assets/logos/twitter-logo.png",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://community.optimism.io/assets/logos/twitter-logo.png",
      },
    ],
    ["meta", { name: "twitter:title", content: "OP Docs" }],
    ["meta", { property: "og:title", content: "OP Docs" }],
    ["meta", { name: "twitter:card", content: "summary" }],
  ],

  theme: path.resolve(__dirname, "./theme"),
  themeConfig: {
    contributor: false,
    hostname: "https://community.optimism.io",
    logo: "/assets/logos/logo.png",
    docsDir: "src",
    docsRepo: "https://github.com/ethereum-optimism/community-hub",
    docsBranch: "main",
    lastUpdated: false,
    darkmode: "disable",
    themeColor: false,
    blog: false,
    iconPrefix: "far fa-",
    pageInfo: false,
    pwa: {
      cacheHTML: false,
    },
    activeHash: {
      offset: -200,
    },
    algolia: {
      appId: "8LQU4WGQXA",
      apiKey: "2c1a86142192f96dab9a5066ad0c1d50",
      indexName: "optimism",
    },
    nav: [
      /* When you update here, don't forget to update the tiles
         in src/README.md */
      {
        text: "Welcome",
        link: "/docs/welcome/",
      },
      {
        text: "Get a Grant",
        link: "/docs/grant/",
      },
      {
        text: "Token House",
        link: "/docs/token-house/",
      },
      {
        text: "Citizens House",
        link: "/docs/citizen-house/",
      },
      {
        text: "Identity",
        link: "/docs/identity/",
      },
      {
        text: "OP Token Info",
        link: "/docs/op-token/",
      },
      {
        text: "Contribute",
        link: "/docs/contribute/",
      },
      {
        text: "Technical Docs",
        link: "https://docs.optimism.io/",
        target: '_blank', 
        rel: 'noopener noreferrer' 
      },
    ],
    searchPlaceholder: 'Search the docs',
    sidebar: {   
      '/docs/welcome' : [
        ["/docs/welcome/", "Overview"],
        [
          "https://gov.optimism.io/t/working-constitution-of-the-optimism-collective/55",
          "Working Constitution",
        ],
        [
          "https://github.com/ethereum-optimism/OPerating-manual/blob/main/manual.md",
          "OPerating Manual",
        ],
        ["/docs/welcome/what-is-the-optimism-foundation.md", "What is the Optimism Foundation"]
      ],
      '/docs/grant' : [
        ["/docs/grant/", "Overview"],
        ["/docs/grant/get-support.md", "Additional Support"]
      ],
      '/docs/token-house' : [
        ["/docs/token-house/", "Overview"],
        ["/docs/token-house/how-to-delegate.md", "How to Delegate OP Tokens"],
        ["/docs/token-house/gov-fund-overview.md", "Governance Fund Overview"],
        ["/docs/token-house/token-house-history.md", "Governance Seasons History"],
      ],
      '/docs/citizen-house' : [
        ["/docs/citizen-house/", "Overview"],
        ["/docs/citizen-house/how-retro-funding-works.md", "How Retro Funding Works"],
        ["/docs/citizen-house/citizenship-selection.md", "Citizenship Selection"],
        ["/docs/citizen-house/experimentation-with-citizenship.md", "Experimentation with Citizenship"],
      ],
      '/docs/identity/': [
        ["/docs/identity/", "Overview"],
        ["/docs/identity/identity-and-rep.md", "Identity and Reputation"],
        ["/docs/identity/attestations-best-practices.md", "Attestations Best Practices"],
        ["/docs/identity/project-and-individual-identity-in-the-collective.md", "Project and individual identity in the Collective"]
      ],
      '/docs/op-token' : [
        ["/docs/op-token/", "Overview"],
        {
          title: "Airdrops",
          children: [
            "/docs/op-token/airdrop-1.md",
            "/docs/op-token/airdrop-2.md",
            "/docs/op-token/airdrop-3.md",
            "/docs/op-token/airdrop-4.md",
          ],
          collapsable: true,
        },
      ],
      "/docs/contribute/": [
        ["/docs/contribute/", "Overview"],
        [
          "https://calendar.google.com/calendar/embed?src=c_4hui70itm089e7t8q50heh1kno%40group.calendar.google.com",
          "Upcoming Events",
        ],
        {
          title: "🌍 Accessibility",
          children: [
            "/docs/contribute/contribution-path/translators.md",
            "/docs/contribute/contribution-path/local-optimists.md",
            "/docs/contribute/contribution-path/NERD-req.md",
          ],
          collapsable: true,
        },
        {
          title: "📈 Data & Analytics",
          children: [
            "/docs/contribute/contribution-path/numbaNERDs.md",
            "/docs/contribute/contribution-path/attestation-identity.md"
          ],
          collapsable: true,
        },
        {
          title: "💻 Developers",
          children: [
            ["/docs/developers/", "Build on Optimism"],
            ["https://stack.optimism.io/", "Building with the OP Stack"],
            [
              "https://github.com/orgs/ethereum-optimism/projects/31/views/3",
              "Ideas List",
            ],
            "/docs/contribute/contribution-path/techNERDs.md",
            "/docs/contribute/technical-contributions.md",
          ],
          collapsable: true,
        },
        {
          title: "🏛️ Governance",
          children: [
            "/docs/governance/get-a-grant.md",
            ["/docs/governance/delegate.md", "Token House"],
            ["/docs/governance/citizens-house.md", "Citizen House"],
          ],
          collapsable: true,
        },
        {
          title: "🫡 Marketing",
          children: [
            '/docs/contribute/important-terms.md',
            '/docs/contribute/contribution-path/Ambassador-req.md',
            '/docs/contribute/demo-day.md'
          ],
          collapsable: true,
        },
      ],
    },
  },

  plugins: [
    "@vuepress/pwa",
    [
      "@vuepress/plugin-medium-zoom",
      {
        // When an image is inside a link, it means we don't to expand it
        // when clicked
        selector: ":not(a) > img",
      },
    ],
    "plausible-analytics",
  ],
};

module.exports.themeConfig.sidebar["/docs/useful-tools/"] =
  module.exports.themeConfig.sidebar["/docs/developers/"];
module.exports.themeConfig.sidebar["/docs/sdk/"] =
  module.exports.themeConfig.sidebar["/docs/developers/"];
