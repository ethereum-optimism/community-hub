# How the Optimism Docs Use Remark

The Optimism Docs use [Nextra](https://nextra.site) as a documentation framework which uses [Remark](https://github.com/remarkjs/remark) as a markdown processor under the hood.
This repository also uses [ESLint](https://eslint.org) in combination with [`eslint-plugin-mdx`](https://www.npmjs.com/package/eslint-plugin-mdx) as this plugin also uses Remark under the hood.
Remark is a flexible Markdown processor with a [vibrant plugin ecosystem](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins).

## Linting

### Adding Rules

To add a linting rule, simply install your desired linting rule via `pnpm` and add the rule to the [`.remarkrc.mjs`](/.remarkrc.mjs) configuration file at the root of this repository.
You can find a list of rules maintained by the Remark team on the [`remark-lint`](https://github.com/remarkjs/remark-lint#rules) repository.
If you need to write your own custom plugin, place the plugin inside of [`utils/plugins/remark`](/utils/plugins/remark/)

### Custom Rules

#### remarkLintNoBlockedCharacters

Custom rule to prevent the use of certain characters like zero-width spaces or smartquotes.

#### remarkLintFrontmatterSchema

Rule is modified via [patch](/patches/remark-lint-frontmatter-schema@3.15.4.patch) to block MDX files from including no frontmatter at all.
Pending [this issue](https://github.com/JulianCataldo/remark-lint-frontmatter-schema/issues/28) on GitHub.
