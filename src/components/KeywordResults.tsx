'use client';

import { TrendingUp, Users, DollarSign, Target, Zap, Download } from 'lucide-react';

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
  ai_analysis?: string;
}

interface KeywordResultsProps {
  keywords: Keyword[];
  isLoading: boolean;
}

export function KeywordResults({ keywords, isLoading }: KeywordResultsProps) {
  const exportToCSV = () => {
    if (keywords.length === 0) return;
    
    const csvContent = [
      ['关键词', '流量指数', '移动指数', '360指数', '长尾词数量', '竞价公司数', '竞争度', 'PC检索量', '移动检索量', 'SEM价格', 'AI分析'].join(','),
      ...keywords.map(kw => [
        kw.keyword,
        kw.index,
        kw.mobile_index,
        kw.haosou_index,
        kw.long_keyword_count,
        kw.bidword_company_count,
        kw.bidword_kwc === 1 ? '高' : kw.bidword_kwc === 2 ? '中' : '低',
        kw.bidword_pcpv,
        kw.bidword_wisepv,
        kw.sem_price,
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
          关键词详细分析 ({keywords.length} 个)
        </h3>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          <span>导出CSV</span>
        </button>
      </div>

      <div className="grid gap-4">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {keyword.keyword}
                </h4>
                
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
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">流量指数</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {keyword.index.toLocaleString()}
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(keyword.bidword_kwc)}`}>
                  {getCompetitionText(keyword.bidword_kwc)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
              <span>竞价公司: {keyword.bidword_company_count}</span>
              <span>PC日检索: {keyword.bidword_pcpv.toLocaleString()}</span>
              <span>移动日检索: {keyword.bidword_wisepv.toLocaleString()}</span>
              <span>360指数: {keyword.haosou_index.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}