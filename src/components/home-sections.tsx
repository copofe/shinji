import Image from 'next/image'
import Link from 'next/link'
import { Post } from '::/db/post'
import { projects } from '::/data/projects'
import { friends } from '::/data/friends'
import {
  Card,
  CardGroup,
  CardHeader,
  CardTitle,
  CardDescription,
} from '::/components/ui/card'
import { Tooltip } from '::/components/ui/tooltip'

export default function HomeSections({ posts }: { posts: Post[] }) {
  return (
    <>
      <section className="mt-16 md:mt-32">
        <span className="mb-5 block font-medium">Post</span>
        <CardGroup separated className="-mx-4 gap-0">
          {posts.map((post, i) => (
            <Card key={post.slug} href={`/blog/${post.slug}`} index={i} label={post.title}>
              <CardHeader>
                <CardTitle style={{ viewTransitionName: `post-title-${post.slug}` }}>{post.title}</CardTitle>
                <CardDescription className="truncate">{post.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardGroup>
        <Link
          href="/blog"
          className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          查看全部 →
        </Link>
      </section>

      <section className="mt-16 md:mt-32">
        <span className="mb-5 block font-medium">Project</span>
        <CardGroup separated className="-mx-4 gap-0">
          {projects.map((project, i) => (
            <Card
              key={project.name}
              href={project.repo}
              external
              index={i}
              label={project.name}
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="truncate">{project.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardGroup>
      </section>

      <section className="mt-16 md:mt-32">
        <span className="mb-5 block font-medium">Friend</span>
        <div className="flex gap-3">
          {friends.map((friend) => (
            <Tooltip key={friend.link} content={friend.name} side="top">
              <a
                href={friend.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={friend.name}
              >
                <Image
                  src={friend.favicon}
                  width={48}
                  height={48}
                  alt={friend.name}
                  className="rounded-full transition-transform hover:scale-105"
                />
              </a>
            </Tooltip>
          ))}
        </div>
      </section>
    </>
  )
}
