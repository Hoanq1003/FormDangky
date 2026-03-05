'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Copy, Plus } from 'lucide-react';
import { useState } from 'react';

interface SuccessScreenProps {
    submissionCode: string;
    itemCount: number;
    onNewRegistration: () => void;
}

export default function SuccessScreen({
    submissionCode,
    itemCount,
    onNewRegistration,
}: SuccessScreenProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(submissionCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <div className="animate-slide-in text-center">
            {/* Success animation */}
            <div className="mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-bounce-in">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-stone-800 mb-2">
                Đăng ký thành công! 🎉
            </h2>
            <p className="text-stone-500 mb-6">
                Bạn đã đăng ký <strong className="text-amber-600">{itemCount} mục</strong> thành công.
            </p>

            {/* Submission code */}
            <Card className="mb-6 border-2 border-emerald-200 bg-emerald-50/50">
                <CardContent className="p-5">
                    <p className="text-sm text-stone-500 mb-2">Mã đăng ký của bạn</p>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-mono font-bold text-emerald-700 tracking-wider">
                            {submissionCode}
                        </span>
                        <Button size="sm" variant="outline" onClick={copyCode} className="h-8 gap-1">
                            <Copy className="w-3.5 h-3.5" />
                            {copied ? 'Đã sao chép' : 'Sao chép'}
                        </Button>
                    </div>
                    <p className="text-xs text-stone-400 mt-2">
                        Vui lòng lưu lại mã này để tiện tra cứu sau.
                    </p>
                </CardContent>
            </Card>

            <Button onClick={onNewRegistration} variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Tạo đăng ký mới
            </Button>
        </div>
    );
}
