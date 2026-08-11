export type Project = {
  name: string
  repo: string
  description: string
}

export const projects: Project[] = [
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
