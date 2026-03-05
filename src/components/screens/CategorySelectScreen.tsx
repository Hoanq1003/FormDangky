'use client';

import { CATEGORIES } from '@/config/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { CategoryKey, SubmissionItem } from '@/types';

interface CategorySelectScreenProps {
    items: SubmissionItem[];
    onSelect: (key: CategoryKey) => void;
    onBack: () => void;
}

export default function CategorySelectScreen({ items, onSelect, onBack }: CategorySelectScreenProps) {
    const itemCounts = items.reduce((acc, item) => {
        acc[item.categoryKey] = (acc[item.categoryKey] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">📋</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Chọn mục đăng ký</h2>
                    <p className="text-sm text-stone-500">Bước 3 — Chọn loại mục bạn muốn đăng ký</p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {CATEGORIES.map((cat) => {
                    const count = itemCounts[cat.key] || 0;
                    return (
                        <Card
                            key={cat.key}
                            className="cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                            onClick={() => onSelect(cat.key)}
                        >
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">
                                    {cat.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-stone-800 text-sm">
                                            {cat.label}
                                        </h3>
                                        {count > 0 && (
                                            <Badge variant="default" className="text-[10px]">
                                                {count} mục
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-stone-500 mt-0.5">{cat.helperText}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-stone-300 flex-shrink-0" />
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Button type="button" variant="outline" onClick={onBack} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
            </Button>
        </div>
    );
}
