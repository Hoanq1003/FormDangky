'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Plus, ClipboardList } from 'lucide-react';

interface PostSaveScreenProps {
    itemCount: number;
    onAddAnother: () => void;
    onReviewAndSubmit: () => void;
}

export default function PostSaveScreen({ itemCount, onAddAnother, onReviewAndSubmit }: PostSaveScreenProps) {
    return (
        <div className="animate-fade-in text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Đã lưu mục thành công!</h2>
            <p className="text-stone-500 mb-8">
                Bạn đã thêm <strong className="text-amber-600">{itemCount}</strong> mục đăng ký.
            </p>

            <div className="space-y-3">
                <Card className="cursor-pointer hover:shadow-md transition-all active:scale-[0.98]" onClick={onAddAnother}>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Plus className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="font-semibold text-stone-800">Thêm mục khác</h3>
                            <p className="text-xs text-stone-500">Đăng ký thêm mục mới</p>
                        </div>
                    </CardContent>
                </Card>

                <Button onClick={onReviewAndSubmit} className="w-full py-6 text-base gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Xem lại và gửi đăng ký
                </Button>
            </div>
        </div>
    );
}
