'use client';

import { useState } from 'react';
import { Search, TrendingUp, Target, Download, BarChart3, Lightbulb, Zap } from 'lucide-react';
import { KeywordForm } from '@/components/KeywordForm';
import { KeywordResults } from '@/components/KeywordResults';
import { StatsOverview } from '@/components/StatsOverview';

export default function HomePage() {
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: query }),
      });
      
      const data = await response.json();
      setKeywords(data.keywords || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  SEO Keyword Miner
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>智能分析</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>精准挖掘</span>
                </span>
                <span className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>数据可视化</span>
                </span>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-8">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  基于5118百亿词库 × DeepSeek AI分析
                </span>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  智能挖掘
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SEO关键词
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                结合海量数据分析与AI智能洞察，帮您发现高价值长尾关键词，
                <br className="hidden sm:block" />
                提升网站流量与搜索排名
              </p>

              {/* Search Form */}
              <div className="max-w-2xl mx-auto mb-16">
                <KeywordForm onSearch={handleSearch} isLoading={isLoading} />
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: TrendingUp, label: '流量指数分析' },
                  { icon: Target, label: '竞争度评估' },
                  { icon: Lightbulb, label: 'AI智能建议' },
                  { icon: Download, label: '数据导出' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <feature.icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {(keywords.length > 0 || isLoading) && (
        <div className="px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {searchQuery && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  "{searchQuery}" 的关键词分析结果
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  基于5118数据库和AI分析，为您挖掘到以下高价值关键词
                </p>
              </div>
            )}
            
            <StatsOverview keywords={keywords} isLoading={isLoading} />
            <KeywordResults keywords={keywords} isLoading={isLoading} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 SEO Keyword Miner. Powered by 5118 API & DeepSeek AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
