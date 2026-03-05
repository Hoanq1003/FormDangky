'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveDraft, loadDraft, clearDraft } from '@/lib/utils/draft';
import { submitRegistration } from '@/actions/submit';
import { CATEGORY_MAP } from '@/config/categories';
import type { Applicant, CategoryKey, SubmissionItem, ScreenName } from '@/types';

import LandingScreen from '@/components/screens/LandingScreen';
import ApplicantScreen from '@/components/screens/ApplicantScreen';
import CategorySelectScreen from '@/components/screens/CategorySelectScreen';
import CategoryFormScreen from '@/components/screens/CategoryFormScreen';
import PostSaveScreen from '@/components/screens/PostSaveScreen';
import SummaryScreen from '@/components/screens/SummaryScreen';
import ConfirmScreen from '@/components/screens/ConfirmScreen';
import SuccessScreen from '@/components/screens/SuccessScreen';
import HelperScreen from '@/components/screens/HelperScreen';

export default function RegistrationWizard() {
    const [screen, setScreen] = useState<ScreenName>('landing');
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [items, setItems] = useState<SubmissionItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submissionCode, setSubmissionCode] = useState<string>('');
    const [hasDraftLoaded, setHasDraftLoaded] = useState(false);

    // Load draft on mount
    useEffect(() => {
        const draft = loadDraft();
        if (draft) {
            if (draft.applicant) setApplicant(draft.applicant);
            if (draft.items?.length) setItems(draft.items);
            // If there was an in-progress draft, resume at the right screen
            if (draft.applicant && draft.items?.length > 0) {
                setScreen('summary');
            } else if (draft.applicant) {
                setScreen('categorySelect');
            }
            setHasDraftLoaded(true);
        }
    }, []);

    // Auto-save draft on state changes
    const persistDraft = useCallback(() => {
        saveDraft({
            applicant,
            items,
            currentScreen: screen,
            selectedCategory,
            editingItemId,
        });
    }, [applicant, items, screen, selectedCategory, editingItemId]);

    useEffect(() => {
        if (screen !== 'landing' && screen !== 'success') {
            persistDraft();
        }
    }, [persistDraft, screen]);

    // Warn before leaving with unsaved data
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (items.length > 0 && screen !== 'success') {
                e.preventDefault();
            }
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [items, screen]);

    // === Screen handlers ===

    const handleStart = () => setScreen('applicant');

    const handleApplicantNext = (data: Applicant) => {
        setApplicant(data);
        setScreen('categorySelect');
    };

    const handleCategorySelect = (key: CategoryKey) => {
        setSelectedCategory(key);
        setEditingItemId(null);
        setScreen('categoryForm');
    };

    const handleHelperFlow = () => setScreen('helper');

    const handleFormSave = (data: Record<string, unknown>) => {
        const now = new Date().toISOString();
        const cat = CATEGORY_MAP[selectedCategory!];

        if (editingItemId) {
            // Editing existing item
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingItemId
                        ? { ...item, data, updatedAt: now }
                        : item
                )
            );
        } else {
            // New item
            const newItem: SubmissionItem = {
                id: uuidv4(),
                categoryKey: selectedCategory!,
                categoryLabel: cat.label,
                data,
                createdAt: now,
                updatedAt: now,
            };
            setItems((prev) => [...prev, newItem]);
        }

        setEditingItemId(null);
        setScreen('postSave');
    };

    const handleFormCancel = () => {
        setEditingItemId(null);
        if (items.length > 0) {
            setScreen('summary');
        } else {
            setScreen('categorySelect');
        }
    };

    const handleAddAnother = () => {
        setSelectedCategory(null);
        setEditingItemId(null);
        setScreen('categorySelect');
    };

    const handleReview = () => setScreen('summary');

    const handleEditApplicant = () => setScreen('applicant');

    const handleEditItem = (id: string) => {
        const item = items.find((i) => i.id === id);
        if (item) {
            setSelectedCategory(item.categoryKey);
            setEditingItemId(id);
            setScreen('categoryForm');
        }
    };

    const handleDeleteItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const handleCloneItem = (id: string) => {
        const item = items.find((i) => i.id === id);
        if (item) {
            const now = new Date().toISOString();
            const clone: SubmissionItem = {
                ...item,
                id: uuidv4(),
                createdAt: now,
                updatedAt: now,
            };
            setItems((prev) => [...prev, clone]);
        }
    };

    const handleProceedToConfirm = () => setScreen('confirm');

    const handleSubmit = async () => {
        if (!applicant || items.length === 0) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const result = await submitRegistration({ applicant, items });
            if (result.success && result.submissionCode) {
                setSubmissionCode(result.submissionCode);
                clearDraft();
                setScreen('success');
            } else {
                setSubmitError(result.error || 'Đã xảy ra lỗi không xác định.');
            }
        } catch {
            setSubmitError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewRegistration = () => {
        setApplicant(null);
        setItems([]);
        setSelectedCategory(null);
        setEditingItemId(null);
        setSubmissionCode('');
        setSubmitError(null);
        clearDraft();
        setScreen('landing');
    };

    // === Render ===

    const renderScreen = () => {
        switch (screen) {
            case 'landing':
                return <LandingScreen onStart={handleStart} />;

            case 'applicant':
                return (
                    <ApplicantScreen
                        defaultValues={applicant}
                        onNext={handleApplicantNext}
                        onBack={() => setScreen(items.length > 0 ? 'summary' : 'landing')}
                    />
                );

            case 'categorySelect':
                return (
                    <CategorySelectScreen
                        existingItems={items}
                        onSelect={handleCategorySelect}
                        onHelperFlow={handleHelperFlow}
                        onBack={() => items.length > 0 ? setScreen('summary') : setScreen('applicant')}
                    />
                );

            case 'categoryForm':
                if (!selectedCategory) return null;
                const editingItem = editingItemId
                    ? items.find((i) => i.id === editingItemId)
                    : null;
                return (
                    <CategoryFormScreen
                        categoryKey={selectedCategory}
                        defaultValues={editingItem?.data}
                        onSave={handleFormSave}
                        onCancel={handleFormCancel}
                    />
                );

            case 'postSave':
                return (
                    <PostSaveScreen
                        itemCount={items.length}
                        onAddAnother={handleAddAnother}
                        onReview={handleReview}
                        onFinish={() => setScreen('summary')}
                    />
                );

            case 'summary':
                return (
                    <SummaryScreen
                        applicant={applicant!}
                        items={items}
                        onEditApplicant={handleEditApplicant}
                        onEditItem={handleEditItem}
                        onDeleteItem={handleDeleteItem}
                        onCloneItem={handleCloneItem}
                        onAddMore={handleAddAnother}
                        onProceed={handleProceedToConfirm}
                    />
                );

            case 'confirm':
                return (
                    <ConfirmScreen
                        itemCount={items.length}
                        isSubmitting={isSubmitting}
                        error={submitError}
                        onSubmit={handleSubmit}
                        onBack={() => setScreen('summary')}
                    />
                );

            case 'success':
                return (
                    <SuccessScreen
                        submissionCode={submissionCode}
                        itemCount={items.length}
                        onNewRegistration={handleNewRegistration}
                    />
                );

            case 'helper':
                return (
                    <HelperScreen
                        onSelectCategory={(key) => {
                            setSelectedCategory(key);
                            setScreen('categoryForm');
                        }}
                        onBackToManual={() => setScreen('categorySelect')}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            {/* Header */}
            {screen !== 'landing' && screen !== 'success' && (
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 px-4 py-3">
                    <div className="max-w-lg mx-auto flex items-center justify-between">
                        <h1 className="text-sm font-bold text-amber-700">
                            {process.env.NEXT_PUBLIC_APP_NAME || 'Đăng Ký'}
                        </h1>
                        {items.length > 0 && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                {items.length} mục
                            </span>
                        )}
                    </div>
                </header>
            )}

            {/* Content */}
            <main className="max-w-lg mx-auto px-4 py-6 pb-20">
                {renderScreen()}
            </main>
        </div>
    );
}
