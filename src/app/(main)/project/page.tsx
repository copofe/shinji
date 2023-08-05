const projects = [
  {
    name: 'Rubbing',
    repo: 'https://github.com/copofe/rubbing',
    description: 'cross platform(web and miniprogram) canvas draw tool.',
  },
  {
    name: 'Arknights',
    repo: 'https://github.com/copofe/arknights',
    description: '明日方舟合成玉可挖掘计算及自然增长预测',
  },
]

export default async function Project() {
  return (
    <div className="flex flex-col items-center px-4 lg:px-8">
      <div className="w-full lg:max-w-[72em] py-8 lg:py-16">
        <div className="text-2xl font-semibold mb-4">我的一些小项目</div>
        <div className="mb-16 text-base">
          一些是为了学习，一些是纯粹的 just for fun，
          但大多数都放不上台面……这里简单放几个没弃坑的。
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {projects.map((project) => {
            return (
              <div key={project.name} className="mb-8">
                <div className="text-base mb-4 font-semibold">
                  {project.name}
                </div>
                <div className="text-sm mb-2 h-[4.2em] line-clamp-3">{project.description}</div>
                <a
                  className="text-xs text-secondary-foreground"
                  href={project.repo}
                >
                  Github
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
