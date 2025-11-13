# SEO Keyword Miner

🚀 基于5118百亿词库和DeepSeek AI的智能SEO关键词挖掘工具

## ✨ 功能特色

- **🔍 智能挖掘**: 基于5118海量数据库，挖掘高价值长尾关键词
- **🤖 AI分析**: 集成DeepSeek AI，提供智能关键词分析和建议  
- **📊 数据可视化**: 流量指数、竞争度、SEM价格等多维度数据展示
- **💎 苹果设计**: 参考苹果官网风格，极简美观的用户界面
- **📱 响应式**: 完美适配桌面端和移动端
- **⚡ 实时监控**: 集成飞书机器人，实时推送关键词挖掘报告

## 🛠️ 技术栈

- **前端**: Next.js 16 + TypeScript + Tailwind CSS
- **UI组件**: Lucide React + 自定义设计系统
- **API集成**: 5118长尾词API + DeepSeek AI API
- **部署**: Vercel + GitHub Actions CICD
- **监控**: 飞书机器人通知

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件：
```env
DEEPSEEK_API_KEY=your-deepseek-api-key
API_5118_KEY=your-5118-api-key
FEISHU_WEBHOOK_URL=your-feishu-webhook-url
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📋 主要功能

### 1. 关键词智能挖掘
- 输入种子关键词，自动挖掘相关长尾词
- 支持多维度排序（流量指数、竞争度、SEM价格）
- 批量数据导出CSV格式

### 2. 数据分析展示
- 流量指数趋势分析
- 竞争度评估
- 移动端/PC端搜索量对比
- 商业价值评估

### 3. AI智能建议
- DeepSeek AI分析关键词商业潜力
- 优化建议和策略推荐
- 竞争对手分析

### 4. 实时监控
- 飞书机器人推送关键词挖掘报告
- 自动监控热门关键词变化
- 数据异常提醒

## 🔧 部署配置

### Vercel部署
1. 在Vercel中导入此GitHub仓库
2. 配置环境变量
3. 自动部署完成

### GitHub Actions CICD
- 代码推送自动触发部署
- 自动运行测试和构建
- 零宕机时间更新

## 📊 API接口

### 关键词挖掘接口
```typescript
POST /api/keywords
{
  "keyword": "your-seed-keyword"
}
```

返回数据结构：
```typescript
{
  "keywords": [
    {
      "keyword": "关键词",
      "index": 1000,
      "mobile_index": 800,
      "competition": 2,
      "sem_price": "0.50~3.20",
      "ai_analysis": "AI分析结果"
    }
  ],
  "total": 20
}
```

## 🎯 使用场景

- **SEO优化师**: 挖掘高价值关键词，提升网站排名
- **内容创作者**: 发现热门话题，制作爆款内容
- **电商卖家**: 分析产品关键词，优化商品标题
- **数字营销**: 竞价广告关键词选择和优化
- **市场研究**: 行业趋势分析和机会发现

## 🔮 产品路线图

- [x] 基础关键词挖掘功能
- [x] AI智能分析
- [x] 数据可视化展示  
- [x] CSV数据导出
- [x] 飞书机器人集成
- [ ] 关键词竞争对手分析
- [ ] 长尾词聚类分析
- [ ] 历史数据趋势图表
- [ ] 多平台数据源集成
- [ ] 用户系统和付费订阅

## 💝 开源协议

MIT License

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

---

🌟 **如果这个项目对您有帮助，请给一个Star支持！**
