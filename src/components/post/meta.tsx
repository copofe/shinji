import { Post } from '::/types'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export default function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-muted-foreground text-xs">
      <time>{dayjs(post.createdAt).format('ll')}</time>
      <span className="mx-2">·</span>
      <span>{post.author?.nickname}</span>
    </p>
  )
}
