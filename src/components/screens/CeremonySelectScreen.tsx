'use client';

import { CEREMONY_TYPES } from '@/config/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { CeremonyType } from '@/types';

interface CeremonySelectScreenProps {
    selected: CeremonyType | null;
    onSelect: (type: CeremonyType) => void;
    onBack: () => void;
}

export default function CeremonySelectScreen({ selected, onSelect, onBack }: CeremonySelectScreenProps) {
    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">📿</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Chọn loại cầu siêu</h2>
                    <p className="text-sm text-stone-500">Bước 1 — Chọn hình thức cầu siêu</p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {CEREMONY_TYPES.map((ceremony) => (
                    <Card
                        key={ceremony.key}
                        className={`cursor-pointer transition-all active:scale-[0.98] ${selected === ceremony.key
                                ? 'ring-2 ring-amber-500 bg-amber-50/50'
                                : 'hover:shadow-md'
                            }`}
                        onClick={() => onSelect(ceremony.key)}
                    >
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">
                                {ceremony.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-stone-800 text-base">
                                    {ceremony.label}
                                </h3>
                                <p className="text-sm text-stone-500 mt-0.5">
                                    {ceremony.description}
                                </p>
                            </div>
                            <ChevronRight className={`w-5 h-5 flex-shrink-0 ${selected === ceremony.key ? 'text-amber-500' : 'text-stone-300'
                                }`} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
                </Button>
            </div>
        </div>
    );
}
