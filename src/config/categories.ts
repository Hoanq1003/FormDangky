import type { CategoryDefinition, CategoryKey, HelperQuestion } from '@/types';

// ============================================================
// Category Registry — edit this to change categories & fields
// ============================================================

export const CATEGORIES: CategoryDefinition[] = [
    {
        key: 'hl_trong_49_ngay',
        label: 'Đăng ký mục HL còn trong 49 ngày',
        helperText: 'Dành cho hương linh mới qua đời, còn trong giai đoạn 49 ngày.',
        chooseIfText: 'Chọn mục này nếu người thân mới mất chưa quá 49 ngày.',
        exampleText: 'Ví dụ: Đăng ký tụng kinh cho ông/bà vừa mất tuần trước.',
        icon: '🕯️',
        fields: [
            { name: 'deceasedName', label: 'Tên hương linh', type: 'text', required: true, placeholder: 'Nhập tên hương linh' },
            { name: 'deceasedAltName', label: 'Tên khác / Pháp danh', type: 'text', required: false, placeholder: 'Nếu có' },
            { name: 'dateOfPassing', label: 'Ngày mất', type: 'date', required: false },
            { name: 'daysSincePassingEstimate', label: 'Ước tính số ngày từ khi mất', type: 'text', required: false, placeholder: 'VD: khoảng 20 ngày' },
            { name: 'relationship', label: 'Quan hệ với người đăng ký', type: 'text', required: false, placeholder: 'VD: con, cháu, vợ/chồng...' },
            { name: 'requestDetails', label: 'Nội dung đăng ký / Ghi chú', type: 'textarea', required: false, placeholder: 'Ghi chi tiết yêu cầu nếu có' },
        ],
        defaultValues: {
            deceasedName: '',
            deceasedAltName: '',
            dateOfPassing: '',
            daysSincePassingEstimate: '',
            relationship: '',
            requestDetails: '',
        },
    },
    {
        key: 'hl_ngoai_49_ro_ten',
        label: 'Có rõ tên hương linh HL ngoài 49 ngày',
        helperText: 'Dành cho hương linh đã quá 49 ngày, biết rõ tên.',
        chooseIfText: 'Chọn mục này nếu người thân đã mất trên 49 ngày và bạn biết rõ tên.',
        exampleText: 'Ví dụ: Đăng ký cho ông nội đã mất cách đây 3 năm.',
        icon: '📿',
        fields: [
            { name: 'deceasedName', label: 'Tên hương linh', type: 'text', required: true, placeholder: 'Nhập tên hương linh' },
            { name: 'deceasedAltName', label: 'Tên khác / Pháp danh', type: 'text', required: false, placeholder: 'Nếu có' },
            { name: 'yearOfPassing', label: 'Năm mất', type: 'text', required: false, placeholder: 'VD: 2020' },
            { name: 'relationship', label: 'Quan hệ với người đăng ký', type: 'text', required: false, placeholder: 'VD: con, cháu, vợ/chồng...' },
            { name: 'requestDetails', label: 'Nội dung đăng ký / Ghi chú', type: 'textarea', required: false, placeholder: 'Ghi chi tiết yêu cầu nếu có' },
        ],
        defaultValues: {
            deceasedName: '',
            deceasedAltName: '',
            yearOfPassing: '',
            relationship: '',
            requestDetails: '',
        },
    },
    {
        key: 'tam_linh_bai_8',
        label: 'Các mục tâm linh bài số 8',
        helperText: 'Dành cho các mục đăng ký liên quan đến tâm linh theo bài số 8.',
        chooseIfText: 'Chọn mục này nếu bạn muốn đăng ký các mục tâm linh tu theo bài số 8.',
        exampleText: 'Ví dụ: Đăng ký tu tập bài số 8 cho bản thân hoặc người thân.',
        icon: '🙏',
        fields: [
            { name: 'subjectName', label: 'Tên đối tượng đăng ký', type: 'text', required: true, placeholder: 'Nhập họ tên' },
            { name: 'subjectType', label: 'Loại đối tượng', type: 'text', required: false, placeholder: 'VD: Bản thân, người thân, ...' },
            { name: 'requestContent', label: 'Nội dung đăng ký', type: 'textarea', required: true, placeholder: 'Mô tả nội dung cần đăng ký' },
            { name: 'relatedNotes', label: 'Ghi chú thêm', type: 'textarea', required: false, placeholder: 'Thông tin bổ sung nếu có' },
        ],
        defaultValues: {
            subjectName: '',
            subjectType: '',
            requestContent: '',
            relatedNotes: '',
        },
    },
    {
        key: 'tam_linh_khac',
        label: 'Các mục tâm linh khác không tu bài số 8',
        helperText: 'Dành cho các mục tâm linh khác, không theo bài số 8.',
        chooseIfText: 'Chọn mục này nếu bạn muốn đăng ký tâm linh nhưng không phải bài số 8.',
        exampleText: 'Ví dụ: Đăng ký cầu an, cầu siêu, hoặc các hình thức tâm linh khác.',
        icon: '☸️',
        fields: [
            { name: 'subjectName', label: 'Tên đối tượng đăng ký', type: 'text', required: true, placeholder: 'Nhập họ tên' },
            { name: 'requestContent', label: 'Nội dung đăng ký', type: 'textarea', required: true, placeholder: 'Mô tả nội dung cần đăng ký' },
            { name: 'categorySubType', label: 'Phân loại thêm', type: 'text', required: false, placeholder: 'VD: Cầu an, cầu siêu...' },
            { name: 'relatedNotes', label: 'Ghi chú thêm', type: 'textarea', required: false, placeholder: 'Thông tin bổ sung nếu có' },
        ],
        defaultValues: {
            subjectName: '',
            requestContent: '',
            categorySubType: '',
            relatedNotes: '',
        },
    },
    {
        key: 'dang_ky_lai_dot_truoc',
        label: 'Đăng ký lại các mục của đợt trước',
        helperText: 'Dành cho người đã đăng ký trước đó và muốn đăng ký lại hoặc cập nhật.',
        chooseIfText: 'Chọn mục này nếu bạn đã từng đăng ký trước đây và muốn đăng ký lại.',
        exampleText: 'Ví dụ: Đăng ký lại mục đã đăng ký đợt tháng trước.',
        icon: '🔄',
        fields: [
            { name: 'previousSubmissionCode', label: 'Mã đăng ký cũ', type: 'text', required: false, placeholder: 'VD: DK-20260201-AB12' },
            { name: 'previousPeriod', label: 'Đợt trước / Thời điểm trước', type: 'text', required: false, placeholder: 'VD: Tháng 2/2026' },
            { name: 'oldContentSummary', label: 'Nội dung cũ', type: 'textarea', required: false, placeholder: 'Tóm tắt nội dung đã đăng ký lần trước' },
            { name: 'newRequest', label: 'Yêu cầu mới / Cập nhật', type: 'textarea', required: true, placeholder: 'Nhập yêu cầu mới hoặc nội dung cần cập nhật' },
            { name: 'relatedNotes', label: 'Ghi chú thêm', type: 'textarea', required: false, placeholder: 'Thông tin bổ sung nếu có' },
        ],
        defaultValues: {
            previousSubmissionCode: '',
            previousPeriod: '',
            oldContentSummary: '',
            newRequest: '',
            relatedNotes: '',
        },
    },
];

