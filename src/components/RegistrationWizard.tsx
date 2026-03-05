'use client';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CATEGORY_MAP, CEREMONY_MAP } from '@/config/categories';
import { submitRegistration } from '@/actions/submit';
import { saveDraft, loadDraft, clearDraft, hasDraft } from '@/lib/utils/draft';
import type { Applicant, SubmissionItem, CeremonyType, CategoryKey, ScreenName } from '@/types';

import LandingScreen from '@/components/screens/LandingScreen';
import CeremonySelectScreen from '@/components/screens/CeremonySelectScreen';
import ApplicantScreen from '@/components/screens/ApplicantScreen';
import CategorySelectScreen from '@/components/screens/CategorySelectScreen';
import CategoryFormScreen from '@/components/screens/CategoryFormScreen';
import PostSaveScreen from '@/components/screens/PostSaveScreen';
import SummaryScreen from '@/components/screens/SummaryScreen';
import SuccessScreen from '@/components/screens/SuccessScreen';
import { Badge } from '@/components/ui/badge';

export default function RegistrationWizard() {
    const [screen, setScreen] = useState<ScreenName>('landing');
    const [ceremonyType, setCeremonyType] = useState<CeremonyType | null>(null);
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [items, setItems] = useState<SubmissionItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
    const [editingItem, setEditingItem] = useState<SubmissionItem | null>(null);
    const [submissionCode, setSubmissionCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [draftLoaded, setDraftLoaded] = useState(false);

    // Load draft on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && hasDraft()) {
            const draft = loadDraft();
            if (draft) {
                setCeremonyType(draft.ceremonyType);
                setApplicant(draft.applicant);
                setItems(draft.items || []);
                setScreen(draft.currentScreen || 'landing');
                setDraftLoaded(true);
            }
        }
    }, []);

    // Auto-save draft
    const persistDraft = useCallback(() => {
        saveDraft({
            ceremonyType,
            applicant,
            items,
            currentScreen: screen,
            lastUpdated: new Date().toISOString(),
        });
    }, [ceremonyType, applicant, items, screen]);

    useEffect(() => {
        if (screen !== 'landing' && screen !== 'success') {
            persistDraft();
        }
    }, [screen, ceremonyType, applicant, items, persistDraft]);

    // Dismiss draft banner
    useEffect(() => {
        if (draftLoaded) {
            const timer = setTimeout(() => setDraftLoaded(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [draftLoaded]);

    // Navigation
    const goTo = (s: ScreenName) => setScreen(s);

    // Ceremony select
    const handleCeremonySelect = (type: CeremonyType) => {
        setCeremonyType(type);
        goTo('applicant');
    };

    // Applicant submit
    const handleApplicantNext = (data: Applicant) => {
        setApplicant(data);
        goTo('category_select');
    };

    // Category selection
    const handleCategorySelect = (key: CategoryKey) => {
        setSelectedCategory(key);
        setEditingItem(null);
        goTo('category_form');
    };

    // Save item
    const handleSaveItem = (data: Record<string, unknown>) => {
        if (!selectedCategory) return;
        const cat = CATEGORY_MAP.get(selectedCategory);
        const now = new Date().toISOString();

        if (editingItem) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingItem.id
                        ? { ...item, data, updatedAt: now }
                        : item
                )
            );
        } else {
            const newItem: SubmissionItem = {
                id: uuidv4(),
                categoryKey: selectedCategory,
                categoryLabel: cat?.label || '',
                data,
                createdAt: now,
                updatedAt: now,
            };
            setItems((prev) => [...prev, newItem]);
        }
        setEditingItem(null);
        goTo('post_save');
    };

    // Edit item
    const handleEditItem = (itemId: string) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
            setSelectedCategory(item.categoryKey);
            setEditingItem(item);
            goTo('category_form');
        }
    };

    // Delete item
    const handleDeleteItem = (itemId: string) => {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
    };

    // Clone item
    const handleCloneItem = (itemId: string) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
            const cloned: SubmissionItem = {
                ...item,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setItems((prev) => [...prev, cloned]);
        }
    };

    // Submit
    const handleSubmit = async () => {
        if (!applicant || !ceremonyType || items.length === 0) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const result = await submitRegistration({
                ceremonyType,
                applicant,
                items,
            });

            if (result.success && result.code) {
                setSubmissionCode(result.code);
                clearDraft();
                goTo('success');
            } else {
                setSubmitError(result.error || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch {
            setSubmitError('Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // New registration
    const handleNewRegistration = () => {
        setCeremonyType(null);
        setApplicant(null);
        setItems([]);
        setSubmissionCode('');
        clearDraft();
        goTo('landing');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-stone-50 to-blue-50/30">
            {/* Header */}
            {screen !== 'landing' && screen !== 'success' && (
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-stone-200 px-4 py-3">
                    <div className="max-w-lg mx-auto flex items-center justify-between">
                        <h1 className="text-sm font-bold text-amber-600">Đăng Ký Cầu Siêu</h1>
                        {items.length > 0 && (
                            <Badge variant="default" className="text-xs">{items.length} mục</Badge>
                        )}
                    </div>
                </div>
            )}

            <div className="max-w-lg mx-auto px-4 py-6">
                {/* Draft loaded banner */}
                {draftLoaded && screen !== 'landing' && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-3 py-2 text-xs mb-4 animate-fade-in">
                        ✨ Đã khôi phục bản nháp trước đó
                    </div>
                )}

                {/* Screens */}
                {screen === 'landing' && (
                    <LandingScreen onStart={() => goTo('ceremony_select')} />
                )}
                {screen === 'ceremony_select' && (
                    <CeremonySelectScreen
                        selected={ceremonyType}
                        onSelect={handleCeremonySelect}
                        onBack={() => goTo('landing')}
                    />
                )}
                {screen === 'applicant' && (
                    <ApplicantScreen
                        defaultValues={applicant}
                        onNext={handleApplicantNext}
                        onBack={() => goTo('ceremony_select')}
                    />
                )}
                {screen === 'category_select' && (
                    <CategorySelectScreen
                        items={items}
                        onSelect={handleCategorySelect}
                        onBack={() => goTo('applicant')}
                    />
                )}
                {screen === 'category_form' && selectedCategory && (
                    <CategoryFormScreen
                        categoryKey={selectedCategory}
                        editingItem={editingItem}
                        onSave={handleSaveItem}
                        onBack={() => {
                            setEditingItem(null);
                            goTo(items.length > 0 ? 'summary' : 'category_select');
                        }}
                    />
                )}
                {screen === 'post_save' && (
                    <PostSaveScreen
                        itemCount={items.length}
                        onAddAnother={() => goTo('category_select')}
                        onReviewAndSubmit={() => goTo('summary')}
                    />
                )}
                {screen === 'summary' && applicant && ceremonyType && (
                    <SummaryScreen
                        ceremonyType={ceremonyType}
                        applicant={applicant}
                        items={items}
                        isSubmitting={isSubmitting}
                        submitError={submitError}
                        onEditApplicant={() => goTo('applicant')}
                        onEditItem={handleEditItem}
                        onDeleteItem={handleDeleteItem}
                        onCloneItem={handleCloneItem}
                        onAddMore={() => goTo('category_select')}
                        onSubmit={handleSubmit}
                        onBack={() => goTo('category_select')}
                    />
                )}
                {screen === 'success' && (
                    <SuccessScreen
                        submissionCode={submissionCode}
                        onNewRegistration={handleNewRegistration}
                    />
                )}
            </div>
        </div>
    );
}
