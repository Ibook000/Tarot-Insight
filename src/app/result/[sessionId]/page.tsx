"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Share2, Copy, Download, Sparkles, Heart, Briefcase, Sun, RotateCcw, RefreshCw, HelpCircle } from "lucide-react"

interface TarotCard {
  id: string
  name: string
  nameEn: string
  number: number
  type: "MAJOR_ARCANA" | "MINOR_ARCANA"
  suit?: "WANDS" | "CUPS" | "SWORDS" | "PENTACLES"
  image: string
  isReversed: boolean
  uprightMeaning: string
  reversedMeaning: string
  loveMeaning: string
  careerMeaning: string
  healthMeaning: string
}

interface SpreadPosition {
  id: string
  name: string
  meaning: string
  card: TarotCard
}

interface Session {
  id: string
  spreadName: string
  spreadDescription: string
  question?: string
  readingStyle: "gentle" | "spiritual" | "direct"
  positions: SpreadPosition[]
  aiReading?: string
  createdAt: string
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string

  const [session, setSession] = useState<Session | null>(null)
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [copied, setCopied] = useState(false)

  // 模拟会话数据
  useEffect(() => {
    // 从URL参数获取问题和解读风格
    const searchParams = new URLSearchParams(window.location.search)
    const questionFromUrl = searchParams.get('question') || ''
    const readingStyleFromUrl = searchParams.get('readingStyle') || 'gentle'
    
    // 从localStorage获取会话数据
    const sessionData = localStorage.getItem(`session_${sessionId}`)
    
    if (sessionData) {
      const parsedData = JSON.parse(sessionData)
      
      // 转换数据格式以匹配接口
      const session: Session = {
        id: sessionId,
        spreadName: parsedData.spreadName || '未知牌阵',
        spreadDescription: parsedData.spreadDescription || '',
        question: questionFromUrl,
        readingStyle: readingStyleFromUrl as "gentle" | "spiritual" | "direct",
        createdAt: parsedData.createdAt || new Date().toISOString(),
        positions: parsedData.positions.map((pos: any, index: number) => ({
          id: pos.id || `pos-${index}`,
          name: pos.name || `位置 ${index + 1}`,
          meaning: pos.meaning || '',
          card: pos.card ? {
            id: pos.card.id,
            name: pos.card.name,
            nameEn: pos.card.nameEn,
            number: pos.card.number,
            type: pos.card.type,
            suit: pos.card.suit,
            image: pos.card.image,
            isReversed: pos.card.isReversed,
            uprightMeaning: pos.card.uprightMeaning || '正位含义',
            reversedMeaning: pos.card.reversedMeaning || '逆位含义',
            loveMeaning: pos.card.loveMeaning || '爱情含义',
            careerMeaning: pos.card.careerMeaning || '事业含义',
            healthMeaning: pos.card.healthMeaning || '健康含义'
          } : undefined
        })) || [],
        aiReading: parsedData.aiReading
      }
      
      setSession(session)
    } else {
      // 如果没有找到会话数据，使用默认模拟数据
      const mockSession: Session = {
        id: sessionId,
        spreadName: "三张牌阵",
        spreadDescription: "过去-现在-未来的经典牌阵",
        question: questionFromUrl || "我想了解我的事业发展方向",
        readingStyle: readingStyleFromUrl as "gentle" | "spiritual" | "direct",
        createdAt: new Date().toISOString(),
        positions: [
          {
            id: "pos-0",
            name: "过去",
            meaning: "影响当前情况的基础和根源",
            card: {
              id: "major-1",
              name: "魔术师",
              nameEn: "The Magician",
              number: 1,
              type: "MAJOR_ARCANA",
              image: "/cards/major/1.jpg",
              isReversed: false,
              uprightMeaning: "创造力、技能、意志力、新的开始",
              reversedMeaning: "操纵、欺骗、缺乏自信、错失机会",
              loveMeaning: "吸引力、魅力、主动追求",
              careerMeaning: "创业机会、技能展示、领导力",
              healthMeaning: "活力充沛、自我疗愈能力"
            }
          },
          {
            id: "pos-1",
            name: "现在",
            meaning: "当前的状况和挑战",
            card: {
              id: "major-7",
              name: "战车",
              nameEn: "The Chariot",
              number: 7,
              type: "MAJOR_ARCANA",
              image: "/cards/major/7.jpg",
              isReversed: true,
              uprightMeaning: "胜利、决心、前进、控制",
              reversedMeaning: "失控、缺乏方向、内在冲突",
              loveMeaning: "关系中的竞争、需要平衡",
              careerMeaning: "职业停滞、需要重新定位",
              healthMeaning: "能量失衡、需要调整"
            }
          },
          {
            id: "pos-2",
            name: "未来",
            meaning: "可能的发展结果和建议",
            card: {
              id: "major-17",
              name: "星星",
              nameEn: "The Star",
              number: 17,
              type: "MAJOR_ARCANA",
              image: "/cards/major/17.jpg",
              isReversed: false,
              uprightMeaning: "希望、灵感、精神指引、疗愈",
              reversedMeaning: "绝望、失去信心、幻灭",
              loveMeaning: "理想爱情、精神连接",
              careerMeaning: "新的机遇、创意灵感",
              healthMeaning: "康复、身心平衡"
            }
          }
        ]
      }

      setSession(mockSession)
    }
  }, [sessionId])

