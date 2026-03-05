'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicantSchema, type ApplicantFormData } from '@/schemas/applicant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, User } from 'lucide-react';
import type { Applicant } from '@/types';

interface ApplicantScreenProps {
    defaultValues: Applicant | null;
    onNext: (data: Applicant) => void;
    onBack: () => void;
}

export default function ApplicantScreen({ defaultValues, onNext, onBack }: ApplicantScreenProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ApplicantFormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(applicantSchema) as any,
        defaultValues: defaultValues || {
            applicantName: '',
            phone: '',
            zalo: '',
            address: '',
            notes: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: ApplicantFormData) => {
        onNext(data as Applicant);
    };

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Thông tin người đăng ký</h2>
                    <p className="text-sm text-stone-500">Bước 1 — Nhập thông tin chung</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="applicantName">
                                Họ và tên <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="applicantName"
                                placeholder="Nhập họ và tên đầy đủ"
                                {...register('applicantName')}
                            />
                            {errors.applicantName && (
                                <p className="text-sm text-red-500">{errors.applicantName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Số điện thoại <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="VD: 0912345678"
                                {...register('phone')}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="zalo">Zalo</Label>
                            <Input
                                id="zalo"
                                placeholder="Số Zalo (nếu khác SĐT)"
                                {...register('zalo')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input
                                id="address"
                                placeholder="Nhập địa chỉ"
                                {...register('address')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Ghi chú chung</Label>
                            <Textarea
                                id="notes"
                                placeholder="Ghi chú thêm nếu có"
                                rows={3}
                                {...register('notes')}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                                Quay lại
                            </Button>
                            <Button type="submit" disabled={!isValid} className="flex-1 gap-2">
                                Tiếp tục <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
