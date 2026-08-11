import PageTransition from '::/components/PageTransition'
import Image from 'next/image'

const friends = [
  {
    name: '核子束 @shustrovsky',
    link: 'https://imshu.cc/',
    favicon: '/imshu.cc.jpg',
  },
]

export default function Friend() {
  return (
    <PageTransition className="px-4 md:px-8 py-8 md:py-12 items-center">
      <ul className="w-full max-w-[80ch] flex flex-col gap-4">
        {friends.map((friend) => {
          return (
            <li key={friend.link}>
              <a
                href={friend.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[hsl(var(--foreground-secondary))] hover:text-foreground transition-colors"
              >
                <Image
                  src={friend.favicon}
                  width={48}
                  height={48}
                  alt={friend.name}
                  className="rounded-full"
                />
                <span className="text-base">{friend.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </PageTransition>
  )
}
