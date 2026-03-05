import { z } from 'zod';
import type { CategoryKey } from '@/types';

// ============================================================
// Category-specific Zod schemas
// ============================================================

export const hlTrong49Schema = z.object({
    deceasedName: z.string().min(1, 'Vui lòng nhập tên hương linh'),
    deceasedAltName: z.string().default(''),
    dateOfPassing: z.string().default(''),
    daysSincePassingEstimate: z.string().default(''),
    relationship: z.string().default(''),
    requestDetails: z.string().default(''),
});

export const hlNgoai49Schema = z.object({
    deceasedName: z.string().min(1, 'Vui lòng nhập tên hương linh'),
    deceasedAltName: z.string().default(''),
    yearOfPassing: z.string().default(''),
    relationship: z.string().default(''),
    requestDetails: z.string().default(''),
});

export const tamLinhBai8Schema = z.object({
    subjectName: z.string().min(1, 'Vui lòng nhập tên đối tượng'),
    subjectType: z.string().default(''),
    requestContent: z.string().min(1, 'Vui lòng nhập nội dung đăng ký'),
    relatedNotes: z.string().default(''),
});

export const tamLinhKhacSchema = z.object({
    subjectName: z.string().min(1, 'Vui lòng nhập tên đối tượng'),
    requestContent: z.string().min(1, 'Vui lòng nhập nội dung đăng ký'),
    categorySubType: z.string().default(''),
    relatedNotes: z.string().default(''),
});

export const dangKyLaiSchema = z.object({
    previousSubmissionCode: z.string().default(''),
    previousPeriod: z.string().default(''),
    oldContentSummary: z.string().default(''),
    newRequest: z.string().min(1, 'Vui lòng nhập yêu cầu mới / cập nhật'),
    relatedNotes: z.string().default(''),
});

// Map category key → schema
export const categorySchemas: Record<CategoryKey, z.ZodObject<z.ZodRawShape>> = {
    hl_trong_49_ngay: hlTrong49Schema as unknown as z.ZodObject<z.ZodRawShape>,
    hl_ngoai_49_ro_ten: hlNgoai49Schema as unknown as z.ZodObject<z.ZodRawShape>,
    tam_linh_bai_8: tamLinhBai8Schema as unknown as z.ZodObject<z.ZodRawShape>,
    tam_linh_khac: tamLinhKhacSchema as unknown as z.ZodObject<z.ZodRawShape>,
    dang_ky_lai_dot_truoc: dangKyLaiSchema as unknown as z.ZodObject<z.ZodRawShape>,
};

// Full submission schema for server-side validation
export const submissionPayloadSchema = z.object({
    applicant: z.object({
        applicantName: z.string().min(1),
        phone: z.string().min(1),
        zalo: z.string().optional(),
        address: z.string().optional(),
        notes: z.string().optional(),
    }),
    items: z.array(z.object({
        id: z.string(),
        categoryKey: z.string(),
        categoryLabel: z.string(),
        data: z.record(z.string(), z.unknown()),
        createdAt: z.string(),
        updatedAt: z.string(),
    })).min(1, 'Cần ít nhất 1 mục đăng ký'),
});
