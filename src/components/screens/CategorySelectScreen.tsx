'use client';

import { CATEGORIES } from '@/config/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import type { CategoryKey, SubmissionItem } from '@/types';

interface CategorySelectScreenProps {
    existingItems: SubmissionItem[];
    onSelect: (key: CategoryKey) => void;
    onHelperFlow: () => void;
    onBack: () => void;
}

export default function CategorySelectScreen({
    existingItems,
    onSelect,
    onHelperFlow,
    onBack,
}: CategorySelectScreenProps) {
    // Count items per category
    const countMap = existingItems.reduce<Record<string, number>>((acc, item) => {
        acc[item.categoryKey] = (acc[item.categoryKey] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">📋</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Chọn mục đăng ký</h2>
                    <p className="text-sm text-stone-500">Bước 2 — Chọn loại mục bạn muốn đăng ký</p>
                </div>
            </div>

            {existingItems.length > 0 && (
                <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-sm text-amber-700">
                        ✨ Bạn đã thêm <strong>{existingItems.length}</strong> mục.
                        Chọn thêm mục khác hoặc{' '}
                        <button
                            onClick={onBack}
                            className="text-amber-600 underline font-medium"
                        >
                            xem lại danh sách
                        </button>.
                    </p>
                </div>
            )}

            <div className="space-y-3">
                {CATEGORIES.map((cat) => (
                    <Card
                        key={cat.key}
                        className="cursor-pointer hover:shadow-md hover:border-amber-200 group transition-all duration-200"
                        onClick={() => onSelect(cat.key)}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl mt-1">{cat.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-stone-800 text-sm leading-tight">
                                            {cat.label}
                                        </h3>
                                        {countMap[cat.key] && (
                                            <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                                {countMap[cat.key]} đã thêm
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-stone-500 mb-1">{cat.helperText}</p>
                                    <p className="text-xs text-amber-600 font-medium">
                                        💡 {cat.chooseIfText}
                                    </p>
                                    <p className="text-[11px] text-stone-400 mt-1 italic">
                                        {cat.exampleText}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-amber-500 transition-colors mt-2 flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Helper flow card */}
                <Card
                    className="cursor-pointer hover:shadow-md hover:border-blue-200 group transition-all duration-200 border-dashed"
                    onClick={onHelperFlow}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <HelpCircle className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-700 text-sm">
                                    Tôi chưa chắc mình thuộc mục nào
                                </h3>
                                <p className="text-xs text-stone-500">
                                    Trả lời vài câu hỏi đơn giản để chúng tôi gợi ý mục phù hợp
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Button variant="outline" onClick={onBack} className="w-full gap-2">
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                </Button>
            </div>
        </div>
    );
}
