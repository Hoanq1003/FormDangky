'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart } from 'lucide-react';

interface LandingScreenProps {
    onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-lg animate-float">
                    🙏
                </div>
                <div className="absolute -top-1 -right-1 text-xl animate-bounce-in">✨</div>
            </div>

            <h1 className="text-2xl font-bold text-stone-800 mb-3">
                Đăng Ký Cầu Siêu
            </h1>
            <p className="text-stone-500 mb-2 max-w-xs">
                Hệ thống đăng ký cầu siêu trực tuyến — nhanh chóng, dễ dàng, chính xác.
            </p>
            <p className="text-stone-400 text-sm mb-8 max-w-xs">
                Bạn có thể đăng ký <strong className="text-amber-600">nhiều mục</strong> cùng lúc, xem lại và chỉnh sửa trước khi gửi.
            </p>

            <Button onClick={onStart} className="px-8 py-6 text-lg gap-2 shadow-lg">
                Bắt đầu đăng ký <ArrowRight className="w-5 h-5" />
            </Button>

            <Card className="mt-8 max-w-sm">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3 text-left">
                        <Heart className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-stone-500">
                            <p className="font-medium text-stone-700 mb-1">Lưu ý:</p>
                            <ul className="space-y-1">
                                <li>• Nếu đã có <strong>Pháp danh</strong> thì ghi Pháp danh</li>
                                <li>• Ngày mất ghi theo <strong>ngày âm lịch</strong></li>
                                <li>• Thông tin được bảo mật và chỉ dùng cho mục đích đăng ký</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
