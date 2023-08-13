import { SocialLink } from '::/components/SocialLink'

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="p-4 font-mono">
        <h1 className="text-4xl leading-9 lg:text-5xl font-bold tracking-tigh mb-8 flex flex-wrap items-stretch">
          <span>&lt;Introduction&nbsp;</span>
          <span className="cursor w-1 rounded bg-foreground"></span>
          <span>&nbsp;/&gt;</span>
        </h1>
        <div className="lg:max-w-[42em] text-base">
          <p>
            I am an experienced front-end developer with expertise in Vue and
            React. I have also worked with React Native. Besides my skills in
            development, I am also a design enthusiast and a passionate gamer.
          </p>
          <p className="mt-5">You can find me at the following</p>
        </div>
        <div className="flex [&>*]:mr-4 mt-4">
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
