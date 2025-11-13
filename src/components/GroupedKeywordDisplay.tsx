'use client';

import { Trophy, TrendingUp, Target, BarChart3, Star, Crown } from 'lucide-react';

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

interface GroupedKeywordDisplayProps {
  keywordGroups: KeywordGroups;
  isLoading: boolean;
}

const getCompetitionBadge = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getCompetitionText = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return '🟢 低竞争';
    case 'medium':
      return '🟡 中竞争';
    case 'high':
      return '🔴 高竞争';
    default:
      return '未知';
  }
};

const KeywordCard = ({ keyword, showGoldenScore = false }: { keyword: Keyword; showGoldenScore?: boolean }) => (
  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {keyword.keyword}
        </h4>
        {showGoldenScore && (
          <div className="flex items-center space-x-2 mt-1">
            <Crown className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              黄金评分: {keyword.golden_score}分
            </span>
          </div>
        )}
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionBadge(keyword.competition_level!)}`}>
        {getCompetitionText(keyword.competition_level!)}
      </span>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-3">
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">流量指数</p>
        <p className="font-bold text-blue-600 dark:text-blue-400">{keyword.index.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">移动指数</p>
        <p className="font-bold text-purple-600 dark:text-purple-400">{keyword.mobile_index.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">SEM价格</p>
        <p className="font-bold text-green-600 dark:text-green-400">¥{keyword.sem_price}</p>
      </div>
    </div>

    {keyword.recommendation_reason && (
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {keyword.recommendation_reason}
        </p>
      </div>
    )}

    {keyword.ai_analysis && (
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          {keyword.ai_analysis}
        </p>
      </div>
    )}
  </div>
);

export function GroupedKeywordDisplay({ keywordGroups, isLoading }: GroupedKeywordDisplayProps) {
  if (isLoading) {
    return <div className="animate-pulse">加载中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 黄金关键词区域 */}
      {keywordGroups.golden.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                🏆 黄金关键词 ({keywordGroups.golden.length}个)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">高价值低竞争，优先推荐</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keywordGroups.golden.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} showGoldenScore={true} />
            ))}
          </div>
        </div>
      )}

      {/* 高价值关键词区域 */}
      {keywordGroups.highValue.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                📈 高价值关键词 ({keywordGroups.highValue.length}个)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">流量大但竞争可能激烈</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keywordGroups.highValue.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} />
            ))}
          </div>
        </div>
      )}

      {/* 低竞争关键词区域 */}
      {keywordGroups.lowCompetition.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                🎯 低竞争关键词 ({keywordGroups.lowCompetition.length}个)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">容易优化，适合新站</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keywordGroups.lowCompetition.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} />
            ))}
          </div>
        </div>
      )}

      {/* 其他关键词区域 */}
      {keywordGroups.others.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                📋 其他关键词 ({keywordGroups.others.length}个)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">完整关键词列表</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {keywordGroups.others.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}