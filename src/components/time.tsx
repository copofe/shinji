'use client'

import { date } from '::/libs'

export default function Time({ timestamp }: { timestamp: number }) {
  return <span>{date.format(timestamp)}</span>
}
