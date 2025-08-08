import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Star, Heart, Briefcase, Sun } from "lucide-react"
import { Navigation } from "@/components/ui/navigation"

export default function Home() {
  const featuredSpreads = [
    {
      id: "love-spread",
      name: "爱情指引",
      nameEn: "Love Guidance",
      description: "探索你的爱情运势和感情发展",
      descriptionEn: "Explore your love destiny and relationship development",
      icon: Heart,
      category: "爱情",
      categoryEn: "Love",
      cardCount: 3
    },
    {
      id: "career-spread", 
      name: "事业发展",
      nameEn: "Career Development",
      description: "洞察职业发展和工作机遇",
      descriptionEn: "Gain insights into career growth and work opportunities",
      icon: Briefcase,
      category: "事业",
      categoryEn: "Career",
      cardCount: 4
    },
    {
      id: "single-card",
      name: "每日指引",
      nameEn: "Daily Guidance",
      description: "获取今日的能量和指导",
      descriptionEn: "Receive today's energy and guidance",
      icon: Sun,
      category: "日常",
      categoryEn: "Daily",
      cardCount: 1
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 横幅区域 */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3E1E68] to-[#1F2235] text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="stars-bg w-full h-full"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#E3C565] to-[#0099CC] rounded-full backdrop-blur-sm mb-8 floating mystical-glow">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="mystical-symbols relative inline-block">
              <div className="text-5xl mb-6 opacity-80">✦ ✧ ✦ ✧ ✦</div>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#E3C565] to-[#FFFFFF] bg-clip-text text-transparent font-divination">
            Mystic Tarot Oracle
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#E3C565] font-mystical">
            塔罗牌占卜
          </h2>
          <p className="text-2xl md:text-3xl mb-12 text-[#AAAAAA] max-w-4xl mx-auto font-ancient leading-relaxed">
            "Ancient wisdom whispers through sacred cards, revealing the mysteries of your soul's journey."<br/>
            探索内心的智慧，揭示生命的奥秘。通过古老的塔罗牌艺术，为你提供深刻的洞察和指引。
          </p>
          <div className="mystical-symbols relative inline-block mb-12">
            <div className="text-3xl opacity-60">✧ ✦ ✧ ✦ ✧</div>
          </div>
          <div>
            <Link href="/spreads">
              <Button size="lg" className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:from-[#0088BB] text-[#0D0B1E] text-xl px-12 py-6 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 font-mystical mystical-glow">
                <Star className="w-6 h-6 mr-3" />
                Begin Sacred Reading
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0D0B1E] to-transparent"></div>
      </section>

      {/* 品牌介绍 */}
      <section className="py-20 bg-[#0D0B1E]/80 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E3C565] to-[#0099CC] opacity-60"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mystical-symbols relative inline-block mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#FFFFFF] font-mystical">
                About Mystic Divination
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#E3C565] font-divination">
                关于塔罗牌占卜
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                {
                  icon: Sparkles,
                  title: "古老智慧",
                  description: "塔罗牌拥有数百年的历史，蕴含着深刻的哲学和智慧"
                },
                {
                  icon: Star,
                  title: "AI解读",
                  description: "结合现代AI技术，为你提供个性化的深度解读"
                },
                {
                  icon: Heart,
                  title: "心灵指引",
                  description: "帮助你更好地理解自己，找到内心的答案"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-500"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3E1E68] to-[#1F2235] rounded-full flex items-center justify-center mx-auto mb-6 mystical-glow group-hover:shadow-2xl border border-[#E3C565]/30">
                    <item.icon className="w-10 h-10 text-[#E3C565]" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#FFFFFF] font-mystical">{item.title}</h3>
                  <p className="text-[#AAAAAA] text-lg leading-relaxed font-ancient">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 精选占卜卡组推荐 */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0099CC] to-[#E3C565] opacity-60"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mystical-symbols relative inline-block mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFFFFF] font-mystical">
                Sacred Tarot Spreads
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#E3C565] font-divination">
                精选占卜卡组
              </h3>
            </div>
            <p className="text-xl text-[#AAAAAA] max-w-3xl mx-auto font-ancient leading-relaxed">
              "Choose your sacred spread and begin your mystical journey of self-discovery."<br/>
              选择适合你需求的牌阵，开始你的塔罗牌之旅
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {featuredSpreads.map((spread, index) => {
              const Icon = spread.icon
              return (
                <div
                  key={spread.id}
                  className="group"
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 hover:border-[#E3C565] mystical-glow hover:scale-105 hover:bg-[#3E1E68]/80">
                    <CardHeader className="text-center pb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#3E1E68] to-[#1F2235] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 floating border-2 border-[#E3C565]/30">
                        <Icon className="w-10 h-10 text-[#E3C565]" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-[#FFFFFF] font-mystical mb-2">
                        {spread.nameEn || spread.name}
                      </CardTitle>
                      <CardDescription className="text-[#AAAAAA] text-lg font-ancient">
                        {spread.descriptionEn || spread.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <div className="flex justify-center items-center gap-4 text-sm text-[#AAAAAA] mb-6">
                        <span className="bg-[#3E1E68]/60 px-4 py-2 rounded-full border border-[#E3C565]/30 font-divination">
                          {spread.categoryEn || spread.category}
                        </span>
                        <span className="bg-[#1F2235]/60 px-4 py-2 rounded-full border border-[#0099CC]/30 font-ancient">
                          {spread.cardCount} Cards
                        </span>
                      </div>
                      <Link href={`/draw/${spread.id}`}>
                        <Button className="mt-4 w-full bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold text-lg py-3 font-mystical mystical-glow transform hover:scale-105 transition-all duration-300">
                          Begin Sacred Reading
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/spreads">
              <Button variant="outline" size="lg" className="border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20 hover:text-[#FFFFFF] text-lg px-8 py-4 font-mystical rounded-full">
                Explore All Sacred Spreads
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-[#3E1E68] to-[#1F2235] py-12 mt-20 relative mystical-glow">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E3C565] to-[#0099CC] opacity-60"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="mystical-symbols relative inline-block mb-6">
            <div className="text-3xl opacity-80">✦ ✧ ✦ ✧ ✦</div>
          </div>
          <p className="text-[#AAAAAA] text-xl font-mystical mb-4">
            © 2024 Mystic Tarot Oracle. May ancient wisdom guide your path.
          </p>
          <div className="mt-6 text-[#AAAAAA] text-lg font-divination">
            ✨ 愿星光照亮你的前程 ✨
          </div>
        </div>
      </footer>
    </div>
  )
}