"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Briefcase, Sun, Star, Sparkles, RotateCcw } from "lucide-react"

interface TarotCard {
  id: string
  name: string
  nameEn: string
  number: number
  type: "MAJOR_ARCANA" | "MINOR_ARCANA"
  suit?: "WANDS" | "CUPS" | "SWORDS" | "PENTACLES"
  description: string
  image: string
  uprightMeaning: string
  reversedMeaning: string
  loveMeaning: string
  careerMeaning: string
  healthMeaning: string
  keywords: string[]
  symbolism: string[]
  astrology?: string
  element?: string
  numerology?: string
}

export default function CardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cardId = params.cardId as string

  const [isReversed, setIsReversed] = useState(false)

  // 模拟塔罗牌数据
  const tarotCards: Record<string, TarotCard> = {
    "major-0": {
      id: "major-0",
      name: "愚者",
      nameEn: "The Fool",
      number: 0,
      type: "MAJOR_ARCANA",
      description: "愚者是塔罗牌中的第一张大阿尔卡那牌，编号为0。它代表着新的开始、纯真、潜力和自发性行动。愚者象征着一个人即将踏上一段新的旅程，充满未知和可能性。",
      image: "/cards/major/0.jpg",
      uprightMeaning: "新的开始、纯真、潜力、自发性行动、自由、冒险精神、乐观、信任、可能性、天真无邪",
      reversedMeaning: "鲁莽、疯狂、风险、天真、错误判断、冲动、缺乏计划、天真过度、不负责任",
      loveMeaning: "新的恋情、自由恋爱、不被束缚的关系、浪漫的开始、灵魂伴侣的相遇",
      careerMeaning: "新机会、创业、冒险精神、职业转变、新的开始、创新项目",
      healthMeaning: "活力充沛、新的健康开始、能量充沛、康复、身体活力",
      keywords: ["开始", "纯真", "潜力", "自由", "冒险", "信任", "可能性"],
      symbolism: ["白色玫瑰：纯真", "背包：积累的智慧", "小狗：忠诚和本能", "悬崖：未知", "太阳：光明和希望"],
      astrology: "天王星",
      element: "风",
      numerology: "0 - 无限可能性"
    },
    "major-1": {
      id: "major-1",
      name: "魔术师",
      nameEn: "The Magician",
      number: 1,
      type: "MAJOR_ARCANA",
      description: "魔术师是塔罗牌中的第二张大阿尔卡那牌，编号为1。它代表着创造力、技能、意志力和新的开始。魔术师象征着一个人拥有将想法转化为现实的能力。",
      image: "/cards/major/1.jpg",
      uprightMeaning: "创造力、技能、意志力、新的开始、力量、专注、显化能力、掌控力、智慧",
      reversedMeaning: "操纵、欺骗、缺乏自信、错失机会、滥用权力、技能不足、缺乏焦点",
      loveMeaning: "吸引力、魅力、主动追求、关系中的创造力、激情、灵魂连接",
      careerMeaning: "创业机会、技能展示、领导力、职业发展、创新、成功",
      healthMeaning: "活力充沛、自我疗愈能力、身体康复、能量平衡",
      keywords: ["创造", "技能", "意志力", "力量", "专注", "显化", "掌控"],
      symbolism: ["权杖：意志力", "圣杯：情感", "宝剑：思想", "星币：物质", "无限符号：无限可能性", "魔法袍：智慧"],
      astrology: "水星",
      element: "风",
      numerology: "1 - 开始和领导力"
    },
    "major-17": {
      id: "major-17",
      name: "星星",
      nameEn: "The Star",
      number: 17,
      type: "MAJOR_ARCANA",
      description: "星星是塔罗牌中的第十八张大阿尔卡那牌，编号为17。它代表着希望、灵感、精神指引和疗愈。星星象征着在黑暗中找到光明，以及宇宙的指引和保护。",
      image: "/cards/major/17.jpg",
      uprightMeaning: "希望、灵感、精神指引、疗愈、信心、平静、和谐、宇宙连接、光明",
      reversedMeaning: "绝望、失去信心、幻灭、信仰丧失、失望、缺乏希望",
      loveMeaning: "理想爱情、精神连接、灵魂伴侣、关系疗愈、和谐",
      careerMeaning: "新的机遇、创意灵感、职业指引、成功、希望",
      healthMeaning: "康复、身心平衡、疗愈、健康改善、活力恢复",
      keywords: ["希望", "灵感", "指引", "疗愈", "信心", "平静", "和谐"],
      symbolism: ["八角星：宇宙指引", "女人：灵魂", "水：情感和潜意识", "鸟：精神上升", "山：挑战", "树木：生命"],
      astrology: "水瓶座",
      element: "风",
      numerology: "17 - 精神觉醒"
    },
    "wands-1": {
      id: "wands-1",
      name: "权杖Ace",
      nameEn: "Ace of Wands",
      number: 22,
      type: "MINOR_ARCANA",
      suit: "WANDS",
      description: "权杖Ace是权杖牌组的第一张牌，代表着创造力、灵感和新的开始。它象征着火元素的原初能量，充满了激情和行动力。",
      image: "/cards/minor/1.jpg",
      uprightMeaning: "创造力、灵感、新的开始、热情、激情、行动力、创新、机会",
      reversedMeaning: "缺乏灵感、拖延、热情消退、创意阻塞、机会错失",
      loveMeaning: "激情、新的恋情、浪漫开始、吸引力、热情",
      careerMeaning: "新项目、创意灵感、创业机会、职业发展",
      healthMeaning: "活力、能量、身体健康、生命力",
      keywords: ["创造", "灵感", "热情", "行动", "机会", "激情"],
      symbolism: ["权杖：火元素", "云：潜力", "山：挑战", "手：行动", "叶子：生长"],
      element: "火",
      numerology: "1 - 开始和创造"
    }
  }

  const card = tarotCards[cardId]

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#FFFFFF] mb-4">牌面未找到</h1>
          <Link href="/cards">
            <Button className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold">
              返回牌库
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const toggleReversed = () => {
    setIsReversed(!isReversed)
  }

  const relatedCards = Object.values(tarotCards).filter(c => 
    c.id !== card.id && 
    (c.type === card.type || (card.suit && c.suit === card.suit))
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 页面头部 */}
      <div className="bg-[#1F2235]/80 backdrop-blur-sm border-b border-[#3E1E68]/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E3C565] to-[#0099CC] opacity-60"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/cards">
              <Button variant="ghost" className="text-[#E3C565] hover:bg-[#3E1E68]/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回牌库
              </Button>
            </Link>
            <div className="text-center">
              <div className="mystical-symbols relative inline-block mb-2">
                <h1 className="text-3xl font-bold text-[#FFFFFF] font-dancing-script">
                  {card.name}
                </h1>
              </div>
              <p className="text-[#AAAAAA]">
                {card.nameEn} • {card.type === "MAJOR_ARCANA" ? "大阿尔卡那" : "小阿尔卡那"}
                {card.suit && ` • ${card.suit === "WANDS" ? "权杖" : card.suit === "CUPS" ? "圣杯" : card.suit === "SWORDS" ? "宝剑" : "星币"}`}
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 牌面展示 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 牌面图像 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6 cursor-pointer">
              <div className="w-56 h-84 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white/30 mystical-glow">
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
                            ${card.type === "MAJOR_ARCANA" ? `<div class="text-xs mt-2 opacity-75">#${card.number}</div>` : ''}
                          </div>
                        </div>
                      `
                    }}
                  />
                  {isReversed && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      逆位
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              onClick={toggleReversed}
              variant="outline"
              className="mb-6 border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20 hover:text-[#FFFFFF] px-6 py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              切换正逆位
            </Button>

            {/* 关键信息 */}
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#AAAAAA]">类型：</span>
                <Badge variant="secondary" className="bg-[#3E1E68]/60 text-[#E3C565] border border-[#E3C565]/30">
                  {card.type === "MAJOR_ARCANA" ? "大阿尔卡那" : "小阿尔卡那"}
                </Badge>
              </div>
              {card.suit && (
                <div className="flex justify-between items-center">
                  <span className="text-[#AAAAAA]">花色：</span>
                  <Badge variant="outline" className="border-[#3E1E68] text-[#E3C565]">
                    {card.suit === "WANDS" ? "权杖" : card.suit === "CUPS" ? "圣杯" : card.suit === "SWORDS" ? "宝剑" : "星币"}
                  </Badge>
                </div>
              )}
              {card.astrology && (
                <div className="flex justify-between items-center">
                  <span className="text-[#AAAAAA]">星座：</span>
                  <span className="text-[#FFFFFF] font-medium">{card.astrology}</span>
                </div>
              )}
              {card.element && (
                <div className="flex justify-between items-center">
                  <span className="text-[#AAAAAA]">元素：</span>
                  <span className="text-[#FFFFFF] font-medium">{card.element}</span>
                </div>
              )}
              {card.numerology && (
                <div className="flex justify-between items-center">
                  <span className="text-[#AAAAAA]">数字学：</span>
                  <span className="text-[#FFFFFF] font-medium">{card.numerology}</span>
                </div>
              )}
            </div>
          </div>

          {/* 基本信息 */}
          <div>
            <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 mystical-glow">
              <CardHeader>
                <CardTitle className="text-xl text-[#FFFFFF] font-playfair-display">
                  牌面概述
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#AAAAAA] leading-relaxed mb-6">
                  {card.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-[#FFFFFF] mb-3">关键词：</h4>
                  <div className="flex flex-wrap gap-2">
                    {card.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="border-[#3E1E68] text-[#E3C565]">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#FFFFFF] mb-3">当前含义：</h4>
                  <div className="bg-[#3E1E68]/30 p-4 rounded-lg border border-[#3E1E68]/50">
                    <p className="text-[#AAAAAA] leading-relaxed">
                      {isReversed ? card.reversedMeaning : card.uprightMeaning}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 详细解读 */}
        <Tabs defaultValue="meanings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#1F2235]/80 backdrop-blur-sm border border-[#3E1E68]/50">
            <TabsTrigger value="meanings" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              含义解读
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              应用场景
            </TabsTrigger>
            <TabsTrigger value="symbolism" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              象征意义
            </TabsTrigger>
            <TabsTrigger value="correspondences" className="data-[state=active]:bg-[#3E1E68] data-[state=active]:text-[#FFFFFF] text-[#AAAAAA]">
              对应关系
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meanings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#E3C565]" />
                    正位含义
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#AAAAAA] leading-relaxed">
                    {card.uprightMeaning}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display flex items-center">
                    <RotateCcw className="w-5 h-5 mr-2 text-red-500" />
                    逆位含义
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#AAAAAA] leading-relaxed">
                    {card.reversedMeaning}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                    爱情方面
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#AAAAAA] leading-relaxed">
                    {card.loveMeaning}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                    事业方面
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#AAAAAA] leading-relaxed">
                    {card.careerMeaning}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display flex items-center">
                    <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                    健康方面
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#AAAAAA] leading-relaxed">
                    {card.healthMeaning}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="symbolism" className="space-y-6">
            <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
              <CardHeader>
                <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display">
                  象征元素解析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {card.symbolism.map((symbol, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#E3C565] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#AAAAAA]">{symbol}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="correspondences" className="space-y-6">
            <Card className="bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50">
              <CardHeader>
                <CardTitle className="text-lg text-[#FFFFFF] font-playfair-display">
                  神秘学对应关系
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {card.astrology && (
                    <div className="flex justify-between items-center py-2 border-b border-[#3E1E68]/30">
                      <span className="text-[#AAAAAA]">对应星座：</span>
                      <span className="text-[#FFFFFF] font-medium">{card.astrology}</span>
                    </div>
                  )}
                  {card.element && (
                    <div className="flex justify-between items-center py-2 border-b border-[#3E1E68]/30">
                      <span className="text-[#AAAAAA]">对应元素：</span>
                      <span className="text-[#FFFFFF] font-medium">{card.element}</span>
                    </div>
                  )}
                  {card.numerology && (
                    <div className="flex justify-between items-center py-2 border-b border-[#3E1E68]/30">
                      <span className="text-[#AAAAAA]">数字学意义：</span>
                      <span className="text-[#FFFFFF] font-medium">{card.numerology}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 相关推荐 */}
        {relatedCards.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 font-playfair-display">相关牌面</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCards.map((relatedCard) => (
                <Link key={relatedCard.id} href={`/card/${relatedCard.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 hover:border-[#E3C565] mystical-glow hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-24 bg-white rounded-lg overflow-hidden border-2 border-white/30 flex-shrink-0">
                          <img 
                            src={relatedCard.image} 
                            alt={relatedCard.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.parentElement!.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center text-white font-bold text-xs">
                                  <div class="text-center p-1">
                                    <div class="text-xs">${relatedCard.nameEn}</div>
                                  </div>
                                </div>
                              `
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#FFFFFF] text-sm mb-1">{relatedCard.name}</h4>
                          <p className="text-xs text-[#AAAAAA] mb-2">{relatedCard.nameEn}</p>
                          <Badge variant="secondary" className="bg-[#3E1E68]/60 text-[#E3C565] border border-[#E3C565]/30 text-xs">
                            {relatedCard.type === "MAJOR_ARCANA" ? "大阿尔卡那" : "小阿尔卡那"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}