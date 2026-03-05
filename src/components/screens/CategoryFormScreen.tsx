'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORY_MAP } from '@/config/categories';
import { categorySchemas } from '@/schemas/submission';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';
import type { CategoryKey, SubmissionItem, FieldDefinition } from '@/types';

interface CategoryFormScreenProps {
    categoryKey: CategoryKey;
    editingItem: SubmissionItem | null;
    onSave: (data: Record<string, unknown>) => void;
    onBack: () => void;
}

export default function CategoryFormScreen({ categoryKey, editingItem, onSave, onBack }: CategoryFormScreenProps) {
    const cat = CATEGORY_MAP.get(categoryKey);
    const schema = categorySchemas[categoryKey];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useForm<Record<string, unknown>>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(schema) as any,
        defaultValues: editingItem ? editingItem.data : cat?.defaultValues || {},
    });

    if (!cat) return null;

    const onSubmit = (data: Record<string, unknown>) => {
        onSave(data);
    };

    const renderField = (field: FieldDefinition) => {
        const error = errors[field.name];

        if (field.type === 'checkbox') {
            return (
                <div key={field.name} className="flex items-start gap-3 py-2">
                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Checkbox
                                id={field.name}
                                checked={controllerField.value as boolean}
                                onCheckedChange={controllerField.onChange}
                            />
                        )}
                    />
                    <Label htmlFor={field.name} className="text-sm leading-snug cursor-pointer">
                        {field.label}
                    </Label>
                </div>
            );
        }

        if (field.type === 'radio' && field.options) {
            return (
                <div key={field.name} className="space-y-2">
                    <Label className="text-sm">{field.label}</Label>
                    {field.helperText && (
                        <p className="text-xs text-stone-400">{field.helperText}</p>
                    )}
                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: controllerField }) => (
                            <div className="flex gap-3">
                                {field.options!.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => controllerField.onChange(opt.value)}
                                        className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${controllerField.value === opt.value
                                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                                : 'border-stone-200 text-stone-500 hover:border-stone-300'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    />
                </div>
            );
        }

        if (field.type === 'textarea') {
            return (
                <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        rows={3}
                        {...register(field.name)}
                    />
                    {error && <p className="text-sm text-red-500">{error.message as string}</p>}
                </div>
            );
        }

        // Default: text input
        return (
            <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Input
                    id={field.name}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                />
                {error && <p className="text-sm text-red-500">{error.message as string}</p>}
            </div>
        );
    };

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
                    {cat.icon}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-stone-800">{cat.label}</h2>
                    <p className="text-sm text-stone-500">
                        {editingItem ? 'Chỉnh sửa mục' : 'Nhập thông tin mục mới'}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Thông tin chi tiết</CardTitle>
                    {cat.noteText && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                            <p className="text-xs text-amber-700">⚠️ {cat.noteText}</p>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {cat.fields.map(renderField)}

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Huỷ
                            </Button>
                            <Button type="submit" className="flex-1 gap-2">
                                <Save className="w-4 h-4" /> Lưu mục này
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
