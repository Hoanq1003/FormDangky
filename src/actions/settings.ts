'use server';

import { readSettings } from '@/lib/sheets/helpers';

export async function getGuideVideoUrl(): Promise<string | null> {
    try {
        const settings = await readSettings();
        return settings['video_url'] || null;
    } catch {
        return null;
    }
}
