'use client';

import { TrendingUp, Users, DollarSign, Target, Zap, Download, ToggleLeft, ToggleRight } from 'lucide-react';
import { GroupedKeywordDisplay } from '@/components/GroupedKeywordDisplay';
import { useState } from 'react';

interface Keyword {
  keyword: string;
  index: number;
  mobile_index: number;
  haosou_index: number;
  long_keyword_count: number;
  bidword_company_count: number;
  bidword_kwc: number;
  bidword_pcpv: number;
  bidword_wisepv: number;
  sem_price: string;
  golden_score?: number;
  value_score?: number;
  competition_level?: 'low' | 'medium' | 'high';
  recommendation_reason?: string;
  ai_analysis?: string;
}

interface KeywordGroups {
  golden: Keyword[];
  highValue: Keyword[];
  lowCompetition: Keyword[];
  others: Keyword[];
  all: Keyword[];
}

interface KeywordResultsProps {
  keywords: Keyword[];
  keywordGroups?: KeywordGroups | null;
  isLoading: boolean;
}

export function KeywordResults({ keywords, keywordGroups, isLoading }: KeywordResultsProps) {
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');
  const exportToCSV = () => {
    if (keywords.length === 0) return;
    
    const csvContent = [
      ['关键词', '黄金评分', '价值评分', '竞争等级', '流量指数', '移动指数', '360指数', '长尾词数量', '竞价公司数', 'PC检索量', '移动检索量', 'SEM价格', '推荐理由', 'AI分析'].join(','),
      ...keywords.map(kw => [
        kw.keyword,
        kw.golden_score || 0,
        kw.value_score || 0,
        kw.competition_level === 'low' ? '低' : kw.competition_level === 'medium' ? '中' : '高',
        kw.index,
        kw.mobile_index,
        kw.haosou_index,
        kw.long_keyword_count,
        kw.bidword_company_count,
        kw.bidword_pcpv,
        kw.bidword_wisepv,
        kw.sem_price,
        kw.recommendation_reason || '',
        kw.ai_analysis || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `关键词分析_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (keywords.length === 0) {
    return null;
  }

  const getCompetitionColor = (level: number) => {
    switch (level) {
      case 1: return 'text-red-600 bg-red-50 dark:bg-red-950/50';
      case 2: return 'text-orange-600 bg-orange-50 dark:bg-orange-950/50';
      case 3: return 'text-green-600 bg-green-50 dark:bg-green-950/50';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getCompetitionText = (level: number) => {
    switch (level) {
      case 1: return '竞争激烈';
      case 2: return '竞争适中';
      case 3: return '竞争较低';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          关键词分析结果 ({keywords.length} 个)
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grouped')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'grouped' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {viewMode === 'grouped' ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
              <span className="text-sm">分组视图</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {viewMode === 'list' ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
              <span className="text-sm">列表视图</span>
            </button>
          </div>
          
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>导出CSV</span>
          </button>
        </div>
      </div>

      {/* 分组视图 */}
      {viewMode === 'grouped' && keywordGroups && (
        <GroupedKeywordDisplay keywordGroups={keywordGroups} isLoading={isLoading} />
      )}

      {/* 列表视图 - 保留原有的详细列表 */}
      {viewMode === 'list' && (
        <div className="grid gap-4">
          {keywords.map((keyword, index) => (
            <KeywordDetailCard key={index} keyword={keyword} />
          ))}
        </div>
      )}
    </div>
  );
}

// 详细关键词卡片组件
const KeywordDetailCard = ({ keyword }: { keyword: Keyword }) => {
  const getCompetitionColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-950/50';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-950/50';
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950/50';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getCompetitionText = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return '竞争较低';
      case 'medium': return '竞争适中';
      case 'high': return '竞争激烈';
      default: return '未知';
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {keyword.keyword}
            </h4>
            {keyword.golden_score && keyword.golden_score >= 70 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium rounded-full">
                🏆 黄金词
              </span>
            )}
          </div>
          
          {keyword.recommendation_reason && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {keyword.recommendation_reason}
              </p>
            </div>
          )}

          {keyword.ai_analysis && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-2">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {keyword.ai_analysis}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {keyword.golden_score ? `黄金评分 ${keyword.golden_score}` : '流量指数'}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {keyword.golden_score || keyword.index.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-100">移动指数</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {keyword.mobile_index.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">长尾词数</span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {keyword.long_keyword_count.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">SEM价格</span>
              </div>
              <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                ¥{keyword.sem_price}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(keyword.competition_level!)}`}>
            {getCompetitionText(keyword.competition_level!)}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
        <span>竞价公司: {keyword.bidword_company_count}</span>
        <span>PC日检索: {keyword.bidword_pcpv.toLocaleString()}</span>
        <span>移动日检索: {keyword.bidword_wisepv.toLocaleString()}</span>
        <span>360指数: {keyword.haosou_index.toLocaleString()}</span>
        {keyword.value_score && <span>价值评分: {keyword.value_score}</span>}
      </div>
    </div>
  );
}