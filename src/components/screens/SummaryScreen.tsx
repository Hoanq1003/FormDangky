'use client';

import { CATEGORY_MAP } from '@/config/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit3, Trash2, Copy, Plus, ArrowRight, User } from 'lucide-react';
import type { Applicant, SubmissionItem } from '@/types';

interface SummaryScreenProps {
    applicant: Applicant;
    items: SubmissionItem[];
    onEditApplicant: () => void;
    onEditItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
    onCloneItem: (id: string) => void;
    onAddMore: () => void;
    onProceed: () => void;
}

export default function SummaryScreen({
    applicant,
    items,
    onEditApplicant,
    onEditItem,
    onDeleteItem,
    onCloneItem,
    onAddMore,
    onProceed,
}: SummaryScreenProps) {
    const getItemPreview = (item: SubmissionItem): string => {
        const data = item.data as Record<string, string>;
        return data.deceasedName || data.subjectName || data.newRequest || data.requestContent || 'Mục đã thêm';
    };

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">📝</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Xem lại đăng ký</h2>
                    <p className="text-sm text-stone-500">Kiểm tra lại toàn bộ trước khi gửi</p>
                </div>
            </div>

            {/* Applicant info */}
            <Card className="mb-4">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-amber-600" />
                            <h3 className="font-semibold text-stone-800 text-sm">Thông tin chung</h3>
                        </div>
                        <Button size="sm" variant="ghost" onClick={onEditApplicant} className="h-8 px-2 text-xs">
                            <Edit3 className="w-3.5 h-3.5 mr-1" /> Sửa
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                        <div className="flex">
                            <span className="text-stone-500 w-24 flex-shrink-0">Họ tên:</span>
                            <span className="text-stone-800 font-medium">{applicant.applicantName}</span>
                        </div>
                        <div className="flex">
                            <span className="text-stone-500 w-24 flex-shrink-0">SĐT:</span>
                            <span className="text-stone-800">{applicant.phone}</span>
                        </div>
                        {applicant.zalo && (
                            <div className="flex">
                                <span className="text-stone-500 w-24 flex-shrink-0">Zalo:</span>
                                <span className="text-stone-800">{applicant.zalo}</span>
                            </div>
                        )}
                        {applicant.address && (
                            <div className="flex">
                                <span className="text-stone-500 w-24 flex-shrink-0">Địa chỉ:</span>
                                <span className="text-stone-800">{applicant.address}</span>
                            </div>
                        )}
                        {applicant.notes && (
                            <div className="flex">
                                <span className="text-stone-500 w-24 flex-shrink-0">Ghi chú:</span>
                                <span className="text-stone-800">{applicant.notes}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Separator className="my-4" />

            {/* Items list */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-stone-800 text-sm">
                    Danh sách mục đăng ký ({items.length})
                </h3>
                <Button size="sm" variant="outline" onClick={onAddMore} className="h-8 px-3 text-xs gap-1">
                    <Plus className="w-3.5 h-3.5" /> Thêm mục
                </Button>
            </div>

            {items.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                        <p className="text-stone-400 text-sm">Chưa có mục nào. Hãy thêm ít nhất 1 mục.</p>
                        <Button variant="outline" onClick={onAddMore} className="mt-3 gap-2">
                            <Plus className="w-4 h-4" /> Thêm mục đăng ký
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {items.map((item, idx) => {
                        const cat = CATEGORY_MAP[item.categoryKey];
                        return (
                            <Card key={item.id} className="group">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl mt-0.5">{cat?.icon || '📄'}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="default" className="text-[10px]">Mục {idx + 1}</Badge>
                                                <span className="text-xs text-stone-500">{cat?.label || item.categoryLabel}</span>
                                            </div>
                                            <p className="text-sm font-medium text-stone-800 truncate">
                                                {getItemPreview(item)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 mt-3 pt-3 border-t border-stone-100">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onEditItem(item.id)}
                                            className="flex-1 h-8 text-xs gap-1"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" /> Sửa
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onCloneItem(item.id)}
                                            className="flex-1 h-8 text-xs gap-1"
                                        >
                                            <Copy className="w-3.5 h-3.5" /> Nhân bản
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onDeleteItem(item.id)}
                                            className="flex-1 h-8 text-xs gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Xoá
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {items.length > 0 && (
                <Button onClick={onProceed} className="w-full mt-6 gap-2" size="lg">
                    Tiếp tục xác nhận <ArrowRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}
