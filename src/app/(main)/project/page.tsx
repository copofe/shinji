import PageTransition from '::/components/PageTransition'

const projects = [
  {
    name: 'Rubbing',
    repo: 'https://github.com/copofe/rubbing',
    description: 'cross platform(web and miniprogram) canvas draw tool.',
  },
  {
    name: 'Arknights',
    repo: 'https://github.com/copofe/arknights',
    description: '明日方舟合成玉可挖掘数量计算及自然增长预测。',
  },
  {
    name: 'Frontend Clean Architecture',
    repo: 'https://github.com/copofe/frontend-clean-architecture',
    description: '基于整洁架构理论设计的前端项目模板。',
  },
  {
    name: 'Antdv-pro',
    repo: 'https://github.com/copofe/antdv-pro',
    description: 'fork 自 antdv-pro 项目，做了一部分修改和简化',
  },
]

export default async function Project() {
  return (
    <PageTransition className="items-center px-4 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-[80ch]">
        <div className="text-2xl mb-4">我的一些小项目</div>
        <div className="mb-16 text-base">
          一些是为了学习，一些是纯粹的 just for fun，
          但大多数都放不上台面……这里简单放几个没弃坑的。
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => {
            return (
              <div key={project.name}>
                <div className="text-base mb-2">
                  {project.name}
                </div>
                <div className="text-sm mb-3 h-[2.8em] line-clamp-2">
                  {project.description}
                </div>
                <a
                  className="text-xs text-secondary-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
