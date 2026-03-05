'use server';

import { v4 as uuidv4 } from 'uuid';
import { submissionPayloadSchema } from '@/schemas/submission';
import { generateSubmissionCode } from '@/lib/utils/submission-code';
import { appendSubmission, appendSubmissionItems, appendAuditLog } from '@/lib/sheets/helpers';
import type { Applicant, SubmissionItem } from '@/types';
import { CATEGORY_MAP } from '@/config/categories';

interface SubmitPayload {
    applicant: Applicant;
    items: SubmissionItem[];
}

interface SubmitResult {
    success: boolean;
    submissionCode?: string;
    submissionId?: string;
    error?: string;
}

export async function submitRegistration(payload: SubmitPayload): Promise<SubmitResult> {
    // 1. Validate server-side
    const parsed = submissionPayloadSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            success: false,
            error: 'Dữ liệu không hợp lệ: ' + parsed.error.issues.map(i => i.message).join(', '),
        };
    }

    const submissionId = uuidv4();
    const submissionCode = generateSubmissionCode();
    const now = new Date().toISOString();
    const { applicant, items } = payload;

    try {
        // 2. Compute summary fields
        const categoriesText = [...new Set(items.map(i => {
            const cat = CATEGORY_MAP[i.categoryKey as keyof typeof CATEGORY_MAP];
            return cat?.label || i.categoryLabel;
        }))].join(', ');

        // 3. Append submission row
        const submissionRow = [
            submissionId,
            submissionCode,
            now, // created_at
            now, // updated_at
            'new', // status
            applicant.applicantName,
            applicant.phone,
            applicant.zalo || '',
            applicant.address || '',
            String(items.length),
            categoriesText,
            JSON.stringify(applicant),
            'webapp', // source
            applicant.notes || '',
        ];
        await appendSubmission(submissionRow);

        // 4. Append item rows
        const itemRows = items.map((item, idx) => {
            const data = item.data as Record<string, string>;
            const subjectName = data.deceasedName || data.subjectName || '';
            const referenceValue = data.previousSubmissionCode || data.yearOfPassing || data.dateOfPassing || '';
            const displayName = subjectName || `Mục ${idx + 1}`;
            const summaryText = data.requestDetails || data.requestContent || data.newRequest || '';

            return [
                item.id,
                submissionId,
                String(idx + 1),
                item.categoryKey,
                item.categoryLabel,
                item.createdAt,
                item.updatedAt,
                displayName,
                summaryText.substring(0, 200),
                subjectName,
                referenceValue,
                JSON.stringify(item.data),
                'new',
            ];
        });
        await appendSubmissionItems(itemRows);

        // 5. Audit log
        await appendAuditLog([
            uuidv4(),
            submissionId,
            'SUBMIT_SUCCESS',
            now,
            `Created submission ${submissionCode} with ${items.length} items`,
        ]);

        return { success: true, submissionCode, submissionId };
    } catch (err) {
        // Log failure
        try {
            await appendAuditLog([
                uuidv4(),
                submissionId,
                'SUBMIT_FAILED',
                now,
                `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
            ]);
        } catch {
            // If audit log also fails, ignore
        }

        return {
            success: false,
            error: 'Đã xảy ra lỗi khi gửi đăng ký. Vui lòng thử lại.',
        };
    }
}
