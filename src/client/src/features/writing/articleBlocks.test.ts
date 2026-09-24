import { describe, expect, test } from 'vitest'
import { parseArticleBlocks } from './articleBlocks'

describe('article block contract', () => {
  test('keeps aside, figure and pull quote in source order with one authored invitation', () => {
    const blocks = parseArticleBlocks(`Before.

:::figure chart
visual: agent-organisation-overhead
description: Will oversees Rooms.
caption: The organisation.
layout: wide
:::end-figure

:::aside extra
title: The packaged organisation
standfirst: A second experiment.
disclosure: Read the experiment

## A heading inside the aside

Hidden body.
:::end-aside

:::pullquote
The novel did not need a department.
:::end-pullquote

After.`)

    expect(blocks.map((item) => item.kind)).toEqual(['prose', 'figure', 'aside', 'pullquote', 'prose'])
    expect(blocks[2]).toMatchObject({ kind: 'aside', id: 'extra', markdown: '## A heading inside the aside\n\nHidden body.' })
    expect(blocks[4]).toMatchObject({ kind: 'prose', markdown: 'After.' })
  })

  test('rejects an unclosed aside rather than publishing its body as prose', () => {
    expect(() => parseArticleBlocks(`Before.\n:::aside extra\ntitle: Extra\nstandfirst: Optional.\ndisclosure: Read\n\nHidden.`))
      .toThrow('Unclosed aside block')
  })

  test('does not treat directive-like text in a code fence as an article block', () => {
    expect(parseArticleBlocks('```md\n:::aside example\n:::end-aside\n```'))
      .toEqual([{ kind: 'prose', markdown: '```md\n:::aside example\n:::end-aside\n```' }])
  })
})
