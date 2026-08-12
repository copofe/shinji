'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  // 有来源页则回到来源页（首页进回首页、列表进回列表），否则回到首页。
  // 单凭 history.length 不可靠：新标签页里直接打开链接时，空白页也算一条
  // 记录（length=2），back() 会退回空白页。叠加 document.referrer 为空判断，
  // 可排除「无来源」场景；length>1 再挡掉「同源在新标签页打开、back 无效」。
  const goBack = () => {
    const hasOrigin = window.history.length > 1 && document.referrer !== ''
    if (hasOrigin) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowLeft size={16} strokeWidth={1.5} />
      返回
    </button>
  )
}
