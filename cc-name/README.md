# CC Name 起名系统

基于 AI 的中文取名系统，融合传统文化与现代审美。

## 功能特点

- 基于出生日期和五行元素生成中文名字
- 多语言支持（中文、英文、法语等）
- 提供名字含义、取名理由和相关诗句
- 五行元素分析

## 技术栈

- Next.js 15
- React
- TypeScript
- Framer Motion (动画效果)
- DashScope API (生成名字)
- 百度翻译 API (多语言支持)

## 百度翻译 API 集成

本项目使用百度翻译 API 将生成的中文名字内容翻译成其他语言。

### 集成方式

1. 使用百度翻译通用文本翻译 API（[https://fanyi-api.baidu.com/product/113](https://fanyi-api.baidu.com/product/113)）
2. 支持将生成的名字解释、典故、诗歌等内容翻译成多种语言
3. 使用服务端翻译，确保用户隐私和数据安全

### 配置方法

1. 在百度翻译开放平台申请 API 账号和密钥
2. 在项目根目录创建`.env.local`文件，参考`.env.example`
3. 填入您的百度翻译 APP ID 和密钥：

```
BAIDU_APP_ID=your-baidu-app-id
BAIDU_APP_KEY=your-baidu-app-key
```

## 本地开发

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

## 部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 架构说明

- `src/services/translation`: 包含百度翻译相关服务

  - `baidu-translator.ts`: 百度翻译 API 的核心实现
  - `name-translator.ts`: 名字结果的翻译处理逻辑

- `src/app/api/generate-name`: 名字生成 API 端点，集成了翻译功能

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
