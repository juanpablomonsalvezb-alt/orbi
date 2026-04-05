/**
 * Simple markdown-to-HTML converter for blog articles.
 * Handles: H1-H3 headers, bold, italic, paragraphs, horizontal rules, links.
 * No external dependencies needed.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Escape HTML entities first (avoid XSS)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Process line by line for block elements
  const lines = html.split('\n')
  const result: string[] = []
  let inParagraph = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Horizontal rule
    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push('<hr />')
      continue
    }

    // H3
    if (trimmed.startsWith('### ')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(`<h3>${inlineFormat(trimmed.slice(4))}</h3>`)
      continue
    }

    // H2
    if (trimmed.startsWith('## ')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(`<h2>${inlineFormat(trimmed.slice(3))}</h2>`)
      continue
    }

    // H1
    if (trimmed.startsWith('# ')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(`<h1>${inlineFormat(trimmed.slice(2))}</h1>`)
      continue
    }

    // Empty line — end paragraph
    if (trimmed === '') {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    // Regular text — paragraph
    if (!inParagraph) {
      result.push('<p>')
      inParagraph = true
    } else {
      result.push(' ')
    }
    result.push(inlineFormat(trimmed))
  }

  if (inParagraph) {
    result.push('</p>')
  }

  return result.join('')
}

function inlineFormat(text: string): string {
  // Bold + italic: ***text***
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/_(.+?)_/g, '<em>$1</em>')
  // Inline code: `code`
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Links: [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  return text
}
