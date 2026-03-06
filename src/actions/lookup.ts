'use server';

import { listSubmissions, listSubmissionItems } from '@/lib/sheets/helpers';

interface LookupResult {
    submissions: {
        submissionId: string;
        submissionCode: string;
        createdAt: string;
        ceremonyType: string;
        ceremonyLabel: string;
        applicantName: string;
        applicantPhone: string;
        applicantTo: string;
        totalItems: string;
        categoriesText: string;
        itemsData: {
            categoryKey: string;
            categoryLabel: string;
            displayName: string;
            summaryText: string;
            payloadJson: string;
        }[];
    }[];
}

export async function lookupByPhone(phone: string): Promise<LookupResult> {
    try {
        const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+84/, '0');
        const allSubmissions = await listSubmissions();
        const allItems = await listSubmissionItems();

        const matched = allSubmissions.filter((s) => {
            const sPhone = (s['Số điện thoại'] || s['applicant_phone'] || '').replace(/\s+/g, '').replace(/^\+84/, '0');
            return sPhone === cleanPhone;
        });

        const submissions = matched.map((s) => {
            const subId = s['Mã đăng ký (ID)'] || s['submission_id'] || '';
            const items = allItems
                .filter((item) => (item['Mã đăng ký (ID)'] || item['submission_id']) === subId)
                .map((item) => ({
                    categoryKey: item['Loại mục (key)'] || item['category_key'] || '',
                    categoryLabel: item['Tên loại mục'] || item['category_label'] || '',
                    displayName: item['Tên hiển thị'] || item['display_name'] || '',
                    summaryText: item['Tóm tắt'] || item['summary_text'] || '',
                    payloadJson: item['Dữ liệu chi tiết (JSON)'] || item['item_payload_json'] || '',
                }));

            return {
                submissionId: subId,
                submissionCode: s['Mã tra cứu'] || s['submission_code'] || '',
                createdAt: s['Ngày tạo'] || s['created_at'] || '',
                ceremonyType: s['Loại cầu siêu'] || s['ceremony_type'] || '',
                ceremonyLabel: s['Tên loại cầu siêu'] || s['ceremony_label'] || '',
                applicantName: s['Tín chủ/Phật tử'] || s['applicant_name'] || '',
                applicantPhone: s['Số điện thoại'] || s['applicant_phone'] || '',
                applicantTo: s['Thuộc tổ'] || s['applicant_to'] || '',
                totalItems: s['Tổng số mục'] || s['total_items'] || '0',
                categoriesText: s['Danh sách loại mục'] || s['categories_text'] || '',
                itemsData: items,
            };
        });

        return { submissions };
    } catch (err) {
        console.error('Lookup error:', err);
        return { submissions: [] };
    }
}
