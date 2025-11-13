// 关键词评分和排序算法
export interface Keyword {
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
  golden_score?: number;
  value_score?: number;
  competition_level?: 'low' | 'medium' | 'high';
  recommendation_reason?: string;
}

// 计算价值评分 (0-100分)
export function calculateValueScore(keyword: Keyword): number {
  const { index, mobile_index, long_keyword_count, sem_price } = keyword;
  
  // 解析SEM价格范围，取平均值
  const priceMatch = sem_price.match(/(\d+\.?\d*)/g);
  const avgPrice = priceMatch ? 
    (parseFloat(priceMatch[0]) + parseFloat(priceMatch[1] || priceMatch[0])) / 2 : 0;
  
  // 各维度权重
  const weights = {
    traffic: 0.4,      // 流量指数权重40%
    mobile: 0.3,       // 移动指数权重30% 
    longtail: 0.2,     // 长尾词数量权重20%
    commercial: 0.1    // 商业价值权重10%
  };
  
  // 标准化分数 (0-100)
  const trafficScore = Math.min(index / 2000 * 100, 100);
  const mobileScore = Math.min(mobile_index / 1500 * 100, 100);
  const longtailScore = Math.min(long_keyword_count / 50000 * 100, 100);
  const commercialScore = Math.min(avgPrice / 10 * 100, 100);
  
  const totalScore = 
    trafficScore * weights.traffic +
    mobileScore * weights.mobile +
    longtailScore * weights.longtail +
    commercialScore * weights.commercial;
    
  return Math.round(totalScore);
}

// 获取竞争等级
export function getCompetitionLevel(keyword: Keyword): 'low' | 'medium' | 'high' {
  const { bidword_kwc, bidword_company_count } = keyword;
  
  // 综合考虑5118竞争度和竞价公司数量
  if (bidword_kwc === 3 && bidword_company_count <= 5) return 'low';
  if (bidword_kwc === 3 || (bidword_kwc === 2 && bidword_company_count <= 10)) return 'medium';
  return 'high';
}

// 计算竞争折扣系数
export function getCompetitionDiscount(level: 'low' | 'medium' | 'high'): number {
  const discounts = {
    low: 1.0,     // 低竞争不打折
    medium: 0.7,  // 中等竞争打7折
    high: 0.4     // 高竞争打4折
  };
  return discounts[level];
}

// 计算黄金评分
export function calculateGoldenScore(keyword: Keyword): number {
  const valueScore = calculateValueScore(keyword);
  const competitionLevel = getCompetitionLevel(keyword);
  const discount = getCompetitionDiscount(competitionLevel);
  
  return Math.round(valueScore * discount);
}

// 生成推荐理由
export function generateRecommendationReason(keyword: Keyword): string {
  const competitionLevel = getCompetitionLevel(keyword);
  const valueScore = calculateValueScore(keyword);
  const goldenScore = calculateGoldenScore(keyword);
  
  let reason = '';
  
  if (goldenScore >= 80) {
    reason = '🏆 黄金关键词！';
  } else if (goldenScore >= 60) {
    reason = '⭐ 优质关键词';
  } else if (competitionLevel === 'low') {
    reason = '🎯 低竞争易优化';
  } else {
    reason = '📈 高流量需努力';
  }
  
  const details = [];
  if (competitionLevel === 'low') details.push('竞争较低');
  if (valueScore >= 70) details.push('价值较高');
  if (keyword.index >= 1000) details.push('搜索量大');
  if (keyword.long_keyword_count >= 30000) details.push('扩展机会多');
  
  return details.length > 0 ? `${reason} (${details.join('、')})` : reason;
}

// 关键词排序算法
export function sortKeywordsByGoldenScore(keywords: Keyword[]): Keyword[] {
  return keywords
    .map(kw => ({
      ...kw,
      value_score: calculateValueScore(kw),
      competition_level: getCompetitionLevel(kw),
      golden_score: calculateGoldenScore(kw),
      recommendation_reason: generateRecommendationReason(kw)
    }))
    .sort((a, b) => {
      // 主排序：黄金分数降序
      if (b.golden_score !== a.golden_score) {
        return b.golden_score! - a.golden_score!;
      }
      
      // 次排序：竞争度升序 (低竞争优先)
      const competitionOrder = { low: 0, medium: 1, high: 2 };
      if (competitionOrder[a.competition_level!] !== competitionOrder[b.competition_level!]) {
        return competitionOrder[a.competition_level!] - competitionOrder[b.competition_level!];
      }
      
      // 最终排序：价值分数降序
      return b.value_score! - a.value_score!;
    });
}

// 关键词分组
export function groupKeywordsByCategory(keywords: Keyword[]) {
  const golden = keywords.filter(kw => kw.golden_score! >= 70);
  const highValue = keywords.filter(kw => kw.value_score! >= 70 && kw.golden_score! < 70);
  const lowCompetition = keywords.filter(kw => kw.competition_level === 'low' && kw.golden_score! < 70 && kw.value_score! < 70);
  const others = keywords.filter(kw => !golden.includes(kw) && !highValue.includes(kw) && !lowCompetition.includes(kw));
  
  return {
    golden,
    highValue, 
    lowCompetition,
    others,
    all: keywords
  };
}