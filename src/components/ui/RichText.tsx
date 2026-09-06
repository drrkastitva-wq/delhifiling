import React from 'react'

interface RichTextProps {
  content: any
}

function serializeNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  if (node.type === 'text') {
    let text: React.ReactNode = node.text
    if (node.format & 1) text = <strong key={index}>{text}</strong>
    if (node.format & 2) text = <em key={index}>{text}</em>
    if (node.format & 8) text = <u key={index}>{text}</u>
    if (node.format & 16) text = <code key={index} className="bg-cream px-1.5 py-0.5 rounded text-sm font-mono">{text}</code>
    return text
  }

  const children = node.children?.map((child: any, i: number) => serializeNode(child, i))

  switch (node.type) {
    case 'paragraph':
      return <p key={index} className="mb-4 text-text leading-relaxed">{children}</p>
    case 'heading': {
      const classes: Record<string, string> = {
        h1: 'text-3xl font-bold text-navy mt-8 mb-4',
        h2: 'text-2xl font-bold text-navy mt-8 mb-3',
        h3: 'text-xl font-semibold text-navy mt-6 mb-3',
        h4: 'text-lg font-semibold text-navy mt-4 mb-2',
      }
      if (node.tag === 'h1') return <h1 key={index} className={classes.h1}>{children}</h1>
      if (node.tag === 'h2') return <h2 key={index} className={classes.h2}>{children}</h2>
      if (node.tag === 'h3') return <h3 key={index} className={classes.h3}>{children}</h3>
      return <h4 key={index} className={classes.h4}>{children}</h4>
    }
    case 'list':
      return node.listType === 'number'
        ? <ol key={index} className="mb-4 pl-6 space-y-1 list-decimal">{children}</ol>
        : <ul key={index} className="mb-4 pl-6 space-y-1 list-disc">{children}</ul>
    case 'listitem':
      return <li key={index} className="text-text">{children}</li>
    case 'quote':
      return <blockquote key={index} className="border-l-4 border-gold pl-4 py-2 my-4 bg-cream rounded-r-lg italic text-text-muted">{children}</blockquote>
    case 'link':
      return <a key={index} href={node.fields?.url || '#'} target={node.fields?.newTab ? '_blank' : undefined} rel="noopener noreferrer" className="text-gold hover:underline">{children}</a>
    case 'horizontalrule':
      return <hr key={index} className="my-6 border-border" />
    default:
      return <span key={index}>{children}</span>
  }
}

export default function RichText({ content }: RichTextProps) {
  if (!content?.root?.children) return null
  return (
    <div className="rich-text">
      {content.root.children.map((node: any, i: number) => serializeNode(node, i))}
    </div>
  )
}
