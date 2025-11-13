'use client';

import { TrendingUp, Users, Target, DollarSign, Trophy, Zap } from 'lucide-react';

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
}

interface KeywordGroups {
  golden: Keyword[];
  highValue: Keyword[];
  lowCompetition: Keyword[];
  others: Keyword[];
  all: Keyword[];
}

interface Stats {
  golden_count: number;
  high_value_count: number;
  low_competition_count: number;
  avg_golden_score: number;
}

interface StatsOverviewProps {
  keywords: Keyword[];
  keywordGroups?: KeywordGroups | null;
  stats?: Stats | null;
  isLoading: boolean;
}

export function StatsOverview({ keywords, keywordGroups, stats, isLoading }: StatsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                </div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (keywords.length === 0) {
    return null;
  }

  const totalIndex = keywords.reduce((sum, kw) => sum + kw.index, 0);
  const avgMobileIndex = keywords.length > 0 ? Math.round(keywords.reduce((sum, kw) => sum + kw.mobile_index, 0) / keywords.length) : 0;
  const totalLongTail = keywords.reduce((sum, kw) => sum + kw.long_keyword_count, 0);
  const avgGoldenScore = stats?.avg_golden_score || 0;
  const goldenCount = stats?.golden_count || 0;
  const lowCompetitionCount = stats?.low_competition_count || 0;

  const statCards = [
    {
      icon: Trophy,
      label: '🏆 黄金关键词',
      value: goldenCount.toString(),
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      description: '高价值低竞争'
    },
    {
      icon: Zap,
      label: '平均黄金评分',
      value: `${avgGoldenScore}分`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50',
      iconColor: 'text-purple-600 dark:text-purple-400',
      description: '综合性价比'
    },
    {
      icon: TrendingUp,
      label: '总流量指数',
      value: totalIndex.toLocaleString(),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
      iconColor: 'text-blue-600 dark:text-blue-400',
      description: '搜索热度总和'
    },
    {
      icon: Users,
      label: '平均移动指数',
      value: avgMobileIndex.toLocaleString(),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50',
      iconColor: 'text-green-600 dark:text-green-400',
      description: '移动端机会'
    },
    {
      icon: Target,
      label: '低竞争词数',
      value: lowCompetitionCount.toString(),
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      description: '易优化机会'
    },
    {
      icon: DollarSign,
      label: '长尾词机会',
      value: totalLongTail > 1000000 ? `${(totalLongTail / 1000000).toFixed(1)}M` : `${Math.round(totalLongTail / 1000)}K`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50',
      iconColor: 'text-orange-600 dark:text-orange-400',
      description: '扩展潜力'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 truncate">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {stat.description}
              </p>
            </div>
          </div>
          
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
        </div>
      ))}
    </div>
  );
}