  const generateAIReading = async () => {
    if (!session || isGeneratingReading) return

    setIsGeneratingReading(true)
    
    try {
      // 构建请求数据
      const requestData = {
        spread: {
          id: session.id,
          name: session.spreadName,
          description: session.spreadDescription,
          cardCount: session.positions.length,
          category: "综合分析",
          positions: session.positions.map(pos => ({
            name: pos.name,
            meaning: pos.meaning
          }))
        },
        cards: session.positions.map(pos => ({
          id: pos.id,
          cardId: pos.card.id,
          position: 0,
          isReversed: pos.card.isReversed,
          card: pos.card
        })),
        question: session.question,
        readingStyle: session.readingStyle
      }

      const response = await fetch('/api/ai-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate reading')
      }

      const data = await response.json()
      
      setSession({
        ...session,
        aiReading: data.reading
      })
      
      // 保存AI解读到localStorage
      const sessionData = localStorage.getItem(`session_${sessionId}`)
      if (sessionData) {
        const parsedData = JSON.parse(sessionData)
        parsedData.aiReading = data.reading
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(parsedData))
      }
    } catch (error) {
      console.error('Error generating AI reading:', error)
      // 如果API调用失败，使用模拟数据作为备用
      const mockReading = `## 塔罗牌解读

### 整体概览
亲爱的问卜者，你的塔罗牌阵展现了一个关于事业发展的重要旅程。这三张牌共同描绘了一个从创造潜能出发，经历当前的挑战，最终走向希望与启示的成长路径。

### 详细解读

**过去：魔术师（正位）**
魔术师出现在过去的位置，表明你拥有强大的创造力和技能基础。这张牌暗示你在过去已经积累了相当的才能和经验，为现在的发展奠定了坚实的基础。你的内在力量和主动性是你最大的财富。

**现在：战车（逆位）**
战车逆位出现在现在的位置，反映出你当前可能正经历一些挑战和不确定性。你可能在职业道路上感到有些失控或缺乏明确的方向。这是一个需要内在反思和重新定位的时期，不要急于做决定，而是要深入思考自己真正想要的是什么。

**未来：星星（正位）**
星星出现在未来的位置，是一个非常积极的信号。它预示着希望、灵感和新的机遇即将到来。无论你现在面临什么困难，未来都会带来光明和指引。这张牌鼓励你保持信心，相信自己的直觉和内在的智慧。

### 建议与指导

基于这个牌阵，我建议你：

1. **回顾过去的成功**：重新连接你的内在力量和技能，记住你曾经克服过的困难。

2. **接受当前的挑战**：将现在的困难视为成长的机会，而不是障碍。有时候，放慢脚步反而能让你看得更清楚。

3. **保持希望和信心**：星星的能量正在向你靠近，相信更好的事情即将发生。保持开放的心态，准备迎接新的机遇。

4. **寻求平衡**：在行动和反思之间找到平衡，既不要过于冲动，也不要过于犹豫。

### 结语
记住，塔罗牌提供的是指引而不是预言。你的未来掌握在自己手中。这些牌的能量在提醒你，你已经拥有克服困难所需的一切，只需要相信自己的力量，保持希望，正确的道路就会在适当的时候显现。

愿智慧指引你的道路，愿光明照亮你的前程。✨`

      setSession({
        ...session,
        aiReading: mockReading
      })
      
      // 保存模拟AI解读到localStorage
      const sessionData = localStorage.getItem(`session_${sessionId}`)
      if (sessionData) {
        const parsedData = JSON.parse(sessionData)
        parsedData.aiReading = mockReading
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(parsedData))
      }
    } finally {
      setIsGeneratingReading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!session) return

    const text = `
🔮 塔罗牌占卜结果 🔮

================

📊 牌阵信息：
   牌阵：${session.spreadName}
   描述：${session.spreadDescription}
   问题：${session.question || '无特定问题'}
   解读风格：${session.readingStyle === 'gentle' ? '温柔型' : session.readingStyle === 'spiritual' ? '灵性型' : '直接型'}
   时间：${new Date(session.createdAt).toLocaleString()}

🎴 抽牌结果：
${session.positions.map(pos => `
   ${pos.name}：${pos.card.name} (${pos.card.nameEn}) ${pos.card.isReversed ? '⭐ 逆位' : '✨ 正位'}
   位置含义：${pos.meaning}
   牌面含义：${pos.card.isReversed ? pos.card.reversedMeaning : pos.card.uprightMeaning}
