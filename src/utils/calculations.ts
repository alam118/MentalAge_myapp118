import type { QuizCategory, UserAnswer } from '@/types';
import { appConfig } from '@/config/appConfig';

const CATEGORIES = appConfig.quiz.categories as unknown as QuizCategory[];

type WeightRange = { min: number; max: number };

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const mean = (nums: number[]) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);

const standardDeviation = (nums: number[]) => {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  const variance = mean(nums.map((x) => (x - m) ** 2));
  return Math.sqrt(variance);
};

const normalizeWeight = (weight: number, range: WeightRange) => {
  const denom = range.max - range.min;
  if (denom <= 0) return 0;
  return clamp01((weight - range.min) / denom);
};

export interface CategoryBreakdown {
  category: QuizCategory;
  count: number;
  averageWeight: number;
  score01: number; // 0..1 normalized
}

export interface MentalAgeScoreResult {
  mentalAgeScore: number; // Fun scale (e.g., 10..40)
  confidenceLevel: number; // 0..100
  overallScore01: number; // 0..1
  categoryBreakdown: CategoryBreakdown[];
  answeredCount: number;
  totalQuestionsForConfidence: number;
}

/**
 * Computes a fun "Mental Age Score" based ONLY on the user's selected answer weights.
 * - No medical/scientific claims are made here.
 * - The quiz question data (questionService) controls the meaning of answer weights.
 */
export function computeMentalAgeScore(args: {
  answers: UserAnswer[];
  totalQuestions?: number;
  // IMPORTANT: should match how questionService assigns weights.
  weightRange?: WeightRange; // default 1..5
  mentalAgeMin?: number; // default 10
  mentalAgeMax?: number; // default 40
}): MentalAgeScoreResult {
  const {
    answers,
    totalQuestions,
    weightRange = { min: 1, max: 5 },
    mentalAgeMin = 10,
    mentalAgeMax = 40,
  } = args;

  const answeredCount = answers.length;
  const totalForConfidence = totalQuestions && totalQuestions > 0 ? totalQuestions : Math.max(answeredCount, 1);

  // Build category aggregates
  const map = new Map<QuizCategory, { sum: number; count: number }>();
  for (const cat of CATEGORIES) map.set(cat, { sum: 0, count: 0 });

  for (const a of answers) {
    const bucket = map.get(a.category);
    if (!bucket) continue;
    bucket.sum += a.weight;
    bucket.count += 1;
  }

  const breakdown: CategoryBreakdown[] = CATEGORIES.map((category) => {
    const bucket = map.get(category)!;
    const averageWeight = bucket.count ? bucket.sum / bucket.count : 0;
    const score01 = bucket.count ? normalizeWeight(averageWeight, weightRange) : 0;
    return { category, count: bucket.count, averageWeight, score01 };
  });

  // Overall score: weighted by how many answers came from each category
  const totalAnsweredInCategories = breakdown.reduce((acc, b) => acc + b.count, 0) || 1;

  const overallScore01 = breakdown.reduce((acc, b) => {
    const w = b.count / totalAnsweredInCategories;
    return acc + b.score01 * w;
  }, 0);

  // Fun mental age scale mapping
  const mentalAgeScore = Math.round(mentalAgeMin + overallScore01 * (mentalAgeMax - mentalAgeMin));

  // Confidence: based on coverage + amount of answers + "signal quality"
  const answeredRatio = clamp(answeredCount / totalForConfidence, 0, 1);

  const categoryCoverage = (() => {
    const covered = breakdown.filter((b) => b.count > 0).length;
    return covered / Math.max(1, breakdown.length);
  })();

  const stdevOfCategoryScores = (() => {
    const samples = breakdown.filter((b) => b.count > 0).map((b) => b.score01);
    return standardDeviation(samples);
  })();

  // signalQuality: how far from "neutral" (0.5) the profile feels
  const signalQuality = clamp01(Math.abs(overallScore01 - 0.5) * 2); // 0..1

  // stdev mapping: moderate variety can feel more "decisive"
  // (very low variety => ambiguous; very high variety => can be inconsistent)
  const stdevNormalized = clamp01(stdevOfCategoryScores / 0.25);

  // Weighted confidence model (0..100)
  const confidence =
    100 *
    (0.55 * answeredRatio +
      0.25 * categoryCoverage +
      0.12 * signalQuality +
      0.08 * stdevNormalized);

  const confidenceLevel = Math.round(clamp(confidence, 0, 100));

  return {
    mentalAgeScore,
    confidenceLevel,
    overallScore01: clamp01(overallScore01),
    categoryBreakdown: breakdown,
    answeredCount,
    totalQuestionsForConfidence: totalForConfidence,
  };
}

/**
 * Returns simple comparison metadata for UI graphs (safe, non-medical, positive wording handled by UI).
 */
export function compareMentalAgeToChronological(args: {
  mentalAgeScore: number;
  chronologicalAge: number;
  graphMin?: number;
  graphMax?: number;
}): {
  delta: number; // mentalAge - chronological
  comparisonLabel: 'ahead' | 'in-sync' | 'behind';
  deltaAbs: number;
} {
  const { mentalAgeScore, chronologicalAge, graphMin = 10, graphMax = 40 } = args;

  // Clamp to graph scale for consistent presentation
  const m = clamp(mentalAgeScore, graphMin, graphMax);
  const c = clamp(chronologicalAge, graphMin, graphMax);

  const delta = m - c;
  const deltaAbs = Math.abs(delta);

  // Thresholds tuned for a fun display rather than "accuracy"
  // - within ±2 years => in sync
  const comparisonLabel = deltaAbs <= 2 ? 'in-sync' : delta > 0 ? 'ahead' : 'behind';

  return { delta, comparisonLabel, deltaAbs };
}
