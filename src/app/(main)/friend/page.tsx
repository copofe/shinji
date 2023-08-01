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
    <div className="flex justify-center p-4 lg:p-8">
      {friends.map((friend) => {
        return (
          <a href={friend.link} key={friend.link} target='_blank' className='flex flex-col items-center'>
            <Image src={friend.favicon} width={64} height={64} alt={friend.name} />
            {friend.name}
          </a>
        )
      })}
    </div>
  )
}
