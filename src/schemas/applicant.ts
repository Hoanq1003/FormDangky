import { z } from 'zod';

export const applicantSchema = z.object({
    applicantName: z
        .string()
        .min(1, 'Vui lòng nhập họ và tên')
        .max(100, 'Họ tên quá dài'),
    phone: z
        .string()
        .min(1, 'Vui lòng nhập số điện thoại')
        .regex(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ'),
    zalo: z.string().default(''),
    address: z.string().default(''),
    notes: z.string().default(''),
});

export type ApplicantFormData = z.infer<typeof applicantSchema>;
