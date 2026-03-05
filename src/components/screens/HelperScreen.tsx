'use client';

import { useState } from 'react';
import { HELPER_QUESTIONS, CATEGORY_MAP, CATEGORIES } from '@/config/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import type { CategoryKey } from '@/types';

interface HelperScreenProps {
    onSelectCategory: (key: CategoryKey) => void;
    onBackToManual: () => void;
}

export default function HelperScreen({ onSelectCategory, onBackToManual }: HelperScreenProps) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendation, setRecommendation] = useState<CategoryKey | null>(null);

    const questions = HELPER_QUESTIONS;
    const question = questions[currentQ];

    const calculateRecommendation = (allAnswers: Record<string, string>): CategoryKey => {
        const scores: Record<string, number> = {};

        CATEGORIES.forEach((cat) => {
            scores[cat.key] = 0;
        });

        questions.forEach((q) => {
            const answer = allAnswers[q.id];
            if (!answer) return;
            const option = q.options.find((o) => o.value === answer);
            if (!option) return;
            Object.entries(option.points).forEach(([key, pts]) => {
                scores[key] = (scores[key] || 0) + (pts || 0);
            });
        });

        // Find highest scoring category
        let maxKey: CategoryKey = 'hl_trong_49_ngay';
        let maxScore = 0;
        Object.entries(scores).forEach(([key, score]) => {
            if (score > maxScore) {
                maxScore = score;
                maxKey = key as CategoryKey;
            }
        });

        return maxKey;
    };

    const selectOption = (value: string) => {
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            // Calculate recommendation
            const rec = calculateRecommendation(newAnswers);
            setRecommendation(rec);
        }
    };

    if (recommendation) {
        const cat = CATEGORY_MAP[recommendation];
        return (
            <div className="animate-slide-in">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-stone-800">Gợi ý cho bạn</h2>
                    <p className="text-sm text-stone-500 mt-1">
                        Dựa trên câu trả lời của bạn, mục phù hợp nhất là:
                    </p>
                </div>

                <Card className="mb-4 border-2 border-amber-200">
                    <CardContent className="p-5 text-center">
                        <span className="text-4xl mb-3 block">{cat.icon}</span>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">{cat.label}</h3>
                        <p className="text-sm text-stone-500 mb-2">{cat.helperText}</p>
                        <p className="text-xs text-amber-600">💡 {cat.chooseIfText}</p>
                    </CardContent>
                </Card>

                <p className="text-xs text-stone-400 text-center mb-4">
                    Đây chỉ là gợi ý. Bạn hoàn toàn có thể chọn mục khác.
                </p>

                <div className="space-y-3">
                    <Button onClick={() => onSelectCategory(recommendation)} className="w-full gap-2" size="lg">
                        Chọn mục này <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={onBackToManual} className="w-full gap-2">
                        <ArrowLeft className="w-4 h-4" /> Tự chọn mục khác
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">🤔</span>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-stone-800">Tìm mục phù hợp</h2>
                    <p className="text-sm text-stone-500">
                        Câu {currentQ + 1} / {questions.length}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 mb-6">
                <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
            </div>

            <h3 className="text-lg font-semibold text-stone-800 mb-4">{question.question}</h3>

            <div className="space-y-3">
                {question.options.map((opt) => (
                    <Card
                        key={opt.value}
                        className="cursor-pointer hover:shadow-md hover:border-amber-200 transition-all duration-200"
                        onClick={() => selectOption(opt.value)}
                    >
                        <CardContent className="p-4">
                            <p className="text-sm font-medium text-stone-700">{opt.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-3 mt-6">
                {currentQ > 0 && (
                    <Button variant="outline" onClick={() => setCurrentQ(currentQ - 1)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Câu trước
                    </Button>
                )}
                <Button variant="ghost" onClick={onBackToManual} className="ml-auto">
                    Tự chọn mục
                </Button>
            </div>
        </div>
    );
}