// Quick lookup map
export const CATEGORY_MAP: Record<CategoryKey, CategoryDefinition> =
    CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = cat;
        return acc;
    }, {} as Record<CategoryKey, CategoryDefinition>);

// ============================================================
// Helper Flow Questions
// ============================================================

export const HELPER_QUESTIONS: HelperQuestion[] = [
    {
        id: 'q1',
        question: 'Bạn muốn đăng ký cho ai?',
        options: [
            {
                value: 'deceased_recent',
                label: 'Người thân mới qua đời (chưa quá 49 ngày)',
                points: { hl_trong_49_ngay: 3 },
            },
            {
                value: 'deceased_old',
                label: 'Người thân đã mất lâu (trên 49 ngày)',
                points: { hl_ngoai_49_ro_ten: 3 },
            },
            {
                value: 'spiritual',
                label: 'Đăng ký tu tập / tâm linh',
                points: { tam_linh_bai_8: 1, tam_linh_khac: 1 },
            },
            {
                value: 're_register',
                label: 'Đăng ký lại mục đã có từ trước',
                points: { dang_ky_lai_dot_truoc: 3 },
            },
        ],
    },
    {
        id: 'q2',
        question: 'Bạn có biết rõ tên người/đối tượng cần đăng ký không?',
        options: [
            {
                value: 'yes',
                label: 'Có, tôi biết rõ tên',
                points: { hl_trong_49_ngay: 1, hl_ngoai_49_ro_ten: 1, tam_linh_bai_8: 1 },
            },
            {
                value: 'no',
                label: 'Không chắc / Không rõ tên',
                points: { tam_linh_khac: 1 },
            },
        ],
    },
    {
        id: 'q3',
        question: 'Nội dung đăng ký có liên quan đến bài số 8 không?',
        options: [
            {
                value: 'yes',
                label: 'Có liên quan đến bài số 8',
                points: { tam_linh_bai_8: 3 },
            },
            {
                value: 'no',
                label: 'Không liên quan / Không biết',
                points: { tam_linh_khac: 2 },
            },
            {
                value: 'na',
                label: 'Không phải mục tâm linh',
                points: { hl_trong_49_ngay: 1, hl_ngoai_49_ro_ten: 1, dang_ky_lai_dot_truoc: 1 },
            },
        ],
    },
    {
        id: 'q4',
        question: 'Bạn đã từng đăng ký ở đợt trước chưa?',
        options: [
            {
                value: 'yes',
                label: 'Rồi, tôi muốn đăng ký lại',
                points: { dang_ky_lai_dot_truoc: 3 },
            },
            {
                value: 'no',
                label: 'Chưa, đây là lần đầu',
                points: { hl_trong_49_ngay: 1, hl_ngoai_49_ro_ten: 1, tam_linh_bai_8: 1, tam_linh_khac: 1 },
            },
        ],
    },
];
