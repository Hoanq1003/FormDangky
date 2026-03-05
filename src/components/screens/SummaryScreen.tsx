'use client';

import { useState } from 'react';
import { CATEGORY_MAP, CEREMONY_MAP } from '@/config/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Edit2, Copy, Trash2, Plus, Send, User, Loader2 } from 'lucide-react';
import type { Applicant, SubmissionItem, CeremonyType } from '@/types';

interface SummaryScreenProps {
    ceremonyType: CeremonyType;
    applicant: Applicant;
    items: SubmissionItem[];
    isSubmitting: boolean;
    submitError: string | null;
    onEditApplicant: () => void;
    onEditItem: (itemId: string) => void;
    onDeleteItem: (itemId: string) => void;
    onCloneItem: (itemId: string) => void;
    onAddMore: () => void;
    onSubmit: () => void;
    onBack: () => void;
}

function getItemDisplayName(item: SubmissionItem): string {
    const data = item.data as Record<string, unknown>;
    return (data.hoTenNguoiMat as string) || (data.noiDungDangKy as string) || item.categoryLabel;
}

function getItemSummary(item: SubmissionItem): string {
    const data = item.data as Record<string, unknown>;
    const parts: string[] = [];
    if (data.ngayMat) parts.push(`Mất: ${data.ngayMat}`);
    if (data.tho) parts.push(`Thọ: ${data.tho} tuổi`);
    if (data.anTangTai) parts.push(`An táng: ${data.anTangTai}`);
    if (data.cungDuongChuThien === 'co') parts.push('Có cúng dường chư Thiên');
    if (data.hlGiaTien) parts.push('HL gia tiên');
    if (data.hlTrenDat) parts.push('HL trên đất');
    return parts.join(' • ') || '—';
}

export default function SummaryScreen({
    ceremonyType, applicant, items, isSubmitting, submitError,
    onEditApplicant, onEditItem, onDeleteItem, onCloneItem, onAddMore, onSubmit, onBack,
}: SummaryScreenProps) {
    const [confirmed, setConfirmed] = useState(false);
    const ceremony = CEREMONY_MAP.get(ceremonyType);

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                    📝
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Xem lại đăng ký</h2>
                    <p className="text-sm text-stone-500">Kiểm tra lại toàn bộ trước khi gửi</p>
                </div>
            </div>

            {/* Ceremony type */}
            <Card className="mb-4">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{ceremony?.icon}</span>
                        <span className="font-medium text-stone-800">{ceremony?.label}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Applicant info */}
            <Card className="mb-4">
                <CardHeader className="pb-2 flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-stone-500" />
                        <CardTitle className="text-sm">Thông tin chung</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onEditApplicant} className="text-amber-600 h-7 text-xs">
                        <Edit2 className="w-3 h-3 mr-1" /> Sửa
                    </Button>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                        <span className="text-stone-500">Tín chủ:</span>
                        <span className="font-medium">{applicant.tinChu}</span>
                        <span className="text-stone-500">SĐT:</span>
                        <span>{applicant.phone}</span>
                        {applicant.daoTrang && (
                            <>
                                <span className="text-stone-500">Đạo tràng:</span>
                                <span>{applicant.daoTrang}</span>
                            </>
                        )}
                        {applicant.notes && (
                            <>
                                <span className="text-stone-500">Ghi chú:</span>
                                <span>{applicant.notes}</span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Separator className="mb-4" />

            {/* Items list */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-stone-800">
                    Danh sách mục đăng ký ({items.length})
                </h3>
                <Button variant="outline" size="sm" onClick={onAddMore} className="h-7 text-xs gap-1">
                    <Plus className="w-3 h-3" /> Thêm mục
                </Button>
            </div>

            <div className="space-y-3 mb-6">
                {items.map((item, idx) => {
                    const cat = CATEGORY_MAP.get(item.categoryKey);
                    return (
                        <Card key={item.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3 mb-2">
                                    <span className="text-lg">{cat?.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="default" className="text-[10px]">
                                                Mục {idx + 1}
                                            </Badge>
                                            <span className="text-xs text-stone-400">{cat?.shortLabel}</span>
                                        </div>
                                        <p className="font-medium text-stone-800 text-sm mt-1">
                                            {getItemDisplayName(item)}
                                        </p>
                                        <p className="text-xs text-stone-500 mt-0.5">
                                            {getItemSummary(item)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2 border-t border-stone-100">
                                    <Button variant="ghost" size="sm" onClick={() => onEditItem(item.id)} className="text-amber-600 h-7 text-xs">
                                        <Edit2 className="w-3 h-3 mr-1" /> Sửa
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onCloneItem(item.id)} className="text-blue-600 h-7 text-xs">
                                        <Copy className="w-3 h-3 mr-1" /> Nhân bản
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onDeleteItem(item.id)} className="text-red-500 h-7 text-xs">
                                        <Trash2 className="w-3 h-3 mr-1" /> Xoá
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Confirm and submit */}
            <Card className="mb-4">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="confirm"
                            checked={confirmed}
                            onCheckedChange={(v) => setConfirmed(v as boolean)}
                        />
                        <Label htmlFor="confirm" className="text-sm text-stone-600 leading-snug cursor-pointer">
                            Tôi đã kiểm tra lại toàn bộ thông tin và xác nhận gửi đăng ký.
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-600">{submitError}</p>
                </div>
            )}

            <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    Quay lại
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!confirmed || isSubmitting || items.length === 0}
                    className="flex-1 gap-2"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
                </Button>
            </div>
        </div>
    );
}
