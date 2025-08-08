"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Star, Heart } from "lucide-react"

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
  isPopular?: boolean
}

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "major" | "minor">("all")

  // 生成塔罗牌数据
  const generateTarotCards = (): TarotCard[] => {
    const majorArcana: TarotCard[] = [
      {
        id: "major-0",
        name: "愚者",
        nameEn: "The Fool",
        number: 0,
        type: "MAJOR_ARCANA",
        description: "新的开始、纯真、潜力、自发性行动",
        image: "/cards/major/0.jpg",
        uprightMeaning: "新的开始、纯真、潜力、自发性行动、自由",
        reversedMeaning: "鲁莽、疯狂、风险、天真、错误判断",
        loveMeaning: "新的恋情、自由恋爱、不被束缚",
        careerMeaning: "新机会、创业、冒险精神",
        healthMeaning: "活力充沛、新的健康开始",
        isPopular: true
      },
      {
        id: "major-1",
        name: "魔术师",
        nameEn: "The Magician",
        number: 1,
        type: "MAJOR_ARCANA",
        description: "创造力、技能、意志力、新的开始",
        image: "/cards/major/1.jpg",
        uprightMeaning: "创造力、技能、意志力、新的开始、力量",
        reversedMeaning: "操纵、欺骗、缺乏自信、错失机会",
        loveMeaning: "吸引力、魅力、主动追求",
        careerMeaning: "创业机会、技能展示、领导力",
        healthMeaning: "活力充沛、自我疗愈能力",
        isPopular: true
      },
      {
        id: "major-2",
        name: "女祭司",
        nameEn: "The High Priestess",
        number: 2,
        type: "MAJOR_ARCANA",
        description: "直觉、潜意识、神秘、内在智慧",
        image: "/cards/major/2.jpg",
        uprightMeaning: "直觉、潜意识、神秘、内在智慧、神秘主义",
        reversedMeaning: "隐藏的动机、表面信息、混乱、缺乏关注",
        loveMeaning: "神秘吸引力、直觉感应、深层连接",
        careerMeaning: "研究、分析、需要直觉的工作",
        healthMeaning: "身心连接、直觉健康",
        isPopular: true
      },
      {
        id: "major-3",
        name: "皇后",
        nameEn: "The Empress",
        number: 3,
        type: "MAJOR_ARCANA",
        description: "丰饶、母性、创造、 nurturing",
        image: "/cards/major/3.jpg",
        uprightMeaning: "丰饶、母性、创造、 nurturing、生育力",
        reversedMeaning: "依赖、过度保护、创造力阻塞、空虚",
        loveMeaning: "母性爱、稳定关系、家庭生活",
        careerMeaning: "创造性工作、艺术、设计",
        healthMeaning: "生育、身体健康、自然疗愈",
        isPopular: true
      },
      {
        id: "major-4",
        name: "皇帝",
        nameEn: "The Emperor",
        number: 4,
        type: "MAJOR_ARCANA",
        description: "权威、结构、控制、父亲形象",
        image: "/cards/major/4.jpg",
        uprightMeaning: "权威、结构、控制、父亲形象、建立秩序",
        reversedMeaning: "控制欲、专制、缺乏纪律、刚愎自用",
        loveMeaning: "保护、稳定、传统关系",
        careerMeaning: "领导职位、管理、权威角色",
        healthMeaning: "结构化健康计划、纪律",
        isPopular: true
      },
      {
        id: "major-5",
        name: "教皇",
        nameEn: "The Hierophant",
        number: 5,
        type: "MAJOR_ARCANA",
        description: "传统、制度、精神指导、学习",
        image: "/cards/major/5.jpg",
        uprightMeaning: "传统、制度、精神指导、学习、宗教",
        reversedMeaning: "叛逆、自由思想、打破传统、个人信仰",
        loveMeaning: "传统婚姻、精神连接",
        careerMeaning: "教育、咨询、宗教工作",
        healthMeaning: "传统疗法、精神健康",
        isPopular: false
      },
      {
        id: "major-6",
        name: "恋人",
        nameEn: "The Lovers",
        number: 6,
        type: "MAJOR_ARCANA",
        description: "爱情、和谐、关系、价值观选择",
        image: "/cards/major/6.jpg",
        uprightMeaning: "爱情、和谐、关系、价值观选择、结合",
        reversedMeaning: "分离、失衡、价值观冲突、错误选择",
        loveMeaning: "真爱、灵魂伴侣、和谐关系",
        careerMeaning: "合作伙伴关系、价值观对齐",
        healthMeaning: "身心平衡、和谐",
        isPopular: true
      },
      {
        id: "major-7",
        name: "战车",
        nameEn: "The Chariot",
        number: 7,
        type: "MAJOR_ARCANA",
        description: "胜利、决心、前进、控制",
        image: "/cards/major/7.jpg",
        uprightMeaning: "胜利、决心、前进、控制、意志力",
        reversedMeaning: "失控、缺乏方向、内在冲突、侵略性",
        loveMeaning: "关系中的竞争、需要平衡",
        careerMeaning: "职业停滞、需要重新定位",
        healthMeaning: "能量失衡、需要调整",
        isPopular: false
      },
      {
        id: "major-8",
        name: "力量",
        nameEn: "Strength",
        number: 8,
        type: "MAJOR_ARCANA",
        description: "勇气、耐心、控制、内在力量",
        image: "/cards/major/8.jpg",
        uprightMeaning: "勇气、耐心、控制、内在力量、柔韧",
        reversedMeaning: "弱点、缺乏自信、怀疑、不安全感",
        loveMeaning: "情感力量、耐心、理解",
        careerMeaning: "克服挑战、内在力量",
        healthMeaning: "恢复力、内在疗愈",
        isPopular: false
      },
      {
        id: "major-9",
        name: "隐士",
        nameEn: "The Hermit",
        number: 9,
        type: "MAJOR_ARCANA",
        description: "内省、独处、寻求智慧、引导",
        image: "/cards/major/9.jpg",
        uprightMeaning: "内省、独处、寻求智慧、引导、灵魂搜索",
        reversedMeaning: "孤立、退缩、孤独、缺乏指导",
        loveMeaning: "需要独处、深层思考",
        careerMeaning: "研究、需要独立工作",
        healthMeaning: "休息、恢复、内在疗愈",
        isPopular: false
      },
      {
        id: "major-10",
        name: "命运之轮",
        nameEn: "Wheel of Fortune",
        number: 10,
        type: "MAJOR_ARCANA",
        description: "命运、循环、转折点、好运",
        image: "/cards/major/10.jpg",
        uprightMeaning: "命运、循环、转折点、好运、变化",
        reversedMeaning: "厄运、阻力、不幸、坏时机",
        loveMeaning: "命运安排、关系转折",
        careerMeaning: "职业变化、机遇",
        healthMeaning: "健康变化、循环",
        isPopular: true
      },
      {
        id: "major-11",
        name: "正义",
        nameEn: "Justice",
        number: 11,
        type: "MAJOR_ARCANA",
        description: "公正、平衡、真理、因果",
        image: "/cards/major/11.jpg",
        uprightMeaning: "公正、平衡、真理、因果、责任",
        reversedMeaning: "不公正、偏见、不诚实、逃避责任",
        loveMeaning: "公平关系、平衡",
        careerMeaning: "法律、公正决策",
        healthMeaning: "平衡、公正对待身体",
        isPopular: false
      },
      {
        id: "major-12",
        name: "吊人",
        nameEn: "The Hanged Man",
        number: 12,
        type: "MAJOR_ARCANA",
        description: "牺牲、等待、新视角、屈服",
        image: "/cards/major/12.jpg",
        uprightMeaning: "牺牲、等待、新视角、屈服、放手",
        reversedMeaning: "拖延、抵抗、无用牺牲、停滞",
        loveMeaning: "为爱牺牲、等待",
        careerMeaning: "需要暂停、重新评估",
        healthMeaning: "需要休息、新视角",
        isPopular: false
      },
      {
        id: "major-13",
        name: "死神",
        nameEn: "Death",
        number: 13,
        type: "MAJOR_ARCANA",
        description: "结束、转变、重生、释放",
        image: "/cards/major/13.jpg",
        uprightMeaning: "结束、转变、重生、释放、转变",
        reversedMeaning: "抵抗变化、停滞、恐惧、重生延迟",
        loveMeaning: "关系结束、转变",
        careerMeaning: "职业结束、新开始",
        healthMeaning: "健康转变、康复",
        isPopular: true
      },
      {
        id: "major-14",
        name: "节制",
        nameEn: "Temperance",
        number: 14,
        type: "MAJOR_ARCANA",
        description: "平衡、调和、耐心、中庸",
        image: "/cards/major/14.jpg",
        uprightMeaning: "平衡、调和、耐心、中庸、和谐",
        reversedMeaning: "失衡、冲突、极端、不和谐",
        loveMeaning: "和谐关系、平衡",
        careerMeaning: "平衡工作生活、调和",
        healthMeaning: "平衡、和谐",
        isPopular: false
      },
      {
        id: "major-15",
        name: "恶魔",
        nameEn: "The Devil",
        number: 15,
        type: "MAJOR_ARCANA",
        description: "束缚、物质主义、诱惑、阴影",
        image: "/cards/major/15.jpg",
        uprightMeaning: "束缚、物质主义、诱惑、阴影、成瘾",
        reversedMeaning: "摆脱束缚、觉醒、突破、自由",
        loveMeaning: "不健康关系、诱惑",
        careerMeaning: "物质主义、束缚",
        healthMeaning: "成瘾、不健康习惯",
        isPopular: true
      },
      {
        id: "major-16",
        name: "塔",
        nameEn: "The Tower",
        number: 16,
        type: "MAJOR_ARCANA",
        description: "突变、灾难、启示、释放",
        image: "/cards/major/16.jpg",
        uprightMeaning: "突变、灾难、启示、释放、突然变化",
        reversedMeaning: "避免灾难、恐惧变化、延迟启示",
        loveMeaning: "关系突变、启示",
        careerMeaning: "职业突变、启示",
        healthMeaning: "健康危机、启示",
        isPopular: true
      },
      {
        id: "major-17",
        name: "星星",
        nameEn: "The Star",
        number: 17,
        type: "MAJOR_ARCANA",
        description: "希望、灵感、精神指引、疗愈",
        image: "/cards/major/17.jpg",
        uprightMeaning: "希望、灵感、精神指引、疗愈、信心",
        reversedMeaning: "绝望、失去信心、幻灭、信仰丧失",
        loveMeaning: "理想爱情、精神连接",
        careerMeaning: "新的机遇、创意灵感",
        healthMeaning: "康复、身心平衡",
        isPopular: true
      },
      {
        id: "major-18",
        name: "月亮",
        nameEn: "The Moon",
        number: 18,
        type: "MAJOR_ARCANA",
        description: "幻觉、恐惧、潜意识、不确定性",
        image: "/cards/major/18.jpg",
        uprightMeaning: "幻觉、恐惧、潜意识、不确定性、直觉",
        reversedMeaning: "清晰、释放恐惧、真相、理解",
        loveMeaning: "不确定性、直觉",
        careerMeaning: "不确定性、需要直觉",
        healthMeaning: "情绪波动、需要关注",
        isPopular: false
      },
      {
        id: "major-19",
        name: "太阳",
        nameEn: "The Sun",
        number: 19,
        type: "MAJOR_ARCANA",
        description: "成功、活力、 positivity、清晰",
        image: "/cards/major/19.jpg",
        uprightMeaning: "成功、活力、 positivity、清晰、快乐",
        reversedMeaning: "暂时的挫折、过度乐观、缺乏清晰",
        loveMeaning: "快乐关系、阳光",
        careerMeaning: "成功、积极",
        healthMeaning: "活力、健康",
        isPopular: true
      },
      {
        id: "major-20",
        name: "审判",
        nameEn: "Judgement",
        number: 20,
        type: "MAJOR_ARCANA",
        description: "重生、召唤、评估、觉醒",
        image: "/cards/major/20.jpg",
        uprightMeaning: "重生、召唤、评估、觉醒、决定",
        reversedMeaning: "自我怀疑、逃避评估、延迟觉醒",
        loveMeaning: "关系评估、觉醒",
        careerMeaning: "职业评估、召唤",
        healthMeaning: "健康觉醒、康复",
        isPopular: false
      },
      {
        id: "major-21",
        name: "世界",
        nameEn: "The World",
        number: 21,
        type: "MAJOR_ARCANA",
        description: "完成、整合、成就、旅行",
        image: "/cards/major/21.jpg",
        uprightMeaning: "完成、整合、成就、旅行、圆满",
        reversedMeaning: "未完成、缺乏闭合、短视、延迟",
        loveMeaning: "关系完成、圆满",
        careerMeaning: "职业完成、成就",
        healthMeaning: "健康完成、整合",
        isPopular: true
      }
    ]

    const minorArcana: TarotCard[] = [
      // 权杖 (Wands)
      {
        id: "wands-1",
        name: "权杖Ace",
        nameEn: "Ace of Wands",
        number: 22,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "创造力、灵感、新的开始、热情",
        image: "/cards/minor/1.jpg",
        uprightMeaning: "创造力、灵感、新的开始、热情",
        reversedMeaning: "缺乏灵感、拖延、热情消退",
        loveMeaning: "激情、新的恋情",
        careerMeaning: "新项目、创意灵感",
        healthMeaning: "活力、能量",
        isPopular: true
      },
      {
        id: "wands-2",
        name: "权杖2",
        nameEn: "2 of Wands",
        number: 23,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "规划、未来愿景、发现机会",
        image: "/cards/minor/2.jpg",
        uprightMeaning: "规划、未来愿景、发现机会",
        reversedMeaning: "缺乏规划、不确定、害怕未来",
        loveMeaning: "关系规划、未来愿景",
        careerMeaning: "职业规划、机会",
        healthMeaning: "健康规划、预防",
        isPopular: false
      },
      {
        id: "wands-3",
        name: "权杖3",
        nameEn: "3 of Wands",
        number: 24,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "前进、探索、预见、领导力",
        image: "/cards/minor/3.jpg",
        uprightMeaning: "前进、探索、预见、领导力",
        reversedMeaning: "障碍、延迟、缺乏远见",
        loveMeaning: "关系进展、未来展望",
        careerMeaning: "业务扩张、领导机会",
        healthMeaning: "健康改善、进步",
        isPopular: false
      },
      {
        id: "wands-4",
        name: "权杖4",
        nameEn: "4 of Wands",
        number: 25,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "庆祝、稳定、和谐、家庭",
        image: "/cards/minor/4.jpg",
        uprightMeaning: "庆祝、稳定、和谐、家庭",
        reversedMeaning: "不稳定、不和谐、缺乏基础",
        loveMeaning: "关系稳定、庆祝",
        careerMeaning: "工作稳定、成功庆祝",
        healthMeaning: "健康稳定、平衡",
        isPopular: false
      },
      {
        id: "wands-5",
        name: "权杖5",
        nameEn: "5 of Wands",
        number: 26,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "冲突、竞争、挑战、分歧",
        image: "/cards/minor/5.jpg",
        uprightMeaning: "冲突、竞争、挑战、分歧",
        reversedMeaning: "和谐、合作、避免冲突",
        loveMeaning: "关系冲突、竞争",
        careerMeaning: "职场竞争、挑战",
        healthMeaning: "健康挑战、需要平衡",
        isPopular: false
      },
      {
        id: "wands-6",
        name: "权杖6",
        nameEn: "6 of Wands",
        number: 27,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "胜利、成功、认可、成就",
        image: "/cards/minor/6.jpg",
        uprightMeaning: "胜利、成功、认可、成就",
        reversedMeaning: "失败、缺乏认可、延迟成功",
        loveMeaning: "关系中的成功、被认可",
        careerMeaning: "职业成功、获得认可",
        healthMeaning: "健康改善、成功恢复",
        isPopular: true
      },
      {
        id: "wands-7",
        name: "权杖7",
        nameEn: "7 of Wands",
        number: 28,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "坚持、勇气、防御、立场",
        image: "/cards/minor/7.jpg",
        uprightMeaning: "坚持、勇气、防御、立场",
        reversedMeaning: "放弃、易受攻击、缺乏信心",
        loveMeaning: "为爱坚持、保护关系",
        careerMeaning: "坚持立场、职业防御",
        healthMeaning: "坚持健康计划、防御疾病",
        isPopular: false
      },
      {
        id: "wands-8",
        name: "权杖8",
        nameEn: "8 of Wands",
        number: 29,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "速度、行动、进展、消息",
        image: "/cards/minor/8.jpg",
        uprightMeaning: "速度、行动、进展、消息",
        reversedMeaning: "延迟、障碍、缓慢进展",
        loveMeaning: "关系快速发展、好消息",
        careerMeaning: "快速进展、职业消息",
        healthMeaning: "快速康复、健康进展",
        isPopular: false
      },
      {
        id: "wands-9",
        name: "权杖9",
        nameEn: "9 of Wands",
        number: 30,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "韧性、坚持、警惕、准备",
        image: "/cards/minor/9.jpg",
        uprightMeaning: "韧性、坚持、警惕、准备",
        reversedMeaning: "疲惫、缺乏准备、放弃",
        loveMeaning: "关系韧性、坚持",
        careerMeaning: "职业韧性、准备挑战",
        healthMeaning: "健康韧性、警惕",
        isPopular: false
      },
      {
        id: "wands-10",
        name: "权杖10",
        nameEn: "10 of Wands",
        number: 31,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "负担、责任、压力、过度劳累",
        image: "/cards/minor/10.jpg",
        uprightMeaning: "负担、责任、压力、过度劳累",
        reversedMeaning: "释放负担、减轻压力、委托",
        loveMeaning: "关系负担、压力",
        careerMeaning: "工作负担、责任压力",
        healthMeaning: "健康压力、过度劳累",
        isPopular: false
      },
      {
        id: "wands-page",
        name: "权杖侍从",
        nameEn: "Page of Wands",
        number: 32,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "探索、热情、新想法、创造力",
        image: "/cards/minor/11.jpg",
        uprightMeaning: "探索、热情、新想法、创造力",
        reversedMeaning: "缺乏热情、拖延、挫折",
        loveMeaning: "新的恋情、热情探索",
        careerMeaning: "新创意、热情项目",
        healthMeaning: "健康热情、新开始",
        isPopular: false
      },
      {
        id: "wands-knight",
        name: "权杖骑士",
        nameEn: "Knight of Wands",
        number: 33,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "热情、冲动、冒险、行动力",
        image: "/cards/minor/12.jpg",
        uprightMeaning: "热情、冲动、冒险、行动力",
        reversedMeaning: "冲动、缺乏方向、延误",
        loveMeaning: "热情追求、冒险关系",
        careerMeaning: "快速行动、冒险项目",
        healthMeaning: "活力、行动力",
        isPopular: false
      },
      {
        id: "wands-queen",
        name: "权杖皇后",
        nameEn: "Queen of Wands",
        number: 34,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "热情、魅力、自信、领导力",
        image: "/cards/minor/13.jpg",
        uprightMeaning: "热情、魅力、自信、领导力",
        reversedMeaning: "缺乏自信、专横、不安全",
        loveMeaning: "魅力关系、自信",
        careerMeaning: "领导力、热情工作",
        healthMeaning: "健康自信、活力",
        isPopular: false
      },
      {
        id: "wands-king",
        name: "权杖国王",
        nameEn: "King of Wands",
        number: 35,
        type: "MINOR_ARCANA",
        suit: "WANDS",
        description: "领导力、远见、魅力、权威",
        image: "/cards/minor/14.jpg",
        uprightMeaning: "领导力、远见、魅力、权威",
        reversedMeaning: "专横、冲动、缺乏远见",
        loveMeaning: "领导关系、魅力",
        careerMeaning: "职业领导、远见",
        healthMeaning: "健康领导、活力",
        isPopular: false
      },
      // 圣杯 (Cups)
      {
        id: "cups-1",
        name: "圣杯Ace",
        nameEn: "Ace of Cups",
        number: 36,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "新的情感、直觉、精神连接",
        image: "/cards/minor/22.jpg",
        uprightMeaning: "新的情感、直觉、精神连接",
        reversedMeaning: "情感阻塞、直觉忽视",
        loveMeaning: "新的恋情、情感连接",
        careerMeaning: "创意工作、直觉指引",
        healthMeaning: "情感健康、直觉",
        isPopular: true
      },
      {
        id: "cups-2",
        name: "圣杯2",
        nameEn: "2 of Cups",
        number: 37,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "伙伴关系、平衡、相互吸引",
        image: "/cards/minor/23.jpg",
        uprightMeaning: "伙伴关系、平衡、相互吸引",
        reversedMeaning: "关系失衡、缺乏和谐",
        loveMeaning: "和谐关系、相互吸引",
        careerMeaning: "合作伙伴、平衡",
        healthMeaning: "情感平衡、和谐",
        isPopular: true
      },
      {
        id: "cups-3",
        name: "圣杯3",
        nameEn: "3 of Cups",
        number: 38,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "庆祝、友谊、社区、快乐",
        image: "/cards/minor/24.jpg",
        uprightMeaning: "庆祝、友谊、社区、快乐",
        reversedMeaning: "过度放纵、孤独、不快乐",
        loveMeaning: "关系庆祝、友谊",
        careerMeaning: "团队庆祝、成功",
        healthMeaning: "快乐、社交健康",
        isPopular: false
      },
      {
        id: "cups-4",
        name: "圣杯4",
        nameEn: "4 of Cups",
        number: 39,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "反思、冷漠、无聊、重新评估",
        image: "/cards/minor/25.jpg",
        uprightMeaning: "反思、冷漠、无聊、重新评估",
        reversedMeaning: "新的机会、觉醒、接受",
        loveMeaning: "关系反思、冷漠",
        careerMeaning: "职业反思、重新评估",
        healthMeaning: "健康反思、需要改变",
        isPopular: false
      },
      {
        id: "cups-5",
        name: "圣杯5",
        nameEn: "5 of Cups",
        number: 40,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "失落、悲伤、失望、失去",
        image: "/cards/minor/26.jpg",
        uprightMeaning: "失落、悲伤、失望、失去",
        reversedMeaning: "接受、向前看、情感恢复",
        loveMeaning: "关系失落、悲伤",
        careerMeaning: "职业失望、失去",
        healthMeaning: "健康失落、恢复",
        isPopular: false
      },
      {
        id: "cups-6",
        name: "圣杯6",
        nameEn: "6 of Cups",
        number: 41,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "怀旧、童年、纯真、分享",
        image: "/cards/minor/27.jpg",
        uprightMeaning: "怀旧、童年、纯真、分享",
        reversedMeaning: " stuck in past、无法成长、不成熟",
        loveMeaning: "童年恋情、纯真",
        careerMeaning: "怀旧职业、纯真",
        healthMeaning: "童年健康、纯真",
        isPopular: false
      },
      {
        id: "cups-7",
        name: "圣杯7",
        nameEn: "7 of Cups",
        number: 42,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "选择、幻想、幻觉、可能性",
        image: "/cards/minor/28.jpg",
        uprightMeaning: "选择、幻想、幻觉、可能性",
        reversedMeaning: "清晰、决定、现实",
        loveMeaning: "多种选择、幻想",
        careerMeaning: "多种可能性、选择",
        healthMeaning: "健康选择、现实",
        isPopular: false
      },
      {
        id: "cups-8",
        name: "圣杯8",
        nameEn: "8 of Cups",
        number: 43,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "放弃、离开、寻求、撤退",
        image: "/cards/minor/29.jpg",
        uprightMeaning: "放弃、离开、寻求、撤退",
        reversedMeaning: "恐惧离开、逃避、不愿放弃",
        loveMeaning: "离开关系、寻求更多",
        careerMeaning: "放弃工作、寻求新机会",
        healthMeaning: "放弃不健康习惯",
        isPopular: false
      },
      {
        id: "cups-9",
        name: "圣杯9",
        nameEn: "9 of Cups",
        number: 44,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "满足、愿望成真、幸福、享受",
        image: "/cards/minor/30.jpg",
        uprightMeaning: "满足、愿望成真、幸福、享受",
        reversedMeaning: "不满、失望、不满足",
        loveMeaning: "关系满足、幸福",
        careerMeaning: "职业满足、成功",
        healthMeaning: "健康满足、幸福",
        isPopular: false
      },
      {
        id: "cups-10",
        name: "圣杯10",
        nameEn: "10 of Cups",
        number: 45,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "和谐、家庭、幸福、情感满足",
        image: "/cards/minor/31.jpg",
        uprightMeaning: "和谐、家庭、幸福、情感满足",
        reversedMeaning: "家庭冲突、不和谐、情感不满",
        loveMeaning: "家庭和谐、幸福",
        careerMeaning: "职业和谐、满足",
        healthMeaning: "家庭健康、和谐",
        isPopular: false
      },
      {
        id: "cups-page",
        name: "圣杯侍从",
        nameEn: "Page of Cups",
        number: 46,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "直觉、敏感、创造力、新情感",
        image: "/cards/minor/32.jpg",
        uprightMeaning: "直觉、敏感、创造力、新情感",
        reversedMeaning: "情感不成熟、缺乏直觉",
        loveMeaning: "新情感、敏感",
        careerMeaning: "创意直觉、敏感",
        healthMeaning: "直觉健康、敏感",
        isPopular: false
      },
      {
        id: "cups-knight",
        name: "圣杯骑士",
        nameEn: "Knight of Cups",
        number: 47,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "浪漫、魅力、情感追求、理想主义",
        image: "/cards/minor/33.jpg",
        uprightMeaning: "浪漫、魅力、情感追求、理想主义",
        reversedMeaning: "情绪化、不切实际、失望",
        loveMeaning: "浪漫追求、魅力",
        careerMeaning: "理想主义工作、追求",
        healthMeaning: "情感健康、浪漫",
        isPopular: false
      },
      {
        id: "cups-queen",
        name: "圣杯皇后",
        nameEn: "Queen of Cups",
        number: 48,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "情感深度、直觉、同情、养育",
        image: "/cards/minor/34.jpg",
        uprightMeaning: "情感深度、直觉、同情、养育",
        reversedMeaning: "情绪化、依赖、不安全",
        loveMeaning: "情感深度、同情",
        careerMeaning: "直觉工作、养育",
        healthMeaning: "情感健康、直觉",
        isPopular: false
      },
      {
        id: "cups-king",
        name: "圣杯国王",
        nameEn: "King of Cups",
        number: 49,
        type: "MINOR_ARCANA",
        suit: "CUPS",
        description: "情感控制、平衡、同情、智慧",
        image: "/cards/minor/35.jpg",
        uprightMeaning: "情感控制、平衡、同情、智慧",
        reversedMeaning: "情绪化、操纵、不平衡",
        loveMeaning: "情感控制、平衡",
        careerMeaning: "情感智慧、平衡",
        healthMeaning: "情感平衡、智慧",
        isPopular: false
      },
      // 宝剑 (Swords)
      {
        id: "swords-1",
        name: "宝剑Ace",
        nameEn: "Ace of Swords",
        number: 50,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "新的思想、清晰、突破",
        image: "/cards/minor/40.jpg",
        uprightMeaning: "新的思想、清晰、突破",
        reversedMeaning: "混乱、思想阻塞",
        loveMeaning: "清晰沟通、思想突破",
        careerMeaning: "新想法、清晰思维",
        healthMeaning: "思想清晰、突破",
        isPopular: true
      },
      {
        id: "swords-2",
        name: "宝剑2",
        nameEn: "2 of Swords",
        number: 51,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "犹豫、选择、平衡、决策困难",
        image: "/cards/minor/41.jpg",
        uprightMeaning: "犹豫、选择、平衡、决策困难",
        reversedMeaning: "混乱、决策、释放",
        loveMeaning: "关系犹豫、选择",
        careerMeaning: "职业选择、犹豫",
        healthMeaning: "健康决策、平衡",
        isPopular: false
      },
      {
        id: "swords-3",
        name: "宝剑3",
        nameEn: "3 of Swords",
        number: 52,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "心碎、悲伤、痛苦、失落",
        image: "/cards/minor/42.jpg",
        uprightMeaning: "心碎、悲伤、痛苦、失落",
        reversedMeaning: "恢复、释放痛苦、愈合",
        loveMeaning: "心碎、悲伤",
        careerMeaning: "职业失落、痛苦",
        healthMeaning: "情感痛苦、恢复",
        isPopular: false
      },
      {
        id: "swords-4",
        name: "宝剑4",
        nameEn: "4 of Swords",
        number: 53,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "休息、恢复、沉思、暂停",
        image: "/cards/minor/43.jpg",
        uprightMeaning: "休息、恢复、沉思、暂停",
        reversedMeaning: "疲惫、缺乏休息、不活跃",
        loveMeaning: "关系休息、恢复",
        careerMeaning: "职业休息、恢复",
        healthMeaning: "健康恢复、休息",
        isPopular: false
      },
      {
        id: "swords-5",
        name: "宝剑5",
        nameEn: "5 of Swords",
        number: 54,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "冲突、胜利、竞争、不道德",
        image: "/cards/minor/44.jpg",
        uprightMeaning: "冲突、胜利、竞争、不道德",
        reversedMeaning: "失败、羞辱、谦卑",
        loveMeaning: "关系冲突、竞争",
        careerMeaning: "职场竞争、冲突",
        healthMeaning: "健康冲突、竞争",
        isPopular: false
      },
      {
        id: "swords-6",
        name: "宝剑6",
        nameEn: "6 of Swords",
        number: 55,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "过渡、旅行、离开、平静",
        image: "/cards/minor/45.jpg",
        uprightMeaning: "过渡、旅行、离开、平静",
        reversedMeaning: "停滞、无法前进、延迟",
        loveMeaning: "关系过渡、离开",
        careerMeaning: "职业过渡、旅行",
        healthMeaning: "健康过渡、平静",
        isPopular: false
      },
      {
        id: "swords-7",
        name: "宝剑7",
        nameEn: "7 of Swords",
        number: 56,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "欺骗、策略、逃避、隐秘",
        image: "/cards/minor/46.jpg",
        uprightMeaning: "欺骗、策略、逃避、隐秘",
        reversedMeaning: "真相、诚实、责任",
        loveMeaning: "关系欺骗、策略",
        careerMeaning: "职场策略、逃避",
        healthMeaning: "健康欺骗、真相",
        isPopular: false
      },
      {
        id: "swords-8",
        name: "宝剑8",
        nameEn: "8 of Swords",
        number: 57,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "限制、束缚、恐惧、囚禁",
        image: "/cards/minor/47.jpg",
        uprightMeaning: "限制、束缚、恐惧、囚禁",
        reversedMeaning: "释放、自由、突破",
        loveMeaning: "关系束缚、恐惧",
        careerMeaning: "职业限制、束缚",
        healthMeaning: "健康束缚、恐惧",
        isPopular: false
      },
      {
        id: "swords-9",
        name: "宝剑9",
        nameEn: "9 of Swords",
        number: 58,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "焦虑、担忧、噩梦、痛苦",
        image: "/cards/minor/48.jpg",
        uprightMeaning: "焦虑、担忧、噩梦、痛苦",
        reversedMeaning: "释放焦虑、希望、恢复",
        loveMeaning: "关系焦虑、担忧",
        careerMeaning: "职业焦虑、担忧",
        healthMeaning: "健康焦虑、担忧",
        isPopular: false
      },
      {
        id: "swords-10",
        name: "宝剑10",
        nameEn: "10 of Swords",
        number: 59,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "结束、失败、痛苦、新生",
        image: "/cards/minor/49.jpg",
        uprightMeaning: "结束、失败、痛苦、新生",
        reversedMeaning: "恢复、希望、新开始",
        loveMeaning: "关系结束、新生",
        careerMeaning: "职业失败、新开始",
        healthMeaning: "健康结束、新生",
        isPopular: false
      },
      {
        id: "swords-page",
        name: "宝剑侍从",
        nameEn: "Page of Swords",
        number: 60,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "好奇心、新思想、沟通、机智",
        image: "/cards/minor/50.jpg",
        uprightMeaning: "好奇心、新思想、沟通、机智",
        reversedMeaning: "恶意、八卦、不诚实",
        loveMeaning: "好奇心、沟通",
        careerMeaning: "新思想、机智",
        healthMeaning: "好奇心、健康沟通",
        isPopular: false
      },
      {
        id: "swords-knight",
        name: "宝剑骑士",
        nameEn: "Knight of Swords",
        number: 61,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "行动、野心、冲动、变化",
        image: "/cards/minor/51.jpg",
        uprightMeaning: "行动、野心、冲动、变化",
        reversedMeaning: "鲁莽、不计后果、冲突",
        loveMeaning: "冲动关系、变化",
        careerMeaning: "野心行动、变化",
        healthMeaning: "冲动健康、变化",
        isPopular: false
      },
      {
        id: "swords-queen",
        name: "宝剑皇后",
        nameEn: "Queen of Swords",
        number: 62,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "智力、清晰、独立、客观",
        image: "/cards/minor/52.jpg",
        uprightMeaning: "智力、清晰、独立、客观",
        reversedMeaning: "冷漠、孤立、不诚实",
        loveMeaning: "智力关系、独立",
        careerMeaning: "智力工作、独立",
        healthMeaning: "清晰健康、独立",
        isPopular: false
      },
      {
        id: "swords-king",
        name: "宝剑国王",
        nameEn: "King of Swords",
        number: 63,
        type: "MINOR_ARCANA",
        suit: "SWORDS",
        description: "权威、智力、清晰、公正",
        image: "/cards/minor/53.jpg",
        uprightMeaning: "权威、智力、清晰、公正",
        reversedMeaning: "滥用权力、操纵、不公正",
        loveMeaning: "权威关系、公正",
        careerMeaning: "权威工作、公正",
        healthMeaning: "权威健康、公正",
        isPopular: false
      },
      // 星币 (Pentacles)
      {
        id: "pentacles-1",
        name: "星币Ace",
        nameEn: "Ace of Pentacles",
        number: 64,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "新的机会、物质繁荣、稳定",
        image: "/cards/minor/58.jpg",
        uprightMeaning: "新的机会、物质繁荣、稳定",
        reversedMeaning: "机会错失、财务不稳定",
        loveMeaning: "稳定关系、物质繁荣",
        careerMeaning: "新机会、财务稳定",
        healthMeaning: "身体稳定、健康",
        isPopular: true
      },
      {
        id: "pentacles-2",
        name: "星币2",
        nameEn: "2 of Pentacles",
        number: 65,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "平衡、适应、变化、优先级",
        image: "/cards/minor/59.jpg",
        uprightMeaning: "平衡、适应、变化、优先级",
        reversedMeaning: "失衡、无法适应、混乱",
        loveMeaning: "关系平衡、适应",
        careerMeaning: "工作平衡、适应",
        healthMeaning: "健康平衡、适应",
        isPopular: false
      },
      {
        id: "pentacles-3",
        name: "星币3",
        nameEn: "3 of Pentacles",
        number: 66,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "团队合作、技能、工艺、成就",
        image: "/cards/minor/60.jpg",
        uprightMeaning: "团队合作、技能、工艺、成就",
        reversedMeaning: "缺乏合作、技能不足、平庸",
        loveMeaning: "团队合作、技能",
        careerMeaning: "团队成就、技能",
        healthMeaning: "团队合作健康",
        isPopular: false
      },
      {
        id: "pentacles-4",
        name: "星币4",
        nameEn: "4 of Pentacles",
        number: 67,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "稳定、保守、占有、安全",
        image: "/cards/minor/61.jpg",
        uprightMeaning: "稳定、保守、占有、安全",
        reversedMeaning: "吝啬、风险、不稳定",
        loveMeaning: "稳定关系、安全",
        careerMeaning: "稳定工作、安全",
        healthMeaning: "稳定健康、安全",
        isPopular: false
      },
      {
        id: "pentacles-5",
        name: "星币5",
        nameEn: "5 of Pentacles",
        number: 68,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "困难、贫困、失去、孤立",
        image: "/cards/minor/62.jpg",
        uprightMeaning: "困难、贫困、失去、孤立",
        reversedMeaning: "恢复、希望、改善",
        loveMeaning: "关系困难、失去",
        careerMeaning: "职业困难、贫困",
        healthMeaning: "健康困难、恢复",
        isPopular: false
      },
      {
        id: "pentacles-6",
        name: "星币6",
        nameEn: "6 of Pentacles",
        number: 69,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "慷慨、分享、成功、给予",
        image: "/cards/minor/63.jpg",
        uprightMeaning: "慷慨、分享、成功、给予",
        reversedMeaning: "自私、债务、不平等",
        loveMeaning: "慷慨关系、分享",
        careerMeaning: "成功分享、给予",
        healthMeaning: "健康分享、慷慨",
        isPopular: false
      },
      {
        id: "pentacles-7",
        name: "星币7",
        nameEn: "7 of Pentacles",
        number: 70,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "耐心、评估、长期视角、成长",
        image: "/cards/minor/64.jpg",
        uprightMeaning: "耐心、评估、长期视角、成长",
        reversedMeaning: "缺乏耐心、短期思维、停滞",
        loveMeaning: "关系耐心、成长",
        careerMeaning: "职业耐心、成长",
        healthMeaning: "健康耐心、成长",
        isPopular: false
      },
      {
        id: "pentacles-8",
        name: "星币8",
        nameEn: "8 of Pentacles",
        number: 71,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "工艺、技能、勤奋、专注",
        image: "/cards/minor/65.jpg",
        uprightMeaning: "工艺、技能、勤奋、专注",
        reversedMeaning: "缺乏技能、懒惰、分心",
        loveMeaning: "技能关系、专注",
        careerMeaning: "工艺技能、勤奋",
        healthMeaning: "技能健康、专注",
        isPopular: false
      },
      {
        id: "pentacles-9",
        name: "星币9",
        nameEn: "9 of Pentacles",
        number: 72,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "独立、丰饶、享受、成功",
        image: "/cards/minor/66.jpg",
        uprightMeaning: "独立、丰饶、享受、成功",
        reversedMeaning: "依赖、不安全、财务问题",
        loveMeaning: "独立关系、享受",
        careerMeaning: "独立成功、丰饶",
        healthMeaning: "独立健康、享受",
        isPopular: false
      },
      {
        id: "pentacles-10",
        name: "星币10",
        nameEn: "10 of Pentacles",
        number: 73,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "遗产、家庭、财富、传统",
        image: "/cards/minor/67.jpg",
        uprightMeaning: "遗产、家庭、财富、传统",
        reversedMeaning: "家庭问题、财务损失",
        loveMeaning: "家庭遗产、传统",
        careerMeaning: "职业遗产、财富",
        healthMeaning: "家庭健康、传统",
        isPopular: false
      },
      {
        id: "pentacles-page",
        name: "星币侍从",
        nameEn: "Page of Pentacles",
        number: 74,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "学习、机会、实用、新开始",
        image: "/cards/minor/68.jpg",
        uprightMeaning: "学习、机会、实用、新开始",
        reversedMeaning: "缺乏专注、浪费机会、不实际",
        loveMeaning: "学习关系、实用",
        careerMeaning: "学习机会、实用",
        healthMeaning: "健康学习、实用",
        isPopular: false
      },
      {
        id: "pentacles-knight",
        name: "星币骑士",
        nameEn: "Knight of Pentacles",
        number: 75,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "勤奋、可靠、耐心、实际",
        image: "/cards/minor/69.jpg",
        uprightMeaning: "勤奋、可靠、耐心、实际",
        reversedMeaning: "懒惰、不可靠、冲动",
        loveMeaning: "可靠关系、耐心",
        careerMeaning: "勤奋工作、实际",
        healthMeaning: "可靠健康、耐心",
        isPopular: false
      },
      {
        id: "pentacles-queen",
        name: "星币皇后",
        nameEn: "Queen of Pentacles",
        number: 76,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "养育、实用、丰饶、关怀",
        image: "/cards/minor/70.jpg",
        uprightMeaning: "养育、实用、丰饶、关怀",
        reversedMeaning: "焦虑、不安全、过度控制",
        loveMeaning: "养育关系、关怀",
        careerMeaning: "养育工作、实用",
        healthMeaning: "养育健康、关怀",
        isPopular: false
      },
      {
        id: "pentacles-king",
        name: "星币国王",
        nameEn: "King of Pentacles",
        number: 77,
        type: "MINOR_ARCANA",
        suit: "PENTACLES",
        description: "成功、财富、稳定、成就",
        image: "/cards/minor/71.jpg",
        uprightMeaning: "成功、财富、稳定、成就",
        reversedMeaning: "贪婪、不稳定、滥用财富",
        loveMeaning: "成功关系、稳定",
        careerMeaning: "职业成功、财富",
        healthMeaning: "成功健康、稳定",
        isPopular: false
      }
    ]

    return [...majorArcana, ...minorArcana]
  }

  const allCards = generateTarotCards()
  
  const filteredCards = allCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filter === "all" || 
                          (filter === "major" && card.type === "MAJOR_ARCANA") ||
                          (filter === "minor" && card.type === "MINOR_ARCANA")
    
    return matchesSearch && matchesFilter
  })

  const popularCards = allCards.filter(card => card.isPopular)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1F2235] to-[#3E1E68]">
      {/* 页面头部 */}
      <div className="bg-[#1F2235]/80 backdrop-blur-sm border-b border-[#3E1E68]/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E3C565] to-[#0099CC] opacity-60"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-[#E3C565] hover:bg-[#3E1E68]/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回首页
              </Button>
            </Link>
            <div className="text-center">
              <div className="mystical-symbols relative inline-block mb-2">
                <h1 className="text-3xl font-bold text-[#FFFFFF] font-playfair-display">
                  塔罗牌总览
                </h1>
              </div>
              <p className="text-[#AAAAAA]">探索78张塔罗牌的神秘世界</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="搜索牌面名称、英文名或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1F2235]/80 border-[#3E1E68]/50 text-[#FFFFFF] placeholder-[#AAAAAA] focus:border-[#E3C565]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" 
                  ? "bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] font-bold" 
                  : "border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20"
                }
              >
                全部
              </Button>
              <Button
                variant={filter === "major" ? "default" : "outline"}
                onClick={() => setFilter("major")}
                className={filter === "major" 
                  ? "bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] font-bold" 
                  : "border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20"
                }
              >
                大阿尔卡那
              </Button>
              <Button
                variant={filter === "minor" ? "default" : "outline"}
                onClick={() => setFilter("minor")}
                className={filter === "minor" 
                  ? "bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] font-bold" 
                  : "border-[#3E1E68] text-[#E3C565] hover:bg-[#3E1E68]/20"
                }
              >
                小阿尔卡那
              </Button>
            </div>
          </div>
          
          <div className="text-center text-[#AAAAAA] mb-2">
            找到 {filteredCards.length} 张牌
          </div>
        </div>

        {/* 精选推荐 */}
        {!searchTerm && filter === "all" && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 mr-2 text-[#E3C565]" />
              <h2 className="text-2xl font-bold text-[#FFFFFF] font-playfair-display">
                精选推荐
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {popularCards.map((card) => (
                <Link key={card.id} href={`/card/${card.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 hover:border-[#E3C565] mystical-glow hover:scale-105">
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                      <div className="w-full aspect-[2/3] bg-white rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center text-white font-bold text-sm">
                                <div class="text-center p-2">
                                  <div class="text-xs mb-1">${card.nameEn}</div>
                                  <div class="text-sm">${card.name}</div>
                                </div>
                              </div>
                            `
                          }}
                        />
                      </div>
                        {card.isPopular && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] text-xs font-bold">
                            精选
                          </Badge>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-[#FFFFFF] text-sm mb-1">{card.name}</h3>
                        <p className="text-xs text-[#AAAAAA]">{card.nameEn}</p>
                        <Badge variant="secondary" className="mt-2 bg-[#3E1E68]/60 text-[#E3C565] border border-[#E3C565]/30 text-xs">
                          {card.type === "MAJOR_ARCANA" ? "大阿尔卡那" : "小阿尔卡那"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 所有牌面 */}
        <div>
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-6 font-playfair-display">
            {searchTerm || filter !== "all" ? "搜索结果" : "所有牌面"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredCards.map((card) => (
              <Link key={card.id} href={`/card/${card.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1F2235]/80 backdrop-blur-sm border-[#3E1E68]/50 hover:border-[#E3C565] mystical-glow hover:scale-105">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <div className="w-full aspect-[2/3] bg-white rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#1F2235] flex items-center justify-center text-white font-bold text-sm">
                                <div class="text-center p-2">
                                  <div class="text-xs mb-1">${card.nameEn}</div>
                                  <div class="text-sm">${card.name}</div>
                                </div>
                              </div>
                            `
                          }}
                        />
                      </div>
                      {card.isPopular && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-[#E3C565] to-[#0099CC] text-[#0D0B1E] text-xs font-bold">
                          精选
                        </Badge>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-[#FFFFFF] text-sm mb-1">{card.name}</h3>
                      <p className="text-xs text-[#AAAAAA]">{card.nameEn}</p>
                      <Badge variant="secondary" className="mt-2 bg-[#3E1E68]/60 text-[#E3C565] border border-[#E3C565]/30 text-xs">
                        {card.type === "MAJOR_ARCANA" ? "大阿尔卡那" : "小阿尔卡那"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#AAAAAA] text-lg mb-4">没有找到匹配的牌面</div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilter("all")
                }}
                className="bg-gradient-to-r from-[#E3C565] to-[#0099CC] hover:from-[#D4B555] hover:to-[#0088BB] text-[#0D0B1E] font-bold"
              >
                重置筛选
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}