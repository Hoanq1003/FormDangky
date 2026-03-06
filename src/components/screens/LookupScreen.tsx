'use client';

import { useState } from 'react';
import { lookupByPhone } from '@/actions/lookup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, RotateCcw, Calendar, Loader2 } from 'lucide-react';

interface PastSubmission {
    submissionId: string;
    submissionCode: string;
    createdAt: string;
    ceremonyType: string;
    ceremonyLabel: string;
    applicantName: string;
    applicantPhone: string;
    applicantTo: string;
    totalItems: string;
    categoriesText: string;
    itemsData: {
        categoryKey: string;
        categoryLabel: string;
        displayName: string;
        summaryText: string;
        payloadJson: string;
    }[];
}

interface LookupScreenProps {
    onSelectPast: (sub: PastSubmission) => void;
    onBack: () => void;
}

export default function LookupScreen({ onSelectPast, onBack }: LookupScreenProps) {
    const [phone, setPhone] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<PastSubmission[] | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!phone.trim()) return;
        setIsSearching(true);
        setSearched(true);
        try {
            const res = await lookupByPhone(phone.trim());
            setResults(res.submissions);
        } catch {
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const formatDate = (iso: string) => {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch {
            return iso;
        }
    };

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Tra cứu đăng ký cũ</h2>
                    <p className="text-sm text-stone-500">Nhập SĐT để tìm và đăng ký lại</p>
                </div>
            </div>

            <Card className="mb-4">
                <CardContent className="p-4">
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="lookup-phone">Số điện thoại đã đăng ký</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="lookup-phone"
                                    type="tel"
                                    placeholder="VD: 0912345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Button
                                    onClick={handleSearch}
                                    disabled={isSearching || !phone.trim()}
                                    className="gap-1 px-4"
                                >
                                    {isSearching ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Search className="w-4 h-4" />
                                    )}
                                    Tìm
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {searched && results !== null && (
                <div className="space-y-3">
                    {results.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-stone-500 text-sm">
                                    😔 Không tìm thấy đăng ký nào với SĐT <strong>{phone}</strong>
                                </p>
                                <p className="text-stone-400 text-xs mt-1">
                                    Hãy kiểm tra lại số hoặc bắt đầu đăng ký mới
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <p className="text-sm text-stone-600 font-medium">
                                Tìm thấy {results.length} đăng ký:
                            </p>
                            {results.map((sub) => (
                                <Card
                                    key={sub.submissionId}
                                    className="cursor-pointer hover:border-amber-300 transition-colors"
                                    onClick={() => onSelectPast(sub)}
                                >
                                    <CardHeader className="pb-1 px-4 pt-3">
                                        <CardTitle className="text-sm flex items-center justify-between">
                                            <span className="text-amber-700">{sub.applicantName}</span>
                                            <span className="text-xs font-mono text-stone-400">{sub.submissionCode}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-3 pt-0">
                                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(sub.createdAt)}
                                            <span className="mx-1">•</span>
                                            {sub.ceremonyLabel}
                                            {sub.applicantTo && (
                                                <>
                                                    <span className="mx-1">•</span>
                                                    {sub.applicantTo}
                                                </>
                                            )}
                                        </div>
                                        <p className="text-xs text-stone-400">
                                            {sub.totalItems} mục: {sub.categoriesText}
                                        </p>
                                        <div className="mt-2 flex justify-end">
                                            <Button size="sm" variant="outline" className="gap-1 text-xs h-7">
                                                <RotateCcw className="w-3 h-3" /> Đăng ký lại
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                </Button>
            </div>
        </div>
    );
}

export type { PastSubmission };
