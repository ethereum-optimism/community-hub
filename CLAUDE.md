# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Optimism Community Hub documentation site (community.optimism.io), built with Nextra (Next.js + MDX) for the Optimism Collective. It contains documentation about governance, grants, token distribution, identity systems, and community contributions.

## Essential Commands

### Development
```bash
pnpm i              # Install dependencies
pnpm dev            # Start dev server on localhost:3000
pnpm build          # Build for production
pnpm start          # Start production server
```

### Code Quality
```bash
pnpm lint           # Run ESLint on .mdx files and spellcheck
pnpm fix            # Auto-fix ESLint issues and update spellcheck dictionary
pnpm spellcheck:lint # Check spelling in MDX files
pnpm spellcheck:fix  # Update words.txt with new terms
pnpm linkcheck      # Check for broken links using lychee
```

## Architecture and Key Components

### Framework Stack
- **Nextra 2.13.2**: Documentation framework combining Next.js + MDX
- **React 18**: UI components
- **TypeScript**: Type checking (non-strict mode)
- **Remark**: Markdown processing with custom plugins

### Directory Structure
- `pages/`: MDX content files organized by documentation sections
  - Each section has `_meta.json` for navigation configuration
  - Main sections: welcome, grant, token-house, op-token, citizens-house, identity, contribute
- `public/`: Static assets (images, icons, JSON data)
- `theme.config.tsx`: Nextra theme configuration (header, footer, sidebar settings)
- `patches/`: npm package patches for custom behavior

### Content Management
- **MDX Files**: Support React components within Markdown
- **Frontmatter**: YAML metadata at file start (title, description, lang)
- **Remark Plugins**: Custom markdown processing including:
  - `remarkCodeImport`: Import code with MD5 hash validation
  - Custom lint rules for MDX formatting

### Configuration Files
- `next.config.mjs`: Next.js and Nextra configuration
- `.eslintrc.js`: ESLint rules for MDX files (no semicolons)
- `cspell.json`: Spell checking configuration with custom dictionary
- `lychee.toml`: Link checking configuration with URL remapping
- `words.txt`: Custom dictionary for spell checker

### Key Dependencies
- `@eth-optimism/contracts-ts`: Optimism contract interfaces
- `@eth-optimism/tokenlist`: Token list management
- `@feelback/react`: User feedback widget integration
- Various remark plugins for linting and formatting

### Development Guidelines
- All MDX files must pass ESLint and spellcheck validation
- Links are validated with lychee (excludes certain domains like RPC endpoints)
- Custom words should be added to `words.txt` when introducing new terminology
- React components can be imported and used directly in MDX files
- Patches are applied to core dependencies for custom behavior (see patches/ directory)