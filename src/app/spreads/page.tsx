import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Briefcase, Sun, Star, Sparkles, Users, Target, Lightbulb } from "lucide-react"
import { Navigation, PageHeader, BackButton } from "@/components/ui/navigation"

export default function SpreadsPage() {
  const spreads = [
    {
      id: "single-card",
      name: "单张牌阵",
      description: "简单直接的每日指引，适合快速获得灵感和建议",
      cardCount: 1,
      difficulty: "简单",
      icon: Sun,
      positions: [
        { name: "今日指引", meaning: "代表今天的能量和给你的建议" }
      ]
    },
    {
      id: "three-card",
      name: "三张牌阵",
      description: "过去-现在-未来的经典牌阵，全面分析问题的发展",
      cardCount: 3,
      difficulty: "简单",
      icon: Sparkles,
      positions: [
        { name: "过去", meaning: "影响当前情况的基础和根源" },
        { name: "现在", meaning: "当前的状况和挑战" },
        { name: "未来", meaning: "可能的发展结果和建议" }
      ]
    },
    {
      id: "love-spread",
      name: "爱情指引牌阵",
      description: "深入探索爱情关系，了解感情发展的可能性",
      cardCount: 3,
      difficulty: "中等",
      icon: Heart,
      positions: [
        { name: "你的感受", meaning: "你在这段关系中的真实想法" },
        { name: "对方的感受", meaning: "对方在这段关系中的想法" },
        { name: "关系发展", meaning: "关系的未来走向和建议" }
      ]
    },
    {
      id: "career-spread",
      name: "事业发展牌阵",
      description: "分析职业发展路径，提供事业决策的指导",
      cardCount: 4,
      difficulty: "中等",
      icon: Briefcase,
      positions: [
        { name: "当前状况", meaning: "你现在的工作状态" },
        { name: "挑战", meaning: "面临的主要困难和挑战" },
        { name: "优势", meaning: "你的核心优势和机会" },
        { name: "建议", meaning: "未来发展的最佳方向" }
      ]
    },
    {
      id: "celtic-cross",
      name: "凯尔特十字牌阵",
      description: "最经典和全面的塔罗牌阵，深入分析复杂问题",
      cardCount: 10,
      difficulty: "困难",
      icon: Star,
      positions: [
        { name: "现状", meaning: "当前情况的核心" },
        { name: "挑战", meaning: "主要的障碍和挑战" },
        { name: "目标", meaning: "你希望达到的目标" },
        { name: "过去", meaning: "影响现在的基础" },
        { name: "影响", meaning: "对未来的影响因素" },
        { name: "未来", meaning: "短期内的发展" },
        { name: "你自己", meaning: "你对情况的态度" },
        { name: "环境", meaning: "外部环境和他人的影响" },
        { name: "希望", meaning: "你的希望和恐惧" },
        { name: "结果", meaning: "最终的可能结果" }
      ]
    },
    {
      id: "relationship-spread",
      name: "关系分析牌阵",
      description: "全面分析人际关系的各个方面，包括友情和亲情",
      cardCount: 5,
      difficulty: "中等",
      icon: Users,
      positions: [
        { name: "关系基础", meaning: "关系的基础和本质" },
        { name: "沟通状况", meaning: "双方的沟通和理解程度" },
        { name: "共同目标", meaning: "双方的共同点和目标" },
        { name: "潜在问题", meaning: "关系中需要注意的问题" },
        { name: "发展建议", meaning: "改善关系的具体建议" }
      ]
    },
    {
      id: "decision-spread",
      name: "决策辅助牌阵",
      description: "当你面临重要选择时，帮助你做出明智的决定",
      cardCount: 4,
      difficulty: "中等",
      icon: Target,
      positions: [
        { name: "选择A", meaning: "第一个选择的可能结果" },
        { name: "选择B", meaning: "第二个选择的可能结果" },
        { name: "你的内心", meaning: "你内心真正的倾向" },
        { name: "最佳建议", meaning: "最有利于你的选择" }
      ]
    },
    {
      id: "creative-spread",
      name: "创意灵感牌阵",
      description: "激发创造力和灵感，适合艺术创作和项目规划",
      cardCount: 3,
      difficulty: "简单",
      icon: Lightbulb,
      positions: [
        { name: "创意源泉", meaning: "灵感的来源和本质" },
        { name: "表达方式", meaning: "最佳的表达和实现方式" },
        { name: "发展方向", meaning: "创意的发展潜力" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 页面头部 */}
      <PageHeader
        title="选择牌阵"
        description="选择适合你需求的牌阵，每种牌阵都有其独特的用途和解读方式"
        breadcrumb={[
          { label: "首页", href: "/" },
          { label: "牌阵选择" }
        ]}
        actions={<Navigation />}
      />

      {/* 所有牌阵 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spreads.map((spread) => {
              const Icon = spread.icon
              return (
                <div
                  key={spread.id}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 hover:border-[#E3C565] mystical-glow hover:scale-105 hover:bg-[#3E1E68]/80">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#3E1E68] to-[#1F2235] rounded-full flex items-center justify-center border-2 border-[#E3C565]/30">
                          <Icon className="w-8 h-8 text-[#E3C565]" />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-[#FFFFFF] font-playfair-display">
                        {spread.name}
                      </CardTitle>
                      <CardDescription className="text-[#AAAAAA] text-lg">
                        {spread.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 text-sm text-[#AAAAAA] mb-6">
                        <span className="bg-[#1F2235]/60 px-3 py-1 rounded-full border border-[#0099CC]/30">
                          {spread.cardCount} 张牌
                        </span>
                        <span className="bg-[#3E1E68]/60 px-3 py-1 rounded-full border border-[#E3C565]/30">
                          {spread.difficulty}
                        </span>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-[#FFFFFF] mb-3">牌位说明：</h4>
                        <div className="space-y-2">
                          {spread.positions.slice(0, 3).map((position, index) => (
                            <div key={index} className="text-sm text-[#AAAAAA] leading-relaxed">
                              <span className="font-medium text-[#E3C565]">{position.name}:</span> {position.meaning}
                            </div>
                          ))}
                          {spread.positions.length > 3 && (
                            <div className="text-sm text-[#0099CC] font-medium">
                              +{spread.positions.length - 3} 个牌位...
                            </div>
                          )}
                        </div>
                      </div>
                      <Link href={`/draw/${spread.id}`}>
                        <Button className="w-full bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold py-3 font-playfair-display mystical-glow transform hover:scale-105 transition-all duration-300">
                          开始占卜
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}