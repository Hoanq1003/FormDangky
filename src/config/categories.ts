import type { CategoryDefinition, CeremonyDefinition } from '@/types';

// ============================================================
// Ceremony Types (Loại cầu siêu)
// ============================================================

export const CEREMONY_TYPES: CeremonyDefinition[] = [
    {
        key: 'trai_tang',
        label: 'Cầu siêu trai Tăng',
        shortLabel: 'Trai Tăng',
        icon: '🙏',
        description: 'Cầu siêu trai Tăng — có Chư Tăng bạch lễ',
    },
    {
        key: 'trai_vien',
        label: 'Cầu siêu trai Viên',
        shortLabel: 'Trai Viên',
        icon: '📿',
        description: 'Cầu siêu trai Viên',
    },
    {
        key: 'tuy_duyen',
        label: 'Cầu siêu cúng dường tùy duyên',
        shortLabel: 'Tùy duyên',
        icon: '🪷',
        description: 'Cầu siêu cúng dường tùy duyên',
    },
];

export const CEREMONY_MAP = new Map(CEREMONY_TYPES.map((c) => [c.key, c]));

// ============================================================
// Registration Item Categories
// ============================================================

export const CATEGORIES: CategoryDefinition[] = [
    {
        key: 'hl_trong_49_ngay',
        label: 'Hương linh mới mất (trong 49 ngày)',
        shortLabel: 'HL trong 49 ngày',
        icon: '🕯️',
        helperText: 'Dành cho hương linh mới qua đời, còn trong giai đoạn 49 ngày.',
        fields: [
            {
                name: 'hoTenNguoiMat',
                label: 'Họ tên người mất',
                type: 'text',
                required: true,
                placeholder: 'Nhập họ tên đầy đủ',
            },
            {
                name: 'ngayMat',
                label: 'Mất ngày (ghi ngày âm lịch)',
                type: 'text',
                required: false,
                placeholder: 'VD: 15/3/Giáp Thìn',
            },
            {
                name: 'tho',
                label: 'Thọ (tuổi)',
                type: 'text',
                required: false,
                placeholder: 'VD: 78',
            },
            {
                name: 'anTangTai',
                label: 'An táng tại',
                type: 'text',
                required: false,
                placeholder: 'Địa điểm an táng',
            },
        ],
        defaultValues: {
            hoTenNguoiMat: '',
            ngayMat: '',
            tho: '',
            anTangTai: '',
        },
    },
    {
        key: 'hl_ngoai_49_ro_ten',
        label: 'Hương linh ngoài 49 ngày (rõ tên)',
        shortLabel: 'HL ngoài 49 ngày',
        icon: '🪔',
        helperText: 'Dành cho hương linh đã quá 49 ngày, biết rõ tên.',
        fields: [
            {
                name: 'hoTenNguoiMat',
                label: 'Họ tên người mất',
                type: 'text',
                required: true,
                placeholder: 'Nhập họ tên đầy đủ',
            },
            {
                name: 'ngayMat',
                label: 'Mất ngày (ghi ngày âm lịch)',
                type: 'text',
                required: false,
                placeholder: 'VD: 10/8/Quý Mão',
            },
            {
                name: 'tho',
                label: 'Thọ (tuổi)',
                type: 'text',
                required: false,
                placeholder: 'VD: 85',
            },
            {
                name: 'anTangTai',
                label: 'An táng tại',
                type: 'text',
                required: false,
                placeholder: 'Địa điểm an táng',
            },
        ],
        defaultValues: {
            hoTenNguoiMat: '',
            ngayMat: '',
            tho: '',
            anTangTai: '',
        },
    },
    {
        key: 'tam_linh_bai_8',
        label: 'Các mục tâm linh bài số 8',
        shortLabel: 'Tâm linh bài 8',
        icon: '📜',
        helperText: 'Các mục tâm linh theo bài số 8.',
        noteText: 'Lưu ý: Không ghi các mục hương linh có oán kết chung, riêng như viết mục HL bạch chư Tăng.',
        fields: [
            {
                name: 'cungDuongChuThien',
                label: 'Cúng dường hồi hướng cho chư Thiên, chư Thần Linh, chư linh thần hộ trì',
                type: 'radio',
                required: false,
                helperText: 'Với PT đang/đã bạch bài phát nguyện 49 ngày: Chư Thiên, chư Thần Linh, chư linh thần hộ trì. Với PT chưa bạch: Chư Thiên, chư Thần Linh.',
                options: [
                    { value: 'co', label: 'Có' },
                    { value: 'khong', label: 'Không' },
                ],
            },
            {
                name: 'hlGiaTien',
                label: 'HL gia tiên hợp duyên đã bạch thỉnh',
                type: 'checkbox',
                required: false,
            },
            {
                name: 'hlTrenDat',
                label: 'HL trên đất hợp duyên đã bạch thỉnh',
                type: 'checkbox',
                required: false,
            },
            {
                name: 'hlTrenNghiep',
                label: 'HL trên nghiệp',
                type: 'textarea',
                required: false,
                placeholder: 'Ghi chi tiết nếu có...',
            },
            {
                name: 'hlCanTroChuaBenh',
                label: 'HL có thể tác động cản trở việc chữa bệnh',
                type: 'textarea',
                required: false,
                placeholder: 'Ghi chi tiết nếu có...',
            },
            {
                name: 'ghiChu',
                label: 'Ghi chú thêm',
                type: 'textarea',
                required: false,
                placeholder: 'Ghi chú nếu có...',
            },
        ],
        defaultValues: {
            cungDuongChuThien: 'khong',
            hlGiaTien: false,
            hlTrenDat: false,
            hlTrenNghiep: '',
            hlCanTroChuaBenh: '',
            ghiChu: '',
        },
    },
    {
        key: 'tam_linh_khac',
        label: 'Các mục tâm linh khác (không tu bài số 8)',
        shortLabel: 'Tâm linh khác',
        icon: '🔮',
        helperText: 'Dành cho các mục tâm linh khác, không theo bài số 8.',
        fields: [
            {
                name: 'noiDungDangKy',
                label: 'Nội dung đăng ký',
                type: 'textarea',
                required: true,
                placeholder: 'Mô tả chi tiết nội dung cần đăng ký...',
            },
            {
                name: 'ghiChu',
                label: 'Ghi chú thêm',
                type: 'textarea',
                required: false,
                placeholder: 'Ghi chú nếu có...',
            },
        ],
        defaultValues: {
            noiDungDangKy: '',
            ghiChu: '',
        },
    },
];

export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.key, c]));
