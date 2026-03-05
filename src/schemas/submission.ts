import { z } from 'zod';
import type { CategoryKey } from '@/types';

// ============================================================
// Category-specific Zod schemas
// ============================================================

// HL mới mất (trong 49 ngày)
export const hlTrong49Schema = z.object({
    hoTenNguoiMat: z.string().min(1, 'Vui lòng nhập họ tên người mất'),
    ngayMat: z.string().default(''),
    tho: z.string().default(''),
    anTangTai: z.string().default(''),
});

// HL ngoài 49 ngày (rõ tên)
export const hlNgoai49Schema = z.object({
    hoTenNguoiMat: z.string().min(1, 'Vui lòng nhập họ tên người mất'),
    ngayMat: z.string().default(''),
    tho: z.string().default(''),
    anTangTai: z.string().default(''),
});

// Tâm linh bài số 8
export const tamLinhBai8Schema = z.object({
    cungDuongChuThien: z.string().default('khong'),
    hlGiaTien: z.boolean().default(false),
    hlTrenDat: z.boolean().default(false),
    hlTrenNghiep: z.string().default(''),
    hlCanTroChuaBenh: z.string().default(''),
    ghiChu: z.string().default(''),
});

// Tâm linh khác (không tu bài số 8)
export const tamLinhKhacSchema = z.object({
    noiDungDangKy: z.string().min(1, 'Vui lòng nhập nội dung đăng ký'),
    ghiChu: z.string().default(''),
});

// Map category key → schema
export const categorySchemas: Record<CategoryKey, z.ZodObject<z.ZodRawShape>> = {
    hl_trong_49_ngay: hlTrong49Schema as unknown as z.ZodObject<z.ZodRawShape>,
    hl_ngoai_49_ro_ten: hlNgoai49Schema as unknown as z.ZodObject<z.ZodRawShape>,
    tam_linh_bai_8: tamLinhBai8Schema as unknown as z.ZodObject<z.ZodRawShape>,
    tam_linh_khac: tamLinhKhacSchema as unknown as z.ZodObject<z.ZodRawShape>,
};

// Full submission schema for server-side validation
export const submissionPayloadSchema = z.object({
    ceremonyType: z.enum(['trai_tang', 'trai_vien', 'tuy_duyen']),
    applicant: z.object({
        tinChu: z.string().min(1),
        phone: z.string().min(1),
        daoTrang: z.string().optional(),
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
