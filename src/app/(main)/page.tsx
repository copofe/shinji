import { SocialLink } from '::/components/SocialLink'

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-4xl font-bold tracking-tigh mb-8">
          <span className="group">
            <span className="font-mono">&lt;</span>Developer
            <span className="font-mono">/&gt;</span>
          </span>
        </h1>
        <div className="flex justify-around">
          <SocialLink platform="github" href="https://github.com/copofe" />
          <SocialLink platform="twitter" href="https://twitter.com/Shinji_Zl" />
          <SocialLink
            platform="bilibili"
            href="https://space.bilibili.com/3273190"
          />
          <SocialLink platform="mail" href="mailto:me@shinji.me" />
        </div>
      </div>
    </div>
  )
}
