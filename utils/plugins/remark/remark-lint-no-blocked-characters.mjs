import { visit } from 'unist-util-visit'
import { lintRule } from 'unified-lint-rule'

/**
 * Custom remark lint rule that blocks certain characters (smart quotes,
 * invisible spaces, etc.) from being used in the docs. Helps make the docs
 * more consistent and avoids characters that might cause issues on certain
 * platforms.
 */
const remarkLintNoBlockedCharacters = lintRule(
  {
    url: 'https://github.com/ethereum-optimism/docs',
    origin: 'remark-lint:no-blocked-characters'
  },
  (tree, file) => {
    visit(tree, 'text', (node) => {
      const characterRegex = /[“”‘’ ]/g
      const replacements = {
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        ' ': " "
      }

      let match
      while ((match = characterRegex.exec(node.value)) !== null) {
        file.message(
          `Blocked character found: (${match[0]}) at index ${match.index}`,
          node
        )

        node.value = node.value.substring(0, match.index) + replacements[match[0]] + node.value.substring(match.index + 1)
        file.messages[file.messages.length - 1].fix = {
          range: [node.position.start.offset, node.position.end.offset],
          text: node.value
        }
      }
    })
  }
)

export default remarkLintNoBlockedCharacters
