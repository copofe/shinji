import { SocialLink } from '::/components/SocialLink'

export default function Introduction() {
  return (
    <header className="mb-16 md:mb-32 flex flex-col items-start">
      <h1 className="text-xl md:text-2xl font-medium leading-tight">
        @Shinji
      </h1>
      <div className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
        Professional Developer, Love Design. Also a gamer.
      </div>
      <div className="mt-6 flex *:mr-4">
        <SocialLink platform="github" href="https://github.com/copofe" />
        <SocialLink platform="twitter" href="https://twitter.com/Shinji_Zl" />
        <SocialLink platform="mail" href="mailto:me@shinji.me" />
      </div>
    </header>
  )
}
