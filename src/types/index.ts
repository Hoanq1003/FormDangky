// ============================================================
// Core types for the registration webapp
// ============================================================

export interface Applicant {
    applicantName: string;
    phone: string;
    zalo?: string;
    address?: string;
    notes?: string;
}

export type CategoryKey =
    | 'hl_trong_49_ngay'
    | 'hl_ngoai_49_ro_ten'
    | 'tam_linh_bai_8'
    | 'tam_linh_khac'
    | 'dang_ky_lai_dot_truoc';

export interface SubmissionItem {
    id: string;
    categoryKey: CategoryKey;
    categoryLabel: string;
    data: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export interface Submission {
    submissionId: string;
    submissionCode: string;
    applicant: Applicant;
    items: SubmissionItem[];
    createdAt: string;
    status: string;
    source: string;
}

export interface CategoryDefinition {
    key: CategoryKey;
    label: string;
    helperText: string;
    chooseIfText: string;
    exampleText: string;
    icon: string;
    fields: FieldDefinition[];
    defaultValues: Record<string, unknown>;
}

export interface FieldDefinition {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'select';
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
}

// Wizard screen names
export type ScreenName =
    | 'landing'
    | 'applicant'
    | 'categorySelect'
    | 'categoryForm'
    | 'postSave'
    | 'summary'
    | 'confirm'
    | 'success'
    | 'helper';

// Local draft shape
export interface DraftState {
    applicant: Applicant | null;
    items: SubmissionItem[];
    currentScreen: ScreenName;
    selectedCategory: CategoryKey | null;
    editingItemId: string | null;
}

// Admin types
export interface SubmissionRow {
    submission_id: string;
    submission_code: string;
    created_at: string;
    updated_at: string;
    status: string;
    applicant_name: string;
    applicant_phone: string;
    applicant_zalo: string;
    applicant_address: string;
    total_items: string;
    categories_text: string;
    applicant_payload_json: string;
    source: string;
    notes: string;
}

export interface SubmissionItemRow {
    item_id: string;
    submission_id: string;
    item_index: string;
    category_key: string;
    category_label: string;
    created_at: string;
    updated_at: string;
    display_name: string;
    summary_text: string;
    subject_name: string;
    reference_value: string;
    item_payload_json: string;
    status: string;
}

export interface HelperQuestion {
    id: string;
    question: string;
    options: { value: string; label: string; points: Partial<Record<CategoryKey, number>> }[];
}
