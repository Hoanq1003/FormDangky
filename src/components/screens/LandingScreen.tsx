'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface LandingScreenProps {
    onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-fade-in">
            {/* Decorative top */}
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 animate-float">
                    <span className="text-4xl">🙏</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-stone-800 mb-3 tracking-tight">
                {process.env.NEXT_PUBLIC_APP_NAME || 'Đăng Ký Nhiều Mục'}
            </h1>

            <p className="text-stone-500 mb-2 max-w-sm leading-relaxed">
                Hệ thống đăng ký trực tuyến — nhanh chóng, dễ dàng, chính xác.
            </p>

            <p className="text-sm text-stone-400 mb-10 max-w-xs">
                Bạn có thể đăng ký <strong className="text-amber-600">nhiều mục</strong> cùng lúc,
                xem lại và chỉnh sửa trước khi gửi.
            </p>

            <Button size="lg" onClick={onStart} className="text-lg px-10 py-6">
                Bắt đầu đăng ký
            </Button>

            <p className="text-xs text-stone-400 mt-6">
                Thông tin của bạn được bảo mật và chỉ dùng cho mục đích đăng ký.
            </p>
        </div>
    );
}
