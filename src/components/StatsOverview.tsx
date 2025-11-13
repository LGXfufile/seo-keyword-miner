'use client';

import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

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
}

interface StatsOverviewProps {
  keywords: Keyword[];
  isLoading: boolean;
}

export function StatsOverview({ keywords, isLoading }: StatsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
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
  const avgMobileIndex = Math.round(keywords.reduce((sum, kw) => sum + kw.mobile_index, 0) / keywords.length);
  const totalLongTail = keywords.reduce((sum, kw) => sum + kw.long_keyword_count, 0);
  const avgCompetition = keywords.filter(kw => kw.bidword_kwc === 3).length / keywords.length * 100;

  const stats = [
    {
      icon: TrendingUp,
      label: '总流量指数',
      value: totalIndex.toLocaleString(),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Users,
      label: '平均移动指数',
      value: avgMobileIndex.toLocaleString(),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Target,
      label: '长尾词机会',
      value: totalLongTail.toLocaleString(),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: DollarSign,
      label: '低竞争机会',
      value: `${Math.round(avgCompetition)}%`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                {stat.value}
              </p>
            </div>
          </div>
          
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
        </div>
      ))}
    </div>
  );
}