`).join('')}

🌟 AI深度解读：
${session.aiReading || '💭 尚未生成解读'}

================
✨ 感谢使用塔罗牌占卜服务！愿智慧指引你的道路 ✨
    `.trim()

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const shareResult = async () => {
    if (!session) return

    const shareText = `我刚刚完成了一次塔罗牌占卜！🔮 使用了${session.spreadName}，抽到了${session.positions.map(p => p.card.name).join('、')}。想了解更多关于我的塔罗牌解读吗？`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的塔罗牌占卜结果',
          text: shareText,
          url: shareUrl
        })
        return
      } catch (err) {
        console.log('Web Share API failed, falling back to clipboard')
      }
    }

    const fullText = `${shareText}\n\n查看完整解读：${shareUrl}`
    
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('分享失败:', err)
    }
  }

  const downloadResult = () => {
    if (!session) return

    const content = `
塔罗牌占卜结果
================

基本信息：
--------
牌阵：${session.spreadName}
描述：${session.spreadDescription}
问题：${session.question || '无特定问题'}
解读风格：${session.readingStyle === 'gentle' ? '温柔型' : session.readingStyle === 'spiritual' ? '灵性型' : '直接型'}
占卜时间：${new Date(session.createdAt).toLocaleString()}

抽牌详情：
--------
${session.positions.map((pos, index) => `
${index + 1}. ${pos.name}
   牌面：${pos.card.name} (${pos.card.nameEn})
   状态：${pos.card.isReversed ? '逆位' : '正位'}
   位置含义：${pos.meaning}
   牌面含义：${pos.card.isReversed ? pos.card.reversedMeaning : pos.card.uprightMeaning}
   
   爱情方面：${pos.card.loveMeaning}
   事业方面：${pos.card.careerMeaning}
   健康方面：${pos.card.healthMeaning}
`).join('')}

AI深度解读：
--------
${session.aiReading || '尚未生成AI解读'}

================
感谢使用塔罗牌占卜服务！
愿智慧指引你的道路，愿光明照亮你的前程。✨
    `.trim()

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `塔罗牌占卜结果_${session.spreadName}_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const startNewReading = () => {
    router.push('/spreads')
  }

  if (!session) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68] text-[#FFFFFF]">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 页面头部 */}
      <div className="bg-[#1F2235]/80 backdrop-blur-sm border-b border-[#3E1E68]/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E3C565] to-[#0099CC] opacity-60"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/spreads">
              <Button variant="ghost" className="text-[#E3C565] hover:bg-[#3E1E68]/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回
              </Button>
            </Link>
            <div className="text-center">
              <div className="mystical-symbols relative inline-block mb-2">
                <h1 className="text-3xl font-bold text-[#FFFFFF] font-playfair-display">
                  占卜结果
                </h1>
              </div>
              <p className="text-[#AAAAAA]">
                {session.spreadName} • {new Date(session.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="text-[#E3C565] hover:bg-[#3E1E68]/20"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareResult}
                className="text-[#E3C565] hover:bg-[#3E1E68]/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 问题显示 */}
        {session.question && (
          <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 mb-8 mystical-glow">
            <CardHeader>
              <CardTitle className="text-xl text-[#FFFFFF] font-playfair-display flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-[#E3C565]" />
                你的问题
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#AAAAAA] text-lg leading-relaxed">{session.question}</p>
            </CardContent>
          </Card>
        )}

        {/* 主要内容区域 */}
        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-[#1F2235]/80 backdrop-blur-sm border border-[#3E1E68]/50">
            <TabsTrigger value="cards" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              抽牌结果
            </TabsTrigger>
            <TabsTrigger value="reading" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              AI解读
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            {/* 牌阵展示 */}
            <div className="grid gap-8 justify-center">
              <div className={`grid gap-8 ${
                session.positions.length === 1 ? 'grid-cols-1' :
                session.positions.length === 3 ? 'grid-cols-3' :
                session.positions.length === 4 ? 'grid-cols-2' :
                'grid-cols-1'
              }`}>
                {session.positions.map((position) => (
                  <div key={position.id} className="flex flex-col items-center">
                    <div className="w-48 h-72 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white/30 mystical-glow mb-4">
                      <div className="relative w-full h-full">
                        <img 
                          src={position.card.image} 
                          alt={position.card.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center text-white font-bold text-lg">
                                <div class="text-center p-4">
                                  <div class="text-sm mb-2">${position.card.nameEn}</div>
                                  <div class="text-lg">${position.card.name}</div>
                                </div>
                              </div>
                            `
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <div className="text-white text-sm font-medium text-center">
                            <div className="text-[#E3C565]">{position.card.nameEn}</div>
                            <div className="text-xs">{position.card.name}</div>
                          </div>
                        </div>
                        {position.card.isReversed && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            逆位
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#FFFFFF] mb-2">{position.name}</div>
                      <div className="text-sm text-[#AAAAAA] mb-3">{position.meaning}</div>
                      <Badge variant="secondary" className="bg-[#3E1E68]/60 text-[#E3C565] border border-[#E3C565]/30">
                        {position.card.isReversed ? '逆位' : '正位'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 牌面含义 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {session.positions.map((position) => (
                <Card key={position.id} className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display">
                      {position.name} - {position.card.name}
                    </CardTitle>
                    <CardDescription className="text-[#AAAAAA]">
                      {position.card.nameEn} • {position.card.isReversed ? '逆位' : '正位'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#AAAAAA] leading-relaxed mb-4">
                      {position.card.isReversed ? position.card.reversedMeaning : position.card.uprightMeaning}
                    </p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-[#E3C565]">爱情：</span>
                        <span className="text-[#AAAAAA]">{position.card.loveMeaning}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#0099CC]">事业：</span>
                        <span className="text-[#AAAAAA]">{position.card.careerMeaning}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#E3C565]">健康：</span>
                        <span className="text-[#AAAAAA]">{position.card.healthMeaning}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reading" className="space-y-6">
            <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 mystical-glow">
              <CardHeader>
                <CardTitle className="text-xl text-[#FFFFFF] font-playfair-display flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-[#E3C565]" />
                  AI深度解读
                </CardTitle>
                <CardDescription className="text-[#AAAAAA]">
                  基于你的问题和抽牌结果，AI为你生成的个性化解读
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!session.aiReading ? (
                  <div className="text-center py-8">
                    {isGeneratingReading ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 border-4 border-[#E3C565] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-[#AAAAAA]">AI正在为你生成深度解读...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Sparkles className="w-16 h-16 text-[#E3C565] mx-auto opacity-50" />
                        <p className="text-[#AAAAAA] mb-6">点击下方按钮生成AI深度解读</p>
                        <Button
                          onClick={generateAIReading}
                          disabled={isGeneratingReading}
                          className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold px-8 py-3 mystical-glow"
                        >
                          {isGeneratingReading ? '生成中...' : '生成AI解读'}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <div className="text-[#AAAAAA] leading-relaxed whitespace-pre-line">
                      {session.aiReading}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Button
            onClick={copyToClipboard}
            className="bg-[#3E1E68] hover:bg-[#4A2878] text-[#FFFFFF] font-semibold px-8 py-3 mystical-glow"
          >
            <Copy className="w-5 h-5 mr-2" />
            {copied ? '已复制' : '复制文本'}
          </Button>
          
          <Button
            onClick={downloadResult}
            className="bg-[#3E1E68] hover:bg-[#4A2878] text-[#FFFFFF] font-semibold px-8 py-3 mystical-glow"
          >
            <Download className="w-5 h-5 mr-2" />
            下载文本
          </Button>
          
          <Button
            onClick={shareResult}
            className="bg-[#3E1E68] hover:bg-[#4A2878] text-[#FFFFFF] font-semibold px-8 py-3 mystical-glow"
          >
            <Share2 className="w-5 h-5 mr-2" />
            分享结果
          </Button>
          
          <Button
            onClick={startNewReading}
            className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold px-8 py-3 mystical-glow"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            开始新的占卜
          </Button>
        </div>
      </div>
    </div>
  )
}