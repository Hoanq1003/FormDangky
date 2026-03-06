'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, RotateCcw, Play } from 'lucide-react';
import { getGuideVideoUrl } from '@/actions/settings';

interface LandingScreenProps {
    onStart: () => void;
    onLookup: () => void;
}

export default function LandingScreen({ onStart, onLookup }: LandingScreenProps) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        getGuideVideoUrl().then((url) => {
            if (url) setVideoUrl(url);
        });
    }, []);

    // Convert YouTube URL to embed URL
    const getEmbedUrl = (url: string) => {
        if (url.includes('/embed/')) return url;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&?]+)/);
        if (match) return `https://www.youtube.com/embed/${match[1]}`;
        return url;
    };

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
            <p className="text-stone-400 text-sm mb-6 max-w-xs">
                Bạn có thể đăng ký <strong className="text-amber-600">nhiều mục</strong> cùng lúc, xem lại và chỉnh sửa trước khi gửi.
            </p>

            {/* Video hướng dẫn */}
            {videoUrl && (
                <div className="w-full max-w-sm mb-6">
                    {!showVideo ? (
                        <Button
                            variant="outline"
                            onClick={() => setShowVideo(true)}
                            className="w-full gap-2 py-5 border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                            <Play className="w-5 h-5" />
                            Xem video hướng dẫn sử dụng
                        </Button>
                    ) : (
                        <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    src={getEmbedUrl(videoUrl)}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Hướng dẫn sử dụng"
                                />
                            </div>
                            <button
                                onClick={() => setShowVideo(false)}
                                className="w-full py-2 text-xs text-stone-400 hover:text-stone-600"
                            >
                                Ẩn video
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
                <Button onClick={onStart} className="px-8 py-6 text-lg gap-2 shadow-lg">
                    Bắt đầu đăng ký <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                    variant="outline"
                    onClick={onLookup}
                    className="px-8 py-5 gap-2 border-stone-300 text-stone-600"
                >
                    <RotateCcw className="w-4 h-4" />
                    Đăng ký lại (tra cứu SĐT)
                </Button>
            </div>

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
