# GitHub Actions

## Linting

The `lint.yml` workflow checks that all Markdown and JavaScript files conform to the linting standards we apply.
Run `pnpm lint` to lint locally and run `pnpm fix` to fix issues that the linter can fix automatically.
All PRs must pass this check.
Also includes spellchecking via [cspell](https://cspell.org/).

## Link Checks

The `links.yml` workflow checks that all links in the docs are available.
Runs once per day.

## Tutorial Checks

The `tutorials.yml` workflow runs several of the tutorials within these docs.
Most tutorials take the form of JavaScript files that are imported within the content of the docs.
Same files can be executed individually to make sure that the tutorial actually works and isn't broken for one reason or another.
