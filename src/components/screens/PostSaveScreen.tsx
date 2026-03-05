'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Plus, List, Send } from 'lucide-react';

interface PostSaveScreenProps {
    itemCount: number;
    onAddAnother: () => void;
    onReview: () => void;
    onFinish: () => void;
}

export default function PostSaveScreen({
    itemCount,
    onAddAnother,
    onReview,
    onFinish,
}: PostSaveScreenProps) {
    return (
        <div className="animate-slide-in">
            {/* Success indicator */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4 animate-bounce-in">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-stone-800 mb-1">Đã lưu mục thành công!</h2>
                <p className="text-sm text-stone-500">
                    Bạn đã thêm <strong className="text-amber-600">{itemCount}</strong> mục đăng ký.
                </p>
            </div>

            <div className="space-y-3">
                <Card
                    className="cursor-pointer hover:shadow-md hover:border-amber-200 transition-all duration-200"
                    onClick={onAddAnother}
                >
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                            <Plus className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-800">Thêm mục khác</h3>
                            <p className="text-xs text-stone-500">Đăng ký thêm mục mới</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className="cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200"
                    onClick={onReview}
                >
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <List className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-800">Xem lại danh sách</h3>
                            <p className="text-xs text-stone-500">Kiểm tra, sửa hoặc xoá các mục</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className="cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all duration-200"
                    onClick={onFinish}
                >
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Send className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-800">Hoàn tất đăng ký</h3>
                            <p className="text-xs text-stone-500">Xem lại và gửi đăng ký</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
