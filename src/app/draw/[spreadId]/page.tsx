"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shuffle, RotateCcw, Sparkles, Heart, Briefcase, Sun, HelpCircle } from "lucide-react"

interface TarotCard {
  id: string
  name: string
  nameEn: string
  number: number
  type: "MAJOR_ARCANA" | "MINOR_ARCANA"
  suit?: "WANDS" | "CUPS" | "SWORDS" | "PENTACLES"
  image: string
  isRevealed: boolean
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
  card?: TarotCard
}

interface Spread {
  id: string
  name: string
  description: string
  cardCount: number
  category: string
  difficulty: string
  positions: Array<{
    name: string
    meaning: string
  }>
}

const CardComponent = ({ card, position, onCardClick, isRevealing }: { card: TarotCard; position: SpreadPosition; onCardClick: () => void; isRevealing?: boolean }) => {
  return (
    <div className="relative cursor-pointer group" onClick={onCardClick}>
      <div className={`w-40 h-60 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white/30 mystical-glow hover:scale-105 transition-all duration-300 hover:shadow-3xl ${isRevealing ? 'animate-card-flip' : ''}`}>
        {card.isRevealed ? (
          <div className="relative w-full h-full">
            <img 
              src={card.image} 
              alt={card.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center text-white font-bold text-lg">
                    <div class="text-center p-4">
                      <div class="text-sm mb-2">${card.nameEn}</div>
                      <div class="text-lg">${card.name}</div>
                      <div class="text-xs text-[#E3C565] mt-2">图片加载失败</div>
                    </div>
                  </div>
                `
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="text-white text-sm font-medium text-center">
                <div className="text-[#E3C565]">{card.nameEn}</div>
                <div className="text-xs">{card.name}</div>
              </div>
            </div>
            {card.isReversed && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                逆位
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center border-2 border-[#E3C565]/30">
            <div className="text-center text-white">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#E3C565]" />
              <div className="text-sm text-[#AAAAAA]">点击翻牌</div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-[#FFFFFF] mb-1">{position.name}</div>
        <div className="text-sm text-[#AAAAAA] leading-relaxed">{position.meaning}</div>
      </div>
    </div>
  )
}

export default function DrawPage() {
  const params = useParams()
  const router = useRouter()
  const spreadId = params.spreadId as string

  const [spread, setSpread] = useState<Spread | null>(null)
  const [positions, setPositions] = useState<SpreadPosition[]>([])
  const [deck, setDeck] = useState<TarotCard[]>([])
  const [isShuffling, setIsShuffling] = useState(false)
  const [drawnCards, setDrawnCards] = useState(0)
  const [question, setQuestion] = useState("")
  const [readingStyle, setReadingStyle] = useState<"gentle" | "spiritual" | "direct">("gentle")
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingPosition, setDrawingPosition] = useState<number | null>(null)
  const [cardRevealing, setCardRevealing] = useState<number | null>(null)

  const spreads: Record<string, Spread> = {
    "single-card": {
      id: "single-card",
      name: "单张牌阵",
      description: "简单直接的每日指引",
      cardCount: 1,
      category: "日常指引",
      difficulty: "简单",
      positions: [
        { name: "今日指引", meaning: "代表今天的能量和给你的建议" }
      ]
    },
    "three-card": {
      id: "three-card",
      name: "三张牌阵",
      description: "过去-现在-未来的经典牌阵",
      cardCount: 3,
      category: "综合分析",
      difficulty: "简单",
      positions: [
        { name: "过去", meaning: "影响当前情况的基础和根源" },
        { name: "现在", meaning: "当前的状况和挑战" },
        { name: "未来", meaning: "可能的发展结果和建议" }
      ]
    },
    "love-spread": {
      id: "love-spread",
      name: "爱情指引牌阵",
      description: "深入探索爱情关系",
      cardCount: 3,
      category: "爱情",
      difficulty: "中等",
      positions: [
        { name: "你的感受", meaning: "你在这段关系中的真实想法" },
        { name: "对方的感受", meaning: "对方在这段关系中的想法" },
        { name: "关系发展", meaning: "关系的未来走向和建议" }
      ]
    },
    "career-spread": {
      id: "career-spread",
      name: "事业发展牌阵",
      description: "分析职业发展路径",
      cardCount: 4,
      category: "事业",
      difficulty: "中等",
      positions: [
        { name: "当前状况", meaning: "你现在的工作状态" },
        { name: "挑战", meaning: "面临的主要困难和挑战" },
        { name: "优势", meaning: "你的核心优势和机会" },
        { name: "建议", meaning: "未来发展的最佳方向" }
      ]
    }
  }

  // 生成塔罗牌数据
  const generateTarotDeck = (): TarotCard[] => {
    const majorArcana = [
      { 
        name: "愚者", nameEn: "The Fool", number: 0, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "新的开始、自由、冒险、纯真、潜力",
        reversedMeaning: "鲁莽、冲动、愚蠢、错失机会",
        loveMeaning: "新的恋情、自由恋爱、不受束缚",
        careerMeaning: "新的职业机会、创业、转行",
        healthMeaning: "活力充沛、新的健康计划",
        image: "/cards/major/0.jpg"
      },
      { 
        name: "魔术师", nameEn: "The Magician", number: 1, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "创造力、技能、意志力、新的开始",
        reversedMeaning: "操纵、欺骗、缺乏自信、错失机会",
        loveMeaning: "吸引力、魅力、主动追求",
        careerMeaning: "创业机会、技能展示、领导力",
        healthMeaning: "活力充沛、自我疗愈能力",
        image: "/cards/major/1.jpg"
      },
      { 
        name: "女祭司", nameEn: "The High Priestess", number: 2, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "直觉、内在智慧、神秘、潜意识",
        reversedMeaning: "忽视直觉、秘密、表面信息",
        loveMeaning: "深层连接、精神恋爱、直觉指引",
        careerMeaning: "研究、分析、需要耐心观察",
        healthMeaning: "关注内在健康、心理平衡",
        image: "/cards/major/2.jpg"
      },
      { 
        name: "皇后", nameEn: "The Empress", number: 3, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "丰饶、创造力、母性、 nurturing",
        reversedMeaning: "依赖、创造力阻塞、过度保护",
        loveMeaning: "稳定关系、怀孕、家庭和谐",
        careerMeaning: "创意工作、艺术、团队合作",
        healthMeaning: "身体健康、生育能力",
        image: "/cards/major/3.jpg"
      },
      { 
        name: "皇帝", nameEn: "The Emperor", number: 4, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "权威、结构、稳定、父亲形象",
        reversedMeaning: "专制、僵化、滥用权力",
        loveMeaning: "稳定关系、传统价值观",
        careerMeaning: "领导地位、管理、建立秩序",
        healthMeaning: "身体力量、耐力、规律生活",
        image: "/cards/major/4.jpg"
      },
      { 
        name: "恋人", nameEn: "The Lovers", number: 6, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "爱情、和谐、关系、选择",
        reversedMeaning: "关系破裂、错误选择、不和谐",
        loveMeaning: "深刻连接、灵魂伴侣、重要选择",
        careerMeaning: "合作关系、重要决策、价值观对齐",
        healthMeaning: "身心平衡、和谐治疗",
        image: "/cards/major/6.jpg"
      },
      { 
        name: "战车", nameEn: "The Chariot", number: 7, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "胜利、决心、前进、控制",
        reversedMeaning: "失控、缺乏方向、内在冲突",
        loveMeaning: "关系中的竞争、需要平衡",
        careerMeaning: "职业停滞、需要重新定位",
        healthMeaning: "能量失衡、需要调整",
        image: "/cards/major/7.jpg"
      },
      { 
        name: "力量", nameEn: "Strength", number: 8, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "勇气、耐心、内在力量、自控",
        reversedMeaning: "软弱、缺乏自信、怀疑",
        loveMeaning: "情感力量、包容、理解",
        careerMeaning: "克服困难、领导力、坚持",
        healthMeaning: "恢复力、内在疗愈",
        image: "/cards/major/8.jpg"
      },
      { 
        name: "隐士", nameEn: "The Hermit", number: 9, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "独处、内省、智慧、寻求真理",
        reversedMeaning: "孤立、孤独、退缩",
        loveMeaning: "需要空间、自我反思",
        careerMeaning: "研究、独立工作、深度思考",
        healthMeaning: "休息、恢复、内在治疗",
        image: "/cards/major/9.jpg"
      },
      { 
        name: "命运之轮", nameEn: "Wheel of Fortune", number: 10, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "命运、变化、周期、好运",
        reversedMeaning: "厄运、阻力、停滞",
        loveMeaning: "关系变化、命运安排",
        careerMeaning: "职业转变、机遇、命运转折",
        healthMeaning: "健康周期、变化期",
        image: "/cards/major/10.jpg"
      },
      { 
        name: "正义", nameEn: "Justice", number: 11, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "公平、真相、平衡、 karma",
        reversedMeaning: "不公正、偏见、失衡",
        loveMeaning: "公平关系、 karma、真相",
        careerMeaning: "法律事务、公平决策",
        healthMeaning: "平衡、公正对待身体",
        image: "/cards/major/11.jpg"
      },
      { 
        name: "死神", nameEn: "Death", number: 13, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "转变、结束、新生、重生",
        reversedMeaning: "抗拒变化、停滞、恐惧",
        loveMeaning: "关系结束、新的开始",
        careerMeaning: "职业转变、结束旧项目",
        healthMeaning: "康复、生活方式改变",
        image: "/cards/major/13.jpg"
      },
      { 
        name: "节制", nameEn: "Temperance", number: 14, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "平衡、和谐、耐心、中庸",
        reversedMeaning: "失衡、极端、不和谐",
        loveMeaning: "和谐关系、平衡付出",
        careerMeaning: "团队合作、平衡工作生活",
        healthMeaning: "身心平衡、适度生活",
        image: "/cards/major/14.jpg"
      },
      { 
        name: "恶魔", nameEn: "The Devil", number: 15, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "束缚、诱惑、物质主义、执着",
        reversedMeaning: "解放、突破、自由",
        loveMeaning: "束缚关系、诱惑、执着",
        careerMeaning: "物质追求、工作束缚",
        healthMeaning: "不良习惯、需要解放",
        image: "/cards/major/15.jpg"
      },
      { 
        name: "塔", nameEn: "The Tower", number: 16, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "突变、灾难、觉醒、真相",
        reversedMeaning: "避免灾难、恐惧变化",
        loveMeaning: "关系破裂、突然变化",
        careerMeaning: "职业突变、意外变化",
        healthMeaning: "健康危机、突然觉醒",
        image: "/cards/major/16.jpg"
      },
      { 
        name: "星星", nameEn: "The Star", number: 17, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "希望、灵感、精神指引、疗愈",
        reversedMeaning: "绝望、失去信心、幻灭",
        loveMeaning: "理想爱情、精神连接",
        careerMeaning: "新的机遇、创意灵感",
        healthMeaning: "康复、身心平衡",
        image: "/cards/major/17.jpg"
      },
      { 
        name: "月亮", nameEn: "The Moon", number: 18, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "幻觉、恐惧、潜意识、不确定性",
        reversedMeaning: "清晰、真相、克服恐惧",
        loveMeaning: "不确定性、直觉、深层情感",
        careerMeaning: "不确定性、需要直觉",
        healthMeaning: "情绪波动、需要关注心理健康",
        image: "/cards/major/18.jpg"
      },
      { 
        name: "太阳", nameEn: "The Sun", number: 19, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "成功、快乐、活力、清晰",
        reversedMeaning: "缺乏成功、悲观、过度乐观",
        loveMeaning: "快乐关系、成功恋情",
        careerMeaning: "职业成功、认可、快乐工作",
        healthMeaning: "活力充沛、身体健康",
        image: "/cards/major/19.jpg"
      },
      { 
        name: "审判", nameEn: "Judgement", number: 20, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "重生、召唤、评估、觉醒",
        reversedMeaning: "自我怀疑、逃避评估",
        loveMeaning: "关系评估、重新开始",
        careerMeaning: "职业评估、新的开始",
        healthMeaning: "康复、健康觉醒",
        image: "/cards/major/20.jpg"
      },
      { 
        name: "世界", nameEn: "The World", number: 21, type: "MAJOR_ARCANA" as const,
        uprightMeaning: "完成、整合、成就、旅行",
        reversedMeaning: "未完成、缺乏方向",
        loveMeaning: "关系完成、和谐",
        careerMeaning: "职业成就、完成目标",
        healthMeaning: "完全康复、整体健康",
        image: "/cards/major/21.jpg"
      }
    ]

    return majorArcana.map(card => ({
      ...card,
      isRevealed: false,
      isReversed: Math.random() < 0.3
    }))
  }

  useEffect(() => {
    const currentSpread = spreads[spreadId]
    if (currentSpread) {
      setSpread(currentSpread)
      setPositions(currentSpread.positions.map((pos, index) => ({
        id: `pos-${index}`,
        name: pos.name,
        meaning: pos.meaning
      })))
    }
  }, [spreadId])

  const shuffleDeck = () => {
    if (isShuffling) return
    
    setIsShuffling(true)
    setDeck([])
    setPositions(positions.map(pos => ({ ...pos, card: undefined })))
    setDrawnCards(0)
    
    // 洗牌动画效果
    setTimeout(() => {
      const newDeck = generateTarotDeck()
      setDeck(newDeck)
      setIsShuffling(false)
    }, 2500)
  }

  const drawCard = async (positionIndex: number) => {
    if (deck.length === 0 || positions[positionIndex].card || isDrawing) return

    setIsDrawing(true)
    setDrawingPosition(positionIndex)
    
    // 抽牌动画延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const randomIndex = Math.floor(Math.random() * deck.length)
    const drawnCard = deck[randomIndex]
    
    // 先放置卡牌但未翻开
    const newDeck = deck.filter((_, index) => index !== randomIndex)
    const newPositions = [...positions]
    newPositions[positionIndex] = {
      ...newPositions[positionIndex],
      card: { ...drawnCard, isRevealed: false }
    }

    setDeck(newDeck)
    setPositions(newPositions)
    setDrawnCards(drawnCards + 1)
    
    // 翻牌动画延迟
    setCardRevealing(positionIndex)
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // 翻开卡牌
    const finalPositions = [...newPositions]
    finalPositions[positionIndex] = {
      ...finalPositions[positionIndex],
      card: { ...drawnCard, isRevealed: true }
    }
    
    setPositions(finalPositions)
    setCardRevealing(null)
    setIsDrawing(false)
    setDrawingPosition(null)
  }

  const startNewReading = () => {
    const sessionId = `session_${Date.now()}`
    const sessionData = {
      spreadName: spread?.name,
      spreadDescription: spread?.description,
      positions: positions,
      question,
      readingStyle,
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(sessionData))
    
    const queryParams = new URLSearchParams()
    if (question) queryParams.append('question', question)
    queryParams.append('readingStyle', readingStyle)
    
    router.push(`/result/${sessionId}?${queryParams.toString()}`)
  }

  if (!spread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68] flex items-center justify-center">
        <div className="text-center text-[#FFFFFF] text-xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 页面头部 */}
      <div className="bg-[#1F2235]/80 backdrop-blur-sm border-b border-[#3E1E68]/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/spreads">
              <Button variant="ghost" className="text-[#E3C565] hover:bg-[#3E1E68]/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#FFFFFF] font-playfair-display mb-1">
                {spread.name}
              </h1>
              <p className="text-[#AAAAAA]">{spread.description}</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 问题输入区域 */}
        <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 mb-8 mystical-glow">
          <CardHeader>
            <CardTitle className="text-xl text-[#FFFFFF] font-playfair-display flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-[#E3C565]" />
              你的问题是？
            </CardTitle>
            <CardDescription className="text-[#AAAAAA]">
              输入你的问题，让塔罗牌为你提供更精准的解读
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="例如：我想了解我的事业发展方向..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="bg-[#0D0B1E]/50 border-[#3E1E68]/50 text-[#FFFFFF] placeholder-[#AAAAAA] focus:border-[#E3C565]"
              />
              
              <div>
                <Label className="text-[#FFFFFF] mb-3 block">解读风格：</Label>
                <div className="flex gap-4">
                  {[
                    { value: "gentle", label: "温柔型" },
                    { value: "spiritual", label: "灵性型" },
                    { value: "direct", label: "直接型" }
                  ].map((style) => (
                    <Button
                      key={style.value}
                      variant={readingStyle === style.value ? "default" : "outline"}
                      onClick={() => setReadingStyle(style.value as any)}
                      className={readingStyle === style.value 
                        ? "bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] font-bold" 
                        : "border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20"
                      }
                    >
                      {style.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 进度显示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#FFFFFF] font-medium">抽牌进度</span>
            <span className="text-[#E3C565] font-bold">{drawnCards} / {spread.cardCount}</span>
          </div>
          <Progress 
            value={(drawnCards / spread.cardCount) * 100} 
            className="h-3 bg-[#0D0B1E]/50"
          />
        </div>

        {/* 牌位布局 */}
        <div className="mb-8">
          <div className={`grid gap-8 justify-center ${
            spread.cardCount === 1 ? 'grid-cols-1' :
            spread.cardCount === 3 ? 'grid-cols-3' :
            spread.cardCount === 4 ? 'grid-cols-2' :
            'grid-cols-1'
          }`}>
            {positions.map((position, index) => (
              <div key={position.id} className="flex flex-col items-center">
                {position.card ? (
                  <CardComponent 
                    card={position.card} 
                    position={position} 
                    onCardClick={() => {}}
                    isRevealing={cardRevealing === index}
                  />
                ) : (
                  <div 
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      isDrawing && drawingPosition === index ? 'scale-110' : ''
                    } ${isDrawing && drawingPosition !== index ? 'opacity-50' : ''}`}
                    onClick={() => drawCard(index)}
                  >
                    <div className={`w-40 h-60 bg-[#1F2235]/50 border-2 border-dashed border-[#3E1E68]/50 rounded-xl flex items-center justify-center hover:border-[#E3C565] transition-all duration-300 hover:bg-[#3E1E68]/30 ${
                      isDrawing && drawingPosition === index ? 'animate-pulse border-[#E3C565] bg-[#3E1E68]/50' : ''
                    }`}>
                      <div className="text-center text-[#AAAAAA]">
                        <Sparkles className={`w-12 h-12 mx-auto mb-3 ${
                          isDrawing && drawingPosition === index ? 'animate-spin text-[#E3C565]' : 'opacity-50'
                        }`} />
                        <div className="text-sm">
                          {isDrawing && drawingPosition === index ? '抽牌中...' : '点击抽牌'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-lg font-semibold text-[#FFFFFF] mb-1">{position.name}</div>
                      <div className="text-sm text-[#AAAAAA] leading-relaxed">{position.meaning}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={shuffleDeck}
            disabled={isShuffling || isDrawing}
            className={`bg-[#3E1E68] hover:bg-[#4A2878] text-[#FFFFFF] font-semibold px-8 py-3 mystical-glow transition-all duration-300 ${
              isShuffling ? 'animate-pulse' : ''
            }`}
          >
            <Shuffle className={`w-5 h-5 mr-2 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? '洗牌中...' : '开始洗牌'}
          </Button>
          
          <Button
            onClick={() => {
              setPositions(positions.map(pos => ({ ...pos, card: undefined })))
              setDrawnCards(0)
              setDeck([])
            }}
            disabled={isShuffling || isDrawing}
            className="bg-gradient-to-r from-[#4A2878] to-[#3E1E68] hover:from-[#5A3288] hover:to-[#4E2878] text-[#E3C565] font-semibold px-8 py-3 border-2 border-[#E3C565]/30 mystical-glow transition-all duration-300 hover:scale-105 hover:border-[#E3C565]/50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            重新开始
          </Button>
          
          {drawnCards === spread.cardCount && (
            <Button
              onClick={startNewReading}
              className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold px-8 py-3 mystical-glow transition-all duration-300 hover:scale-105"
            >
              查看解读结果
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}