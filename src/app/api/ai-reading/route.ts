import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface SessionCard {
  id: string
  cardId: string
  position: number
  isReversed: boolean
  card: {
    id: string
    name: string
    nameEn: string
    number: number
    type: 'MAJOR_ARCANA' | 'MINOR_ARCANA'
    suit?: 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES'
    uprightMeaning: string
    reversedMeaning: string
    loveMeaning: string
    careerMeaning: string
    healthMeaning: string
  }
}

interface Spread {
  id: string
  name: string
  description: string
  cardCount: number
  category: string
  positions: Array<{
    name: string
    meaning: string
  }>
}

interface ReadingRequest {
  spread: Spread
  cards: SessionCard[]
  question?: string
  readingStyle: 'gentle' | 'spiritual' | 'direct'
}

const getReadingStylePrompt = (style: string) => {
  switch (style) {
    case 'gentle':
      return `请用温柔、关怀、鼓励的语调进行解读。重点提供积极的建议和希望，避免过于直接或批判性的语言。用词要温暖、支持性，给问卜者带来安慰和信心。`
    case 'spiritual':
      return `请用灵性、深邃、富有哲理的语调进行解读。融入精神层面的洞察，连接更高的智慧和宇宙能量。使用富有诗意的语言，强调灵魂成长和灵性觉醒。`
    case 'direct':
      return `请用直接、清晰、务实的语调进行解读。提供明确的建议和实际的指导，不回避问题或挑战。重点在于具体的行动方案和解决方案。`
    default:
      return `请用平衡、专业、富有洞察力的语调进行解读。`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ReadingRequest = await request.json()
    const { spread, cards, question, readingStyle } = body

    if (!spread || !cards || !Array.isArray(cards)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // 构建AI提示词
    const stylePrompt = getReadingStylePrompt(readingStyle)
    
    const cardsInfo = cards.map((sessionCard, index) => {
      const position = spread.positions[index] || { name: `位置${index + 1}`, meaning: '' }
      const card = sessionCard.card
      const meaning = sessionCard.isReversed ? card.reversedMeaning : card.uprightMeaning
      
      return `
位置 ${index + 1}：${position.name}
牌面：${card.name} (${card.nameEn})${sessionCard.isReversed ? ' - 逆位' : ' - 正位'}
位置含义：${position.meaning}
牌面含义：${meaning}
      `.trim()
    }).join('\n\n')

    const prompt = `
你是一位专业的塔罗牌解读师，拥有丰富的经验和深刻的洞察力。请为以下塔罗牌占卜结果提供深度解读：

${stylePrompt}

牌阵信息：
- 牌阵名称：${spread.name}
- 牌阵描述：${spread.description}
- 牌阵类别：${spread.category}

${question ? `用户问题：${question}` : ''}

抽牌结果：
${cardsInfo}

请提供以下结构的解读：

## 塔罗牌解读

### 整体概览
[对整个牌阵的整体能量和主题进行分析，给出总体的印象和核心信息]

### 详细解读
[逐张分析每张牌在其特定位置上的含义，结合位置的意义和牌的正逆位状态]

### 建议与指导
[基于牌阵的整体信息，提供具体的建议、指导或行动方案]

### 结语
[给予鼓励和希望，强调积极的力量和可能性]

要求：
1. 解读要深入、专业，同时易于理解
2. 结合用户的具体问题（如果提供）
3. 考虑牌的正逆位状态
4. 提供实用的建议和指导
5. 语言要符合指定的解读风格
6. 解读长度适中，重点突出
    `.trim()

    // 调用ZAI SDK生成解读
    const zai = await ZAI.create()
    
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '你是一位经验丰富的塔罗牌解读师，专长于为人们提供深刻的洞察和指导。你的解读既专业又温暖，能够帮助人们理解牌面的含义并获得实用的建议。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const reading = completion.choices[0]?.message?.content

    if (!reading) {
      throw new Error('Failed to generate reading')
    }

    return NextResponse.json({
      success: true,
      reading,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Reading Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI reading' },
      { status: 500 }
    )
  }
}