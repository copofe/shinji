# 领域词汇表

本文件为架构决策提供共享语言。术语来自 `/codebase-design` 的架构词汇(模块、接口、深度、接缝、适配器、杠杆、局部性)与本项目领域。ADR 在 `docs/adr/`,本文件不记录决定——只命名概念。

## 架构词汇(简表)

- **模块(module)** —— 有明确接口与实现的单元。不是"组件""服务"。
- **深度(depth)** —— 接口小、实现丰富 = 深;接口与实现一样宽 = 浅。
- **接缝(seam)** —— 模块之间的边界。不是"边界""layer"。
- **杠杆(leverage)** —— 一个接口,N 个调用点。
- **局部性(locality)** —— 相关逻辑聚于一处。

## 领域概念

### post 访问模块

`src/db/post.ts` —— post 聚合的数据访问模块。以领域概念命名,纠正了原 `queries.ts`(实为投影字符串)的名不副实。确立了 `src/db/` 的模式:**一聚合一模块**,以概念命名;`types.ts` 持 schema,聚合模块持访问函数与派生类型。

接口:
- `listPublished(page)` —— 已发布文章的分页列表,不含 content
- `getBySlug(slug)` —— 按 slug 取单篇,含 content;React `cache()` 包裹,请求内记忆化

派生类型:
- `Post` —— 列表/展示形态(无 content);三个展示组件(card/content/meta)共用
- `BlogPost` —— 详情形态(Post + content);content 仅在 `[slug]` 页面体的 MDX 编译处读取,不穿过展示组件

接缝背后:模块内部自取 Supabase 客户端(`createClient()`),客户端不泄漏到路由组件。投影字符串、`.eq('published')`、分页 `.range()`、`.order()`、`.maybeSingle()` 全部内化。

### renderMdx —— MDX 渲染管道

`src/libs/mdx.ts` —— 把 MDX 源码编译并运行成 React 组件的横切基础设施模块。固定配置(remark-gfm + rehype-unwrap-images + rehype-pretty-code),窄接口:`renderMdx(source) → Promise<ComponentType<MDXComponents>>`。

调用方(blog `[slug]/page.tsx`)拿到组件后,在渲染时自行注入 components 映射(`{ img: Image, Tweet }`)——组件注入是展示层职责,不穿过这个接缝。

历史:最初作为候选 #2 识别时,MDX 管道分散在 blog 与 memo 两处(两调用点 = 真实接缝)。memo 模块删除后调用点收缩为单点,形态相应调整——不做参数化(无 options),全部配置固化,避免为不存在的第二个消费者预留接口(YAGNI)。将来若出现第二个调用点且配置不同,再加 options。

### ThemeProvider —— 主题模块

`src/components/ThemeProvider.tsx` —— 主题(暗色/亮色/跟随系统)的唯一模块归宿。固化项目主题策略(attribute="class"、defaultTheme="system"、enableSystem),re-export `useTheme` 作为主题消费的统一入口。

接口:
- `<ThemeProvider>{children}</ThemeProvider>` —— 接收 children,配置已内化,调用点(app/layout.tsx)不再传主题 props
- `useTheme` —— re-export 自 next-themes;ThemeToggle、BlogPostComment 等消费者统一从此导入,不直接依赖 next-themes

历史:原为纯透传包装器(透传 next-themes 的 ThemeProviderProps,零行为),且 useTheme 被 ThemeToggle/comment 各自从 next-themes 直接取——主题概念无模块归宿、配置散在调用点。深化后吸收配置、统一接入点,通过删除测试(删则配置与 re-export 散回各处)。

### 已删除:Tweet 包装器

`src/components/Tweet.tsx` 原为 react-tweet 的纯重命名转发(文件名 Tweet / 默认导出 Twitter / 转发库的 Tweet,三方名字打架),单调用点、无配置、无横切关注点。删除:blog/[slug]/page.tsx 直接 `import { Tweet } from 'react-tweet'`。无深化价值——通过删除测试不集中复杂度(本就无复杂度可藏),删除收益是去掉一个误导性接缝与名字混乱。

### 已删除:icon-context 图标注册表

`src/libs/icon-context.tsx` 原为可替换图标基础设施(47 个 Lucide 图标 + `IconProvider` 交换整个图标集 + `useIcons()` 取全表 + `defaultIcons` re-export)。真实调用点只有两处 `useIcon("x")` / `useIcon("arrow-right")`,全在 card.tsx 内。`IconProvider` 从未挂载、`useIcons` 从未调用——一个零适配器的假想接缝。删除:card.tsx 直接 `import { X, ArrowRight, type LucideIcon } from "lucide-react"`,prop 类型从 `IconComponent` 改为 `LucideIcon`(同构:`ComponentType<{size,strokeWidth,className}>`)。删除测试通过——删则不集中复杂度(本就无复杂度可藏)。与已删除的 Tweet 包装器同形:单/双调用点的纯转发无深化价值。

### useProximityHover —— 邻近高亮 hook

`src/hooks/use-proximity-hover.ts` —— CardGroup 的邻近高亮(光标最近卡片磁吸高亮)的测量与命中模块。原返回 9 项(`activeIndex`/`setActiveIndex`/`itemRects`/`isMeasured`/`sessionRef`/`registerItem`/`remeasure`/`measureItems`/`handlers`),加独立导出 `useRegisterProximityItem`;唯一调用点(card.tsx)只用其中 5 项。

接缝背后:测量路径分两种——`measureItems()` 同步(布局 effect 在子项/几何变更后调用,要当帧 rect);`scheduleMeasurement(attempts)` 走 rAF 合并(register/unregister 与 container resize 走它,合并 AnimatePresence 重挂载的密集调用)。原 `isMeasured` 就绪态 + `remeasure` 的"先降就绪再排测量"逻辑——无调用点读取就绪态,整条就绪跟踪是无观测的死行为,一并删除。`setActiveIndex`/`remeasure`/`useRegisterProximityItem` 同为无导入者,从公开面移除。深化方向:公开面收窄、实现不变 → 更深(接口小、实现丰富)。将来若出现第二个调用点且需就绪态,再加回(同 renderMdx 的 YAGNI 理由)。


