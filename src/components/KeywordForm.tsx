'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface KeywordFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function KeywordForm({ onSearch, isLoading }: KeywordFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-300" />
        <div className="relative flex items-center">
          <div className="absolute left-6 z-10">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入种子关键词，例如：运动鞋、减肥方法、Python教程..."
            className="w-full pl-16 pr-32 py-6 text-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder:text-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-3 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>分析中</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>智能挖掘</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[
          '电商产品', 'AI工具', '健身减肥', '编程学习', '投资理财', 
          '旅游攻略', '美食制作', '护肤美妆'
        ].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setQuery(example)}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
            disabled={isLoading}
          >
            {example}
          </button>
        ))}
      </div>
    </form>
  );
}