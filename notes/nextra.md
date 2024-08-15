# How the Optimism Docs Use Nextra

The Optimism Docs use the [Nextra](https://nextra.site/) documentation framework.
Nextra is essentially a combination of [Next.js](https://nextjs.org/) + [MDX](https://mdxjs.com/) and allows you to write React components that can be used within Markdown pages.
Nextra documentation is decent and can explain the basics of how to do most of the things you might want to do.
This page documents all of the things that we do that are currently not made obvious by Nextra's docs.

## Remark Plugins

Nextra uses [Remark](https://github.com/remarkjs/remark) as a markdown processor.
Remark plugins can be injected into Nextra by modifying the `mdxOptions` object inside of [`next.config.mjs`](/next.config.mjs).

### Custom Plugins

#### remarkCodeImport

Rule is modified via [patch](/patches/remark-code-import@1.2.0.patch) to require that all code imports include a md5 content hash of the imported content.
Requiring this hash means that changes to the underlying content must also come with corresponding changes to the relevant imports and imports cannot silently break.
