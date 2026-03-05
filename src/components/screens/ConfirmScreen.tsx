'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';

interface ConfirmScreenProps {
    itemCount: number;
    isSubmitting: boolean;
    error: string | null;
    onSubmit: () => void;
    onBack: () => void;
}

export default function ConfirmScreen({
    itemCount,
    isSubmitting,
    error,
    onSubmit,
    onBack,
}: ConfirmScreenProps) {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-xl">✅</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Xác nhận gửi đăng ký</h2>
                    <p className="text-sm text-stone-500">Bước cuối — Kiểm tra và xác nhận</p>
                </div>
            </div>

            <Card className="mb-6">
                <CardContent className="p-5">
                    <div className="text-center mb-4">
                        <p className="text-lg font-semibold text-stone-800">
                            Bạn sắp gửi <span className="text-amber-600">{itemCount} mục</span> đăng ký
                        </p>
                        <p className="text-sm text-stone-500 mt-1">
                            Sau khi gửi, bạn sẽ nhận được mã đăng ký để theo dõi.
                        </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <Checkbox
                            id="confirm"
                            checked={confirmed}
                            onCheckedChange={(v) => setConfirmed(v === true)}
                            className="mt-0.5"
                        />
                        <label htmlFor="confirm" className="text-sm text-stone-700 cursor-pointer leading-relaxed">
                            <strong>Tôi xác nhận</strong> rằng thông tin tôi đã điền là chính xác và tôi muốn gửi đăng ký.
                        </label>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-sm text-red-600">{error}</p>
                    <p className="text-xs text-red-400 mt-1">Vui lòng thử lại. Dữ liệu của bạn vẫn được giữ.</p>
                </div>
            )}

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex-1 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!confirmed || isSubmitting}
                    className="flex-1 gap-2"
                    size="lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" /> Gửi đăng ký
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
