'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORY_MAP } from '@/config/categories';
import { categorySchemas } from '@/schemas/submission';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import type { CategoryKey, FieldDefinition } from '@/types';

interface CategoryFormScreenProps {
    categoryKey: CategoryKey;
    defaultValues?: Record<string, unknown>;
    onSave: (data: Record<string, unknown>) => void;
    onCancel: () => void;
}

export default function CategoryFormScreen({
    categoryKey,
    defaultValues,
    onSave,
    onCancel,
}: CategoryFormScreenProps) {
    const category = CATEGORY_MAP[categoryKey];
    const schema = categorySchemas[categoryKey];

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues || category.defaultValues,
        mode: 'onChange',
    });

    const onSubmit = (data: Record<string, unknown>) => {
        onSave(data);
    };

    const renderField = (field: FieldDefinition) => {
        const error = errors[field.name];

        return (
            <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type === 'textarea' ? (
                    <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        rows={3}
                        {...register(field.name)}
                    />
                ) : field.type === 'date' ? (
                    <Input
                        id={field.name}
                        type="date"
                        {...register(field.name)}
                    />
                ) : (
                    <Input
                        id={field.name}
                        placeholder={field.placeholder}
                        {...register(field.name)}
                    />
                )}
                {error && (
                    <p className="text-sm text-red-500">{error.message as string}</p>
                )}
            </div>
        );
    };

    return (
        <div className="animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Điền thông tin</h2>
                    <p className="text-sm text-stone-500">{category.label}</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base text-amber-700">{category.label}</CardTitle>
                    <p className="text-xs text-stone-400">{category.helperText}</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {category.fields.map(renderField)}

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 gap-2">
                                <ArrowLeft className="w-4 h-4" /> Huỷ
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
