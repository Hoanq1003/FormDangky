import type { DraftState } from '@/types';

const DRAFT_KEY = 'registration_draft_v1';

export function saveDraft(state: DraftState): void {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    } catch {
        // localStorage not available or quota exceeded — silent fail
    }
}

export function loadDraft(): DraftState | null {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as DraftState;
    } catch {
        return null;
    }
}

export function clearDraft(): void {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        // silent
    }
}

export function hasDraft(): boolean {
    try {
        return !!localStorage.getItem(DRAFT_KEY);
    } catch {
        return false;
    }
}
