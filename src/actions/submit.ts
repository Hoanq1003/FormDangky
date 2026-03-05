'use server';

import { v4 as uuidv4 } from 'uuid';
import { submissionPayloadSchema } from '@/schemas/submission';
import { CEREMONY_MAP } from '@/config/categories';
import { generateSubmissionCode } from '@/lib/utils/submission-code';
import { appendSubmission, appendSubmissionItems, appendAuditLog } from '@/lib/sheets/helpers';

interface SubmitResult {
    success: boolean;
    code?: string;
    error?: string;
}

export async function submitRegistration(payload: unknown): Promise<SubmitResult> {
    try {
        // 1. Server-side validation
        const parsed = submissionPayloadSchema.safeParse(payload);
        if (!parsed.success) {
            return {
                success: false,
                error: `Dữ liệu không hợp lệ: ${parsed.error.issues.map((i) => i.message).join(', ')}`,
            };
        }

        const { ceremonyType, applicant, items } = parsed.data;
        const ceremony = CEREMONY_MAP.get(ceremonyType);

        // 2. Generate IDs
        const submissionId = uuidv4();
        const submissionCode = generateSubmissionCode();
        const now = new Date().toISOString();

        // 3. Prepare category summary
        const categoriesText = [...new Set(items.map((i) => i.categoryLabel))].join(', ');

        // 4. Write submission row
        await appendSubmission({
            submission_id: submissionId,
            submission_code: submissionCode,
            created_at: now,
            updated_at: now,
            status: 'submitted',
            ceremony_type: ceremonyType,
            ceremony_label: ceremony?.label || ceremonyType,
            applicant_name: applicant.tinChu,
            applicant_phone: applicant.phone,
            applicant_dao_trang: applicant.daoTrang || '',
            total_items: String(items.length),
            categories_text: categoriesText,
            applicant_payload_json: JSON.stringify(applicant),
            source: 'webapp',
            notes: applicant.notes || '',
        });

        // 5. Write item rows
        const itemRows = items.map((item, idx) => {
            const data = item.data as Record<string, unknown>;
            const displayName = (data.hoTenNguoiMat as string) || (data.noiDungDangKy as string) || item.categoryLabel;
            const parts: string[] = [];
            if (data.ngayMat) parts.push(`Mất: ${data.ngayMat}`);
            if (data.tho) parts.push(`Thọ: ${data.tho}`);
            if (data.anTangTai) parts.push(`An táng: ${data.anTangTai}`);

            return {
                item_id: item.id || uuidv4(),
                submission_id: submissionId,
                item_index: String(idx + 1),
                category_key: item.categoryKey,
                category_label: item.categoryLabel,
                created_at: item.createdAt || now,
                updated_at: item.updatedAt || now,
                display_name: displayName,
                summary_text: parts.join(' • '),
                subject_name: displayName,
                reference_value: '',
                item_payload_json: JSON.stringify(item.data),
                status: 'active',
            };
        });

        await appendSubmissionItems(itemRows);

        // 6. Audit log
        await appendAuditLog({
            log_id: uuidv4(),
            submission_id: submissionId,
            action: 'submit',
            created_at: now,
            detail: `Submitted ${items.length} items via webapp. Ceremony: ${ceremony?.label}`,
        });

        return { success: true, code: submissionCode };
    } catch (err) {
        console.error('Submit error:', err);
        return {
            success: false,
            error: 'Đã có lỗi khi gửi đăng ký. Vui lòng thử lại sau.',
        };
    }
}
