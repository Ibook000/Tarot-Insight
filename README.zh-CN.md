# 🚀 欢迎使用 Z.ai 代码脚手架

一个现代化的、可用于生产的 Web 应用脚手架，由前沿技术驱动，旨在通过 [Z.ai](https://chat.z.ai) 的 AI 编程助手加速您的开发。

## ✨ 技术栈

这个脚手架提供了基于以下技术的坚实基础：

### 🎯 核心框架
- **⚡ Next.js 15** - 用于生产的 React 框架，支持应用路由
- **📘 TypeScript 5** - 类型安全的 JavaScript，提供更好的开发体验
- **🎨 Tailwind CSS 4** - 实用优先的 CSS 框架，实现快速 UI 开发

### 🧩 UI 组件与样式
- **🧩 shadcn/ui** - 基于 Radix UI 的高质量、可访问组件
- **🎯 Lucide React** - 美观且一致的图标库
- **🌈 Framer Motion** - 用于 React 的生产级动画库
- **🎨 Next Themes** - 两行代码实现完美的深色模式

### 📋 表单与验证
- **🎣 React Hook Form** - 高性能表单，易于验证
- **✅ Zod** - TypeScript 优先的架构验证

### 🔄 状态管理与数据获取
- **🐻 Zustand** - 简单、可扩展的状态管理
- **🔄 TanStack Query** - 用于 React 的强大数据同步
- **🌐 Axios** - 基于 Promise 的 HTTP 客户端

### 🗄️ 数据库与后端
- **🗄️ Prisma** - 下一代 Node.js 和 TypeScript ORM
- **🔐 NextAuth.js** - 完整的开源认证解决方案

### 🎨 高级 UI 功能
- **📊 TanStack Table** - 用于构建表格和数据网格的无头 UI
- **🖱️ DND Kit** - 用于 React 的现代化拖拽工具包
- **📊 Recharts** - 使用 React 和 D3 构建的重新定义的图表库
- **🖼️ Sharp** - 高性能图像处理

### 🌍 国际化与工具
- **🌍 Next Intl** - Next.js 的国际化库
- **📅 Date-fns** - 现代化 JavaScript 日期工具库
- **🪝 ReactUse** - 用于现代开发的必备 React hooks 集合

## 🎯 为什么选择这个脚手架？

- **🏎️ 快速开发** - 预配置的工具和最佳实践
- **🎨 精美 UI** - 完整的 shadcn/ui 组件库，支持高级交互
- **🔒 类型安全** - 完整的 TypeScript 配置，支持 Zod 验证
- **📱 响应式** - 移动优先的设计原则，流畅动画
- **🗄️ 数据库就绪** - 为快速后端开发配置 Prisma ORM
- **🔐 认证集成** - 使用 NextAuth.js 的安全认证流程
- **📊 数据可视化** - 图表、表格和拖拽功能
- **🌍 i18n 就绪** - 使用 Next Intl 的多语言支持
- **🚀 生产就绪** - 优化的构建和部署设置
- **🤖 AI 友好** - 结构化的代码库，完美适配 AI 辅助

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

打开 [http://localhost:3000](http://localhost:3000) 查看您的应用程序运行。

## 🤖 由 Z.ai 驱动

此脚手架已针对 [Z.ai](https://chat.z.ai) 的使用进行了优化 - 您的 AI 助手可用于：

- **💻 代码生成** - 即时生成组件、页面和功能
- **🎨 UI 开发** - 使用 AI 辅助创建美观的界面
- **🔧 错误修复** - 通过智能建议识别和解决问题
- **📝 文档** - 自动生成完整文档
- **🚀 优化** - 性能改进和最佳实践

准备好构建令人惊叹的东西了吗？在 [chat.z.ai](https://chat.z.ai) 开始与 Z.ai 聊天，体验 AI 驱动开发的未来！

## 📁 项目结构

```
src/
├── app/                 # Next.js 应用路由页面
├── components/          # 可复用的 React 组件
│   └── ui/             # shadcn/ui 组件
├── hooks/              # 自定义 React hooks
└── lib/                # 工具函数和配置
```

## 🎨 可用功能和组件

这个脚手架包含了一套全面的现代 Web 开发工具：

### 🧩 UI 组件 (shadcn/ui)
- **布局**: 卡片、分隔符、宽高比、可调整大小面板
- **表单**: 输入框、文本域、选择框、复选框、单选组、开关
- **反馈**: 警告、提示(Toast)、进度条、骨架屏
- **导航**: 面包屑、菜单栏、导航菜单、分页
- **覆盖层**: 对话框、工作表、弹出框、工具提示、悬停卡片
- **数据展示**: 徽章、头像、日历

### 📊 高级数据功能
- **表格**: 强大的数据表格，支持排序、过滤、分页 (TanStack Table)
- **图表**: 使用 Recharts 实现美观的可视化
- **表单**: 使用 React Hook Form + Zod 验证的类型安全表单

### 🎨 交互功能
- **动画**: 使用 Framer Motion 实现流畅的微交互
- **拖拽**: 使用 DND Kit 实现现代化拖拽功能
- **主题切换**: 内置深色/浅色模式支持

### 🔐 后端集成
- **认证**: 使用 NextAuth.js 的即用型认证流程
- **数据库**: 使用 Prisma 的类型安全数据库操作
- **API 客户端**: 使用 Axios + TanStack Query 的 HTTP 请求
- **状态管理**: 使用 Zustand 实现简单且可扩展的状态管理

### 🌍 生产功能
- **国际化**: 使用 Next Intl 的多语言支持
- **图像优化**: 使用 Sharp 的自动图像处理
- **类型安全**: 使用 Zod 验证的端到端 TypeScript
- **实用 Hooks**: 使用 ReactUse 的 100+ 个有用 React hooks，适用于常见模式

## 🤝 使用 Z.ai 开始

1. **克隆此脚手架** 以启动您的项目
2. **访问 [chat.z.ai](https://chat.z.ai)** 获取您的 AI 编程助手
3. **开始构建** 智能代码生成和辅助
4. **自信部署** 使用生产就绪的设置

---

用 ❤️ 为开发者社区构建。由 [Z.ai](https://chat.z.ai) 强力驱动 🚀