// 清除 localStorage 中的主题，使每次加载都 fallback 到系统主题。
// 必须作为 server component 内联到 HTML，在 next-themes 读取前同步执行。
// next-themes v0.4 不支持关闭持久化（#295 待 v0.5 实现）。
export function NoPersistThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: 'localStorage.removeItem("theme")',
      }}
    />
  )
